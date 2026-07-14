# Spec: Běh tréninku na pozadí — Live Activity / notifikace widget + zvuk + ovládání

Status: NÁVRH (spec-first, plný rozsah). Cíl: po upozadění apky dál běží interval-timer
ve „widgetu" (iOS Live Activity / Dynamic Island, Android ongoing notification) **se
zvukem** a s ovládáním **play/pause + skok ±15 s**, obousměrně propojené s React Native.

> DŮLEŽITÉ: iOS Live Activity a Android foreground-service notifikaci **nelze postavit
> ani otestovat v tomto prostředí** (nativní Swift/Kotlin + Xcode/gradle build + reálné
> zařízení). Claude napíše JS/TS vrstvu, native modul (bridge) a scaffolding nativních
> targetů; build, podepsání, App Group konfiguraci a test na zařízení dokončí uživatel.

---

## 1. Architektura propojení RN ↔ widget (klíčové)

**Princip:** RN vlastní zdroj pravdy pro *timeline* tréninku. Widget je renderer +
ovládací plocha. Protože iOS na pozadí uspí JS, widget musí odpočet dopočítat sám z
serializované timeline (ne z JS tiků).

Timeline je deterministická: z `config` + `startedAt` + seznamu pauz lze kdykoliv
dopočítat aktuální fázi a zbývající čas jen z reálného času (`Date.now`). Tuhle vlastnost
využijeme na obou stranách (RN i widget počítají stejně).

### Sdílený stavový kanál
- **iOS:** App Group (`group.com.goandrest`) — sdílené `UserDefaults`/JSON soubor mezi
  appkou a widget extension.
- **Android:** foreground service + `SharedPreferences`/intent extras; ovládací akce se
  vrací do RN přes event emitter.

### Datový model sdíleného stavu (`WidgetTimerState`)
```
{
  startedAt: number,            // epoch ms začátku tréninku
  timeline: PhaseSlice[],       // [{ phase, startOffsetMs, endOffsetMs, set, round }]
  totalDurationMs: number,
  isRunning: boolean,
  pausedAtOffsetMs: number|null,// kde stojí, když paused
  accumulatedPauseMs: number,   // součet pauz (pro přepočet elapsed)
  workoutName: string,
  updatedAt: number,
}
```
`PhaseSlice` se odvodí z existujícího `buildQueue`/`calculateCurrentWorkoutState`
(znovupoužít, ať RN i widget dávají stejné výsledky).

### Pending-command kanál (widget → RN)
Tlačítka ve widgetu zapíšou příkaz do sdíleného úložiště:
```
{ type: 'pause'|'resume'|'skipForward'|'skipBackward', at: number }  // at = epoch ms
```

### Lifecycle sync (to, na co se ptáš)
- **RN → background/inactive** (`AppState` change): RN serializuje aktuální timer stav do
  sdíleného úložiště a přes native modul **spustí/aktualizuje** Live Activity (iOS) /
  foreground service (Android).
- **V pozadí:** widget renderuje z timeline (`Text(timerInterval:)` autonomně odpočítává);
  uživatel klikne na tlačítko → App Intent (iOS) / notif action (Android) zapíše pending
  command + optimisticky updatne widget.
- **RN → active** (foreground): RN přečte sdílený stav → aplikuje pending commands →
  **přepočte elapsed z reálného času** → sesynchronizuje jotai timer atomy a UI → widget
  ukončí (pokud trénink doběhl / uživatel se vrátil) nebo nechá běžet.

Reconcile na resume je zásadní: nikdy se nevěří JS „tikům" z pozadí, vždy se elapsed
odvodí z `startedAt`, `accumulatedPauseMs` a `Date.now`.

---

## 2. Zvuk na pozadí

### iOS
- Přidat `UIBackgroundModes: [audio]` do `ios/GoAndRest/Info.plist`.
- Audio session kategorie už je `Playback` (viz `setupPlayer.ts` + AppDelegate) — ověřit,
  že session zůstane aktivní na pozadí.
- **Keep-alive:** mezi hlasovými cues jsou ticha → iOS by app uspal. Použít existující
  `src/assets/audio/silence.m4a` jako smyčku/„udržovací" stopu v track-playeru, aby audio
  session (a tím i časované přehrávání cues) zůstaly naživu do konce tréninku.
- App Review pozn.: audio background mode je pro tento use-case legitimní (trénink s
  hlasovými pokyny), ale keep-alive silence popsat v review notes.

### Android
- Foreground service (track-player už jeden má) s `foregroundServiceType=mediaPlayback`
  (Android 14+ vyžaduje typ + `FOREGROUND_SERVICE_MEDIA_PLAYBACK` permission).
- Změnit `appKilledPlaybackBehavior` a chování tak, aby zvuk na pozadí **nepokračoval jen
  do prvního ticha**, ale po celou dobu tréninku.

### JS změna (obě platformy)
- Upravit `useHandleAppInBackgroundDuringWorkout.ts`: dnes při background **vždy** volá
  `stopAndResetTrackPlayer()`. Nově: pokud je „Běh časovače na pozadí" zapnutý, zvuk
  **nezastavovat** a spustit widget/keep-alive; jen když je vypnutý, chovat se jako dnes
  (pauza + stop).

---

## 3. iOS Live Activity / Dynamic Island

- **Nový target:** Widget Extension (SwiftUI) v Xcode. `ActivityKit` + `WidgetKit`.
- **ActivityAttributes**: statické (workoutName), `ContentState`: aktuální fáze, konec
  fáze (timestamp), running/paused, série/kolo, celkový konec.
- **Render odpočtu bez JS:** `Text(timerInterval: phaseStart...phaseEnd)` — auto-počítá.
  Pro přechody fází buď (a) RN updatuje aktivitu na hranici fáze (drženo naživu audio
  session), nebo (b) widget si počítá aktuální fázi z celé timeline v ContentState
  (robustnější — přežije suspend JS). **Doporučeno (b) + (a) jako doplněk.**
- **Ovládání (play/pause, ±15 s):** interaktivní tlačítka přes **App Intents** —
  vyžaduje **iOS 17+**. Na iOS 16.1–16.x je Live Activity jen zobrazovací (tlačítka
  otevřou app deep-linkem). Intent zapíše pending command do App Group + updatne aktivitu.
- **Native modul (bridge):** `startActivity(state)`, `updateActivity(state)`,
  `endActivity()`, `readPendingCommands()`, event `onWidgetCommand`. Emituje do RN.
- **App Group** nutný pro sdílení stavu mezi app a extension (konfigurace v obou targetech
  + entitlements + provisioning profily).

## 4. Android ongoing notification „widget"

- Foreground service s custom notifikací: název tréninku, aktuální fáze + odpočet
  (`setUsesChronometer`/`setChronometerCountDown` nebo ruční update), akce **Play/Pause**,
  **-15 s**, **+15 s** (a případně Stop).
- Akce notifikace → `BroadcastReceiver`/service → event do RN (nebo přímo ovládá timer,
  pokud proces žije). Reconcile stejně přes sdílený stav při resume.
- RNTP capabilities (`JumpForward`, `JumpBackward`, `forwardJumpInterval=15`,
  `backwardJumpInterval=15`, `Play`, `Pause`) pokryjí část ovládání; živý odpočet fáze v
  notifikaci ale potřebuje custom notifikaci/native modul (RNTP notifikace je media-styl).

## 4b. Vizuální design widgetu (v designu apky)

Widget (Live Activity i Android notifikace) má vypadat jako součást apky, ne genericky.

- **Font:** Barlow Condensed (už bundlovaný — `BarlowCondensed-*.ttf`). Bold/Black,
  velká písmena pro názvy fází, `tabular-nums` pro čas (jako `RunTimer`/`AppTimeView`).
- **Barvy fází:** z `src/constants/colors.ts` — work/rest/recovery (`workPhase`,
  `restPhase`, `recoveryPhase`, `warmupPhase`) jako akcent aktuální fáze; text/pozadí
  podle `text`/`background`/`backgroundAlt`. Respektovat **light i dark** (Live Activity
  i notifikace mají oba režimy).
- **Kompozice (dle `RunTimer` a Finish/Landing stylu):** akcentní barva fáze, ikona fáze
  (Dumbbell/BatteryCharging/Coffee/Flame), název fáze VELKÝMI tučně, velký odpočet fáze,
  menší „Celkem" + celkový čas, série/kolo. V kompaktní/Dynamic Island podobě zkrácená
  varianta (ikona fáze + odpočet + mini prstenec postupu).
- **Mini progres prstenec:** volitelně replikovat dvouprstencový vzhled timeru (vnější =
  celkový postup, vnitřní = postup fáze) ve zjednodušené formě.
- **Ovládací tlačítka:** play/pause + ±15 s ve stylu `AppRoundedButton` (kruhová,
  akcentní `primary` pro play/pause, neutrální pro skip), ikony jako v appce
  (Play/Pause, CornerUpLeft/CornerUpRight se „15").
- **Premium akcent:** ne nutný; držet se fázových barev a `primary`.

> Pozn.: SwiftUI (iOS) ani Android notifikace **nemůžou importovat `colors.ts`**. Design
> tokeny (barvy fází, font) se musí **zrcadlit** v native kódu. Doporučení: jeden zdroj
> tokenů (např. malý generovaný JSON/plist/Kotlin objekt z `colors.ts`), ať se light/dark
> a barvy fází nerozejdou s appkou při budoucí změně palety.

## 5. Sdílená JS/TS vrstva (co Claude udělá plně)

- `WidgetTimerState` typ + serializace z existujícího timer stavu
  (`calculateCurrentWorkoutState`, `buildQueue`, `useWorkoutTimer`).
- `widgetTimerService.ts` — TS wrapper nad native modulem (start/update/end/readCommands),
  bezpečný no-op fallback, když modul chybí (dokud není nativní link).
- Napojení na lifecycle: rozšířit/nahradit `useHandleAppInBackgroundDuringWorkout` o
  push stavu při background a reconcile při foreground (+ aplikace pending commands na
  jotai timer atomy).
- Mapování command → akce timeru: reuse existující logiky pro pause/resume a
  skip ±15 s (v `RunningWorkoutScreen` už skip existuje — sjednotit).
- Gating: featura běží jen při zapnutém „Běh časovače na pozadí".

## 6. Fázový plán implementace

1. **F1 — Zvuk + časovač na pozadí (JS + config):** Info.plist audio mode, silence
   keep-alive, úprava background handleru, foreground service type (Android). Ověřit na
   zařízení, že cues hrají a čas sedí po návratu. *Nejvyšší hodnota, žádný widget.*
2. **F2 — Sdílená stavová vrstva + native modul (bridge) + reconcile.** Bez UI widgetu —
   most a lifecycle sync stojí a je otestovaný (logováním).
3. **F3 — Android notifikace s ovládáním** (play/pause, ±15 s, živý odpočet).
4. **F4 — iOS Live Activity / Dynamic Island** (Widget Extension, ActivityKit, App
   Intents, App Group). Nejnáročnější.

Každá fáze = samostatný commit/MR a samostatný test na zařízení.

## 7. Rizika / co vyžaduje uživatele
- iOS: Xcode target, App Group + entitlements + provisioning, iOS 17+ pro tlačítka, App
  Review notes k audio keep-alive.
- Android: foreground service type + permission (Android 14+), test na více verzích.
- Nelze verifikovat v tomto prostředí — nutný build + běh na reálných zařízeních.
- Přesnost časování na pozadí: vždy reconcile z wall-clock, netikat z JS.
- Baterie: keep-alive audio + foreground service mají spotřebu — gatovat nastavením.

## 8. Nové/dotčené soubory (odhad)
- Nové: `ios/GoAndRestWidget/*` (Swift widget ext), `android/.../TimerService.kt` +
  notif, `src/services/widgetTimer/*` (TS bridge), `src/contexts/widgetTimer/*`.
- Dotčené: `Info.plist`, `AppDelegate`, `AndroidManifest.xml`, `setupPlayer.ts`,
  `useHandleAppInBackgroundDuringWorkout.ts`, `useWorkoutTimer.ts`,
  `RunningWorkoutScreen` (skip sjednocení), atomy.

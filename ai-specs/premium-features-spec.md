# Spec: Go&Rest Premium featury (Paywall, Hodnocení, Historie, Záloha)

## Zdroje pravdy
- **Design (vzhled + chování, závazné):** `/private/tmp/claude-501/-Users-ja-WebstormProjects-GoAndRest/6b5781e7-3680-42b6-be0e-64b4449afa89/scratchpad/design_reference.jsx`
  Je to reverse-engineered webový prototyp (React + inline styly). Přebírej z něj **rozvržení, texty, ikony, barvy, chování** — ale přepiš do RN konvencí této apky (viz níže). Drž se designu; kde je rozkol s konvencemi apky, vítězí konvence apky.
- **Referenční projekt PropCheck** (`/Users/ja/WebstormProjects/PropCheck`) — má už naintegrovaný RevenueCat a práci se soubory. **Před implementací dané featury projdi odpovídající soubory v PropCheck a zkopíruj/adaptuj vzor** (ne slepě — GoAndRest má vlastní styl atomů/komponent).

## Rozhodnutí uživatele (závazná)
1. **RevenueCat = varianta „izolovaná purchase-service vrstva + placeholdery"**: přidej `react-native-purchases`, napiš čistou izolovanou vrstvu (service + config s konstantami pro API klíče / product ID / entitlement) s jasně označenými `TODO`/placeholder hodnotami, které doplní uživatel. Pody/gradle instalaci a doplnění klíčů udělá uživatel. Inspiruj se PropCheck, ale klidně to udělej lépe.
2. **Premium je TRVALÉ + „Obnovit nákup"**: entitlement persistuj (AsyncStorage atom jako ostatní nastavení) a při startu ověř přes RevenueCat; „Obnovit nákup" volá `restorePurchases`. NEkopíruj prototypové „v paměti, reset po reloadu".
3. **Záloha/obnova jako v PropCheck**: použij `react-native-share` / `@react-native-documents/picker` / `react-native-blob-util` vzorem z PropCheck (`src/services/backupService.ts`, `shareService.ts`, `fileService.ts`).
4. **Bug-fixy ze zadání (klíč u počtu sérií, vizuály timeru) jsou MIMO SCOPE** — ignoruj je.

## Konvence GoAndRest (dodržet!)
- Stav: **jotai atomy**. Persistované přes `createAsyncAtom` v `src/contexts/atoms.ts` + klíč v `AsyncStorageKey` enumu (`src/contexts/constants.ts`).
- Navigace: native stack, `AppNavigatorScreen` enum + `AppNavigatorScreenParams` v `src/components/navigation/AppNavigator/types.ts`; registrace v `AppNavigator.tsx`.
- i18n: `src/locales/{cs,en,sk}.ts` + typy `src/locales/types.ts`. **Všechny texty přes `useAppTranslation`** — žádné hardcoded stringy. cs je hlavní; en/sk doplnit taky (sk může kopírovat cs kde je to rozumné, ale přelož).
- Komponenty: reuse existujících primitiv — `AppScreenLayout`, `AppView`, `AppText`, `AppButton`, `AppBottomSheet` (`src/components/common/AppBottomSheet/hooks/useAppBottomSheet.tsx`), `AppPopUp` (`useAppPopUp`), `AppSelectionBottomSheet`, `AppIcon` (lucide-react-native), `AppRoundedButton`, `AppTimeView`, `AppDivider`, `AppRow`, `AppTitleValueRow`.
- Barvy: `src/constants/colors.ts` (má už `premium` barvu — ověřit a použít pro Gem/premium akcenty). Graf: `react-native-gifted-charts` je v deps (použij pro dvoulinkový graf místo ručního SVG z prototypu, pokud to jde čistě; jinak `react-native-svg`).
- Ikony z designu (lucide): Gem, LineChart, History, Lock, ArrowRight, Download, Upload, TriangleAlert, Check, ChevronRight, Database, Megaphone. Ověřit názvy v `AppIcon`.
- Styl kódu: DRY, immutable, žádné zbytečné komentáře, nepřidávej featury nad rámec zadání.

## FEATURY K IMPLEMENTACI

### 1. Paywall & Premium (149 Kč jednorázově, non-consumable, doživotně)
- **Purchase infrastruktura**: `react-native-purchases`, config (`src/config/revenueCat.ts` styl PropCheck) s placeholder API klíči (iOS/Android), product identifier a entitlement identifier. Service vrstva (`src/services/purchasesService.ts` styl) s: `configure`, `getOfferings`/nabídka, `purchaseLifetime`, `restorePurchases`, `checkEntitlement`.
- **Premium stav**: nový persistovaný atom `isPremiumAtom` (AsyncStorage) + provider/hook, který při startu ověří entitlement přes RC a sesynchronizuje. Hook `useIsPremium()`.
- **Gem tlačítko** vpravo nahoře na Landing headeru: pro free uživatele ikona `Gem` (premium barva) → otevře paywall bottom sheet; pro premium ikona `LineChart` (text barva) → naviguje na Historii. (viz `Landing` v designu, `Header` right/rightColor/onRight)
- **Pro banner** v Nastavení nahoře pro free uživatele (`ProBanner` v designu): „GO&REST PREMIUM / Vše navždy, bez reklam — 149 Kč" → paywall. U premium se banner nezobrazuje.
- **Paywall bottom sheet** (`Paywall` v designu): Gem ikona, nadpis „Go&Rest Premium", podtitul, seznam 5 výhod s Check ikonami, tlačítko „Koupit navždy — 149 Kč", text „Jednorázová platba. Žádné předplatné.", odkaz „Obnovit nákup". Pro premium stav: „PREMIUM AKTIVNÍ ✓". Použij `AppBottomSheet`.
- **Skrytí sekce „Ostatní" (Typ reklam)** v Nastavení pro premium (premium odstraňuje reklamy) — viz `Settings` v designu (`{!premium && <SettingsSection ... Ostatní>}`). Sekce reklam je dnes `PersonalizedAdsSettingItem` v `SettingsScreen`. Pro premium ji nezobrazovat.
- **Odstranění reklam pro premium**: rewarded/ostatní reklamy se pro premium uživatele nemají zobrazovat (ověřit místa, kde se ads volají — `useRewardedAd`, případně banner ads).
- Premium taky odemyká všechny prémiové hlasy/postavy natrvalo — v `character`/`sound` sheetech a guardech zohlednit `isPremium` (viz design: `on = premium || settings.unlocked[c.key]`).

### 2. Hodnocení náročnosti (RPE) — nezrušitelný popup po dokončení
- Po dokončení tréninku (Finish screen) naskočí **vycentrovaný, nezrušitelný modal popup** uprostřed obrazovky (ne bottom sheet) — viz `Finished` v designu, blok `rpe == null &&`.
- 5 smajlíků/úrovní `RPE`: 😌 V pohodě, 😮‍💨 Nadých, 😅 Slušně, 🥵 Náročné, 🤯 Na krev. Nadpis „Jak náročné to bylo?", popis „Vyber podle toho, kolik tě trénink stál fyzických sil."
- Zavře se **jen výběrem** hodnoty (0–4). Nejde zavřít jinak (žádné pozadí-tap, žádný křížek).
- Vybraná hodnota se promítne do souhrnu na Finish screen (blok „Náročnost" se smajlíkem + labelem) a uloží se do historie (viz feat. 3/4).
- Prototyp má i samostatnou screenu `Rating` (slider) — **ignoruj ji**, používá se popup varianta na Finish screen.

### 3. Finish screen — statistiky
Rozšířit `FinishedWorkoutScreen` (`src/components/navigation/AppNavigator/screens/FinishedWorkoutScreen/`) dle `Finished` v designu:
- Celkový čas (už existuje).
- Blok „Náročnost" (smajlík + label z RPE výběru).
- Dvě dlaždice: **Streak** (🔥 X + „X dní v řadě" / „Začni streak!" 💪) a **týdenní objem** („N×" + „tento týden · X min").
- Odkaz na Historii (tlačítko): premium → „Historie a vývoj náročnosti" + ArrowRight; free → „Historie, kalendář a vývoj náročnosti" + Lock (premium barva). Klik nav? na Historii (feat. 4).
- Po dokončení se do historie zapíše záznam `{ date, sec, rounds, rpe }` (commit při „Hotovo" i při otevření Historie — idempotentně, jen jednou).
- Helpery `computeStreak(log)` a `weekVolume(log)` z designu přepiš do TS helperů s testy (styl existujících `*.test.ts`). Použij `date-fns` (v deps) kde to dává smysl.
- Zachovat existující chování Finish screen (confetti, request review, sound-feedback titulky).

### 4. Historie (Premium screen)
Nová screena `HistoryScreen` (přidat do `AppNavigatorScreen` + navigátoru) dle `History` v designu:
- **Datový model** (nový): persistovaný atom `workoutHistoryAtom` (AsyncStorage), pole záznamů `{ date:number, sec:number, rounds:number, rpe:number|null }`, cap ~200, novější první. Nový `AsyncStorageKey`. Helper na zápis (jako `addLog`).
- **Free uživatel**: obsah rozmazaný (`blur`), pointerEvents none, přes něj overlay paywall (Gem, nadpis „Historie je součást Premium", popis, tlačítko „Odemknout — 149 Kč" → paywall). Jako demo se pod blurem ukazují DEMO data (viz `DEMO_LOG` v designu) jako ochutnávka.
- **Premium**: statistiky (streak dlaždice + týdenní objem), **dvoulinkový graf** čas (primary) + náročnost (premium barva) v čase s legendou „Čas / Náročnost", seznam posledních tréninků (smajlík + datum + „X kol · MM:SS" + ChevronRight), prázdné stavy.
- **Detail tréninku bottom sheet** (`DetailSheet` v designu): datum jako titul, celkový čas, náročnost (smajlík+label), dlaždice kol a minut.
- Graf: preferuj `react-native-gifted-charts`; pokud nejde čistě dvě linky s odlišnými škálami, použij `react-native-svg` vzorem z designového `LineChart`.

### 5. Záloha a obnova (Nastavení, Premium)
Nová sekce v Nastavení „Záloha a obnova" (`Database` ikona) dle designu:
- **Zálohovat data (Export)**: export do JSON — historie tréninků + uložené tréninky (+ verze, datum). Objekt `{ date, version, workouts, log }`. Použij PropCheck `backupService`/`shareService`/`fileService` vzor (`react-native-share` / `react-native-blob-util`). Soubor `goandrest-zaloha.json`.
- **Obnovit ze zálohy (Import)**: přes `@react-native-documents/picker` vybrat soubor, parsovat, a zobrazit **souhrnný bottom sheet** (`RestoreSheet` v designu) PŘED přepsáním: varovný alert (TriangleAlert, „Obnovením přepíšeš aktuální data… nelze vzít zpět"), datum zálohy, počet uložených tréninků, počet záznamů v historii, období záznamů. Tlačítko „Obnovit" + křížek pro zavření.
- Potvrzením se přepíše historie i uložené tréninky (napojit na `AppWorkoutsProvider` a `workoutHistoryAtom`).
- Robustní parse (zpětná kompatibilita: pole = jen log; objekt = plná záloha). Chybové stavy ošetřit (invalid JSON → popup).
- Pro free uživatele obě položky mají Gem badge a klik vede na paywall.

## Postup (doporučení pro managera)
1. Nejdřív projít PropCheck reference (RC config/service/provider; backupService/shareService/fileService) a GoAndRest konvence.
2. Infrastruktura: deps (package.json), RC config+service, premium atom/hook, history atom+helpery (+testy), i18n klíče.
3. UI/screeny: Paywall sheet, Landing Gem button, Settings (ProBanner, skrytí Ostatní, sekce Záloha), Finish (RPE popup + statistiky + odkaz), History screen + Detail sheet, Restore sheet, backup/restore service.
4. Průběžný review po každém subtasku; finální review celého diffu.
5. Na konci: `npm run type` (tsc) a `npm run lint` musí projít; existující testy nerozbít; přidat testy k novým helperům.

## Ověření (co říct uživateli na konci)
- Co je hotové a funkční hned vs. co vyžaduje jeho krok (RC klíče/product/entitlement, `pod install` / gradle, RC dashboard config).
- Seznam nových/změněných souborů a nových závislostí.

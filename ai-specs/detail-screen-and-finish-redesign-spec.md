# Spec: Detail tréninku jako SCREENA + redesign Finish screeny (dle nového designu)

Repo `/Users/ja/WebstormProjects/GoAndRest`. Reference (čti):
- Detail: `/private/tmp/claude-501/-Users-ja-WebstormProjects-GoAndRest/6b5781e7-3680-42b6-be0e-64b4449afa89/scratchpad/design_detailscreen_v7.jsx` (funkce `DetailScreen`).
- Finish: `.../scratchpad/design_finished_v7.jsx` (funkce `Finished`).

Konvence: jotai, i18n přes `useAppTranslation` (cs/en/sk + `locales/types.ts`), žádné hardcoded
texty, immutable, DRY. `npx tsc --noEmit` + `npx eslint <soubory>` čistě. Testy nerozbít.
NECOMMITUJ. Necommituj `ai-specs/`. Čti soubory čerstvě (jsou tam neuložené úpravy uživatele).

## DŮLEŽITÉ omezení
Uživatel: **„Na obrazovku Historie už nesahej — jen detail a finish screena."** Layout/design
obrazovky Historie NEMĚŇ. Jediná povolená změna v okolí historie je **minimální navigační
napojení**: položka listu už neotevírá bottom sheet, ale **naviguje na detail screenu**.

## 1) Detail = SCREENA (ne bottom sheet) + tlačítko Uložit
Dnes je detail bottom sheet (`useHistoryDetailBottomSheet` + `HistoryDetailBottomSheetContent`
+ `HistoryDetailSaveSection`). Předělej na plnou **screenu** dle `DetailScreen` v designu:
- Nová route `HistoryDetailScreen` v `AppNavigatorScreen` enum + params
  `{ entry: WorkoutHistoryEntry }` (entry je serializovatelný plain objekt — předávej ho v
  params). Registruj v `AppNavigator.tsx`.
- Nový `HistoryDetailScreen.tsx` s `AppScreenLayout`:
  - **Header**: title = `entry.name` (jinak datum), levá ikona `ArrowLeft` → `navigation.goBack()`.
  - **Datum** jako malá muted vycentrovaná linka nahoře v obsahu **jen když je název** (jinak
    už je datum v titulku).
  - **Dva boxy vedle sebe**: „Odcvičeno" (`entry.sec`, přes `AppTimeView`) + „Náročnost"
    (RPE smajlík + label) — **sdílená komponenta** (viz sekce 3).
  - **„Náročnost v čase"**: podtitulek `Stejný trénink „{name}"` (pojmenovaný) /
    `Tréninky se stejným nastavením` (nepojmenovaný) + graf `HistoryDifficultyChart` přes
    záznamy se stejným configem (`getWorkoutConfigSignature`, z `workoutHistoryAtom`), ≥2
    hodnocené jinak prázdný stav „Zatím není s čím porovnávat — dokonči víc stejných tréninků."
  - **„Nastavení tréninku"**: config přes `SavedWorkoutItemBody` (reuse), skryj když
    `entry.config` chybí.
  - **Footer (AppScreenLayout footer) — tlačítko „Uložit" s ikonou diskety** (`Save`) pro
    NEuložený trénink (má `config`, žádný odpovídající `savedWorkoutId`): uloží `entry.config`
    jako nový trénink (uuid, `storeWorkout`) a doplní `savedWorkoutId`+`name` do záznamu v
    historii; pak tlačítko zmizí (po uložení). Na screeně jde použít `AppInput` na název bez
    problémů (žádný Modal). Reuse logiku z `HistoryDetailSaveSection`. (V designu tlačítko
    není, ale uživatel ho EXPLICITNĚ chce — zachovej.)
- **Navigace z listu**: kde se dnes volá `openHistoryDetailBottomSheet(entry)` (v
  `HistoryScreen` → `onEntryPress`), nahraď za `navigation.navigate(HistoryDetailScreen,
  { entry })`. Toto je jediná povolená změna v historii (žádné jiné úpravy layoutu).
- Smaž bottom-sheet infra detailu: `useHistoryDetailBottomSheet.tsx`,
  `HistoryDetailBottomSheetContent.tsx` (obsah přesuň do screeny), a `HistoryDetailSaveSection`
  buď reuse ve screeně, nebo její logiku přenes.

## 2) Finish screena — redesign dle `Finished` v designu
`FinishedWorkoutScreen` / `FinishedWorkoutSummary` — data jsou dnes ve sloupci. Předělej:
- Sekce **nadpis „TENTO TRÉNINK"** (uppercase, muted, vlevo) + **dva boxy** „Odcvičeno"
  (odpracovaný čas) + „Náročnost" (smajlík + label) = **STEJNÁ sdílená komponenta** jako v
  detailu.
- Sekce **nadpis „CELKOVÝ VÝVOJ"** + streak dlaždice + týdenní dlaždice (reuse `WeekStatsRow`
  / existující streak dlaždice).
- **Odkaz na historii** (button-řádek): „Zobrazit celou historii" + ikona History + vpravo
  ArrowRight (premium) / Lock (free). (Text dřív „Historie a vývoj náročnosti" apod. → nový
  text „Zobrazit celou historii".)
- Footer tlačítko **„Hotovo"** (zůstává).
- RPE popup zůstává.
- **Uprav texty finish screeny dle designu** a **SMAŽ přebytečné překlady i konstanty**
  (nepoužité klíče v `historyScreen`/`finishedWorkoutScreen` po přechodu na boxy — např.
  `detailRoundsTile`/`detailMinutesTile` pokud zbyly, staré finish labely nahrazené novými,
  atd.). Ověř, že nic nepoužívané nezůstane (grep na klíče).

## 3) Sdílená komponenta boxů (reuse!)
Vytvoř jednu komponentu (např. `WorkoutOutcomeTiles`), která renderuje **dva boxy vedle sebe**
„Odcvičeno" (`sec`) + „Náročnost" (`rpe`), přesně dle designu (backgroundAlt, rounded, čas
~40, smajlík ~34 + label ~18 vedle sebe). Použij ji v **DetailScreen i Finished**. (Uživatel:
„ty boxy přepoužij, stejně jako jsem přepoužil ty boxy z historie já.")

## Zpětná kompatibilita
Starý záznam bez `config` → skryj sekci nastavení + save; bez `name` → jen datum v titulku a
žádná datum-linka; graf porovnání bez configu prázdný. `entry.sec` je odpracovaný čas.

## Postup
1. Sdílená `WorkoutOutcomeTiles`.
2. `HistoryDetailScreen` (route + screena + save footer) + navigace z listu + smazání sheet infra.
3. Finish redesign (boxy + nadpisy + odkaz + texty) + cleanup přebytečných překladů/konstant.
4. tsc + lint + testy; review.

Na konci vrať: seznam nových/změněných/smazaných souborů, jaké překlady/konstanty jsi smazal,
a výsledek tsc/lint/test.

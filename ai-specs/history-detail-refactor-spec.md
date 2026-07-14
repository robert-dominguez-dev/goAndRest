# Spec: Refactor Historie + detailu tréninku

## Kontext
Uživatel popsal 5 změn. **Design soubor (GoRestApp.jsx) tento refactor JEŠTĚ NEOBSAHUJE** —
History/DetailSheet v designu jsou staré. Implementuj tedy podle tohoto TEXTOVÉHO zadání a
drž vizuální styl existující apky (primitiva AppView/AppText/AppRow, barvy z colors.ts,
styl detailu/listu/grafu jak je teď). Reference k designu (staré, jen pro styl):
`/private/tmp/claude-501/-Users-ja-WebstormProjects-GoAndRest/6b5781e7-3680-42b6-be0e-64b4449afa89/scratchpad/design_v4.jsx` (funkce `History`, `DetailSheet`, `LineChart`).

Repo: `/Users/ja/WebstormProjects/GoAndRest`. Konvence: jotai atomy, i18n přes
`useAppTranslation` ve všech 3 jazycích (cs/en/sk) + typ v `locales/types.ts`, žádné
hardcoded texty, immutable, DRY, žádné zbytečné komentáře. Type check (`npx tsc --noEmit`)
i lint (`npx eslint <soubory>`) musí projít; testy nerozbít, k novým helperům přidat testy.
NECOMMITUJ (commituje uživatel). Necommituj `ai-specs/`.

## Datový model (jádro — udělej první)
Dnes `src/contexts/workoutHistory/types.ts`:
`WorkoutHistoryEntry = { date, sec, rounds, rpe }`. Rozšiř na:
```
type WorkoutHistoryEntry = {
  date: number;
  sec: number;          // reálně ODPRACOVANÝ čas (elapsed), NE čas z configu
  rounds: number;
  rpe: number | null;
  config?: AppWorkoutConfig;   // work/rest/recovery/series/rounds — pro porovnání "stejných" tréninků a pro uložení
  savedWorkoutId?: string;     // id uloženého tréninku, pokud běžel z uloženého (jinak undefined = neuložený)
  name?: string;               // název tréninku v době běhu (pro zobrazení), pokud byl
};
```
Vše nové je OPTIONAL kvůli zpětné kompatibilitě (staré záznamy je nemají — kód to musí
snést: bez `config` se do detailního grafu porovnání nezařadí; bez `savedWorkoutId` je
"neuložený"; bez `name` se zobrazí datum).
- `src/contexts/workoutHistory/helpers/addWorkoutHistoryEntry.ts` — přenášet nová pole.
- Nový helper `getWorkoutConfigSignature(config)` (+test): stabilní klíč
  `${work}-${rest}-${recovery}-${series}-${rounds}` pro grupování "stejných" tréninků
  (jen délky a počty, bez názvu/id).

## Finish flow — zapsat nová pole
`src/components/navigation/AppNavigator/screens/FinishedWorkoutScreen/hooks/useFinishedWorkoutSummary.ts`
zapisuje do historie. Musí do entry doplnit `config`, `savedWorkoutId`, `name`:
- `config` z `finishedWorkoutStatsAtom` (už z něj čte `workoutConfig.rounds`) — vezmi celý workoutConfig.
- `name` a `savedWorkoutId` — dohledej zdroj běžícího tréninku (např. `lastRunningWorkoutAtom`
  / running workout state; sleduj, odkud RunningWorkoutScreen bere název). Pokud běžel z
  uloženého tréninku (`AppStoredWorkout.id`), ulož `savedWorkoutId` + `name`. Pokud vlastní
  bez uložení → bez id, `name` volitelně.
- `sec` = reálný elapsed (už je tak počítaný — ověř, neměň na config totalTime).

## Bod 1: Rozbitý detail (jen čas)
Uživatel: v detailu vidí jen „Celkový čas" + čas, žádná další data. Komponenta
`HistoryDetailBottomSheetContent.tsx` přitom renderuje i náročnost + dlaždice kol/min —
**prozkoumej proč se zbytek nezobrazuje** (rozdělaná změna? layout? data?). Detail stejně
přestavuješ (body 2/3), takže zajisti, že se vykreslí vše.

## Bod 2: Rozdělené grafy
- **Graf v listu Historie** (`HistoryChartCard` + `HistoryTrendChart`): nechat JEN **časový
  graf** (odstranit náročnostní/čárkovanou linku a legendu náročnosti — nebo legendu upravit).
  Zůstává plná primary linka času s „X min" popisky + první/poslední datum.
- **Graf v detailu tréninku**: NOVÝ **graf náročnosti** (RPE v čase), který porovnává **jen
  tréninky se stejným configem** (stejná signatura přes `getWorkoutConfigSignature`, bez
  ohledu na název/id). X = data těch záznamů (chronologicky), Y = rpe 0–4, emoji smajlíky na
  bodech (styl jako feel-linka v `HistoryTrendChart`, čárkovaná premium). Když je jen 1 nebo
  0 stejných záznamů, ukázat rozumný prázdný/single stav. Vytvoř samostatnou komponentu
  (např. `HistoryDifficultyChart`) sdílející geometrii s `HistoryTrendChart` (DRY — zvaž
  extrakci sdíleného SVG základu).

## Bod 3: Položka listu + save
- **List item** (`HistoryRecentListItem`): title = **název** (entry.name / z uloženého
  tréninku), pod ním **datum** jako description (menší, muted). Když název není → jen datum
  (jako title). Vlevo rpe emoji, vpravo reálný odpracovaný čas (`fmt`/`AppTimeView` z
  `entry.sec`), chevron. (Dnes je title datum — změnit.)
- **Detail — save button**: pokud je trénink **neuložený** (žádné `entry.savedWorkoutId`
  odpovídající existujícímu uloženému tréninku), zobraz ve **footeru** detail bottom sheetu
  tlačítko **Uložit** s ikonou diskety (`Save` z AppIcon). Uloží `entry.config` jako nový
  `AppStoredWorkout` — reuse existující save flow (`SaveWorkoutBottomSheetContent` /
  `getWorkoutNameRules` / `AppWorkoutsProvider` add). Po uložení nastav entry `savedWorkoutId`
  (aby tlačítko zmizelo) — tzn. aktualizuj i příslušný `WorkoutHistoryEntry` v historii.
  Pokud entry nemá `config` (starý záznam), tlačítko neukazuj.
  - Bottom sheet footer: `AppBottomSheet` má footer/patičku? Pokud ne, přidej tlačítko na
    konec contentu detailu (dole), s ikonou diskety.
- **Čas**: ověř, že čas vpravo v listu i hlavní čas v detailu jde z `entry.sec` (odpracovaný),
  ne z configu.

## Bod 4: Premium hlasy po koupi
Když má uživatel premium:
- Názvy prémiových postav/hlasů mají být **bílé** (`text`), ne prémiově zlaté. Dnes
  `CharacterVariantSettingItem` / `PremiumCharacterBottomSheetContent` používají
  `textColorStatus={'premium'}` / `accessoryLeftTextColorStatus={'premium'}`. Pro premium
  přepni na `text`.
- Položka „Premium hlasy" (SoundFeedback item) má **stále mít gem**, ale **bílý** (ne zlatý)
  — když je premium. Zdroj: `getSoundFeedbackSettingValueProps` /
  `SoundFeedbackSettingItem` (badge/gem barva). Pro premium gem `text` místo `premium`.

## Body k dořešení / zpětná kompatibilita
- Demo generátor `getDemoWorkoutHistoryLog` — přidej do demo záznamů i `config` (různé
  configy, ať porovnání v detailu dává smysl) + volitelně `name`.
- `parseBackup` (`src/services/helpers/parseBackup.ts` + test) — validace nových polí
  (config volitelný objekt s number poli; savedWorkoutId string; name string). Robustně
  ignorovat špatné.
- Nové locale klíče (cs/en/sk + types): save tlačítko, detail difficulty chart titulek/legenda/
  prázdný stav, atd.

## Postup
1. Datový model + signature helper (+testy) → finish flow zápis.
2. List item (název/datum/čas) → detail (fix + real čas + kol/min + difficulty chart + save
   button + save flow).
3. Rozdělení grafů (list = čas, detail = náročnost).
4. Premium hlasy bílé + bílý gem.
5. demo + parseBackup + locales.
6. tsc + lint + testy; průběžný a finální review.

Na konci vrať: seznam změněných/nových souborů, jak řešíš zpětnou kompatibilitu starých
záznamů, výsledek tsc/lint/test, a co (pokud něco) vyžaduje rozhodnutí uživatele.

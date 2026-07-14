# Spec: Redesign detailu tréninku v Historii (podle nového designu)

Design byl aktualizovaný. Nová podoba **DetailSheetu** (bottom sheet detailu položky
historie) je uložená zde — **čti jako referenci layoutu/textů**:
`/private/tmp/claude-501/-Users-ja-WebstormProjects-GoAndRest/6b5781e7-3680-42b6-be0e-64b4449afa89/scratchpad/design_detail_v5.jsx`
(funkce `DetailSheet` + helper `Detail`). Plný design: `.../scratchpad/design_v5.jsx`.

Repo: `/Users/ja/WebstormProjects/GoAndRest`. Konvence: jotai atomy, i18n přes
`useAppTranslation` (cs/en/sk + `locales/types.ts`), žádné hardcoded texty, immutable, DRY,
žádné zbytečné komentáře. `npx tsc --noEmit` + `npx eslint <soubory>` musí projít; testy
nerozbít. NECOMMITUJ. Necommituj `ai-specs/`. Čti soubory čerstvě před editací (jsou tam i
neuložené úpravy uživatele).

## Kontext / aktuální stav
- Uživatel hlásí, že **detail se renderuje prázdný** (runtime) — přestavěním celého obsahu
  detailu dle nového designu se to má vyřešit; pokud prázdno přetrvá, prozkoumej runtime
  příčinu (ScrollView/layout v `AppBottomSheetContent`, nebo throw v obsahu).
- Datový model `WorkoutHistoryEntry` už má `config?`, `savedWorkoutId?`, `name?`. Signatura
  configu: `getWorkoutConfigSignature` (existuje). Existují komponenty
  `HistoryDifficultyChart`, `HistoryDetailSaveSection`.
- `useHistoryDetailBottomSheet.tsx` už má rozdělaný title/subtitle (název + datum, jinak
  datum) — zachovej/dolaď (uživatel to explicitně chce).

## Detail — nový layout (dle `DetailSheet` v designu), shora dolů
1. **„Odcvičeno"** (uppercase, muted) + velký **odpracovaný čas** = `entry.sec` (NE config
   totalTime). [dnes je label „Celkový čas" → přejmenovat na „Odcvičeno".]
2. **Náročnost** (divider nad) — RPE smajlík + label (jako dnes).
3. **„Náročnost v čase"** (divider nad) — podtitulek:
   - pojmenovaný trénink: `Stejný trénink „{name}"`,
   - nepojmenovaný: `Tréninky se stejným nastavením`.
   - Graf náročnosti (`HistoryDifficultyChart`) přes záznamy se **stejným configem**
     (přes `getWorkoutConfigSignature` — to je korektní realizace „stejného nastavení";
     design tam má jen heuristiku name/rounds+sec, ale my máme přesný config), chronologicky,
     max 14, jen když jsou **≥2 hodnocené** — jinak prázdný stav
     „Zatím není s čím porovnávat — dokonči víc stejných tréninků."
4. **NOVÁ sekce „Nastavení tréninku"** (divider nad) — ikona `SlidersHorizontal` (přidej do
   AppIcon, je v lucide) + nadpis „NASTAVENÍ TRÉNINKU" (muted), pod tím **dvousloupcový
   rozpis configu** z `entry.config`:
   - levý sloupec: Cvičení (barva work) / Pauza (rest-strong) / Pauza mezi koly
     (recovery-strong) — hodnoty `fmt` (mm:ss),
   - pravý sloupec: Počet sérií / Počet kol (muted).
   - **REUSE** existující `SavedWorkoutItemBody` / `SavedWorkoutItemBodyRow` (stejný vzhled
     jako v uložených trénincích) — extrahuj sdílenou komponentu, ať to není copy-paste.
   - **Nahrazuje dřívější dlaždice „kol/min"** (ty odstraň).
   - Když `entry.config` chybí (starý záznam), sekci „Nastavení tréninku" **skryj**.
5. **Save** (item 3 od uživatele — v designu není zobrazeno, ale uživatel ho chce zachovat):
   pro **neuložený** trénink (bez odpovídajícího `savedWorkoutId` v uložených) ponech
   možnost uložit config jako nový trénink — tlačítko s ikonou diskety (`Save`). Umísti
   rozumně (dole). Po uložení doplní `savedWorkoutId`+`name` do záznamu a zmizí. Reuse
   existující `HistoryDetailSaveSection` (jen ověř, že nezpůsobuje ten prázdný render — pokud
   ano, zjednoduš).

## Title/subtitle bottom sheetu (od uživatele)
Stejná logika jako list item: **název** = title + **datum** = subtitle (když je název);
jinak jen **datum** = title. (`AppHeader.title` bere `string | JSX.Element` — už rozdělané v
`useHistoryDetailBottomSheet.tsx`.)

## Ostatní
- Grafy zůstávají rozdělené: list = časový (`HistoryTrendChart`), detail = náročnost.
- Nové/změněné locale klíče (cs/en/sk + types): „Odcvičeno", „Náročnost v čase",
  podtitulky (Stejný trénink „{name}" / Tréninky se stejným nastavením), prázdný stav,
  „Nastavení tréninku", labely Cvičení/Pauza/Pauza mezi koly/Počet sérií/Počet kol (nejspíš
  už existují ve `common.workoutConfig` — reuse).
- Zpětná kompatibilita: starý záznam bez `config` → skryj sekci nastavení + save; bez `name`
  → title jen datum; graf porovnání bez configu prázdný.

## Postup
1. Přestav `HistoryDetailBottomSheetContent` dle nového designu (Odcvičeno / Náročnost /
   Náročnost v čase / Nastavení tréninku / save).
2. Config sekce reuse `SavedWorkoutItemBody`.
3. Ikona `SlidersHorizontal` do AppIcon. Locale klíče.
4. Ověř, že se detail reálně vykreslí (žádný prázdný obsah).
5. tsc + lint + testy; review.

Na konci vrať: seznam změněných/nových souborů, jak jsi vyřešil prázdný render, výsledek
tsc/lint/test.

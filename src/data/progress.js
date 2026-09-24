/**
 * ─────────────────────────────────────────────────────────────────────────
 *  FRASO — PROGRESS DATA
 * ─────────────────────────────────────────────────────────────────────────
 *  This is the ONLY file you should need to edit to update the website.
 *  Every number shown on the site (hero, progress cards, milestone,
 *  chapters, countdown) is read from this file. Change a value here and
 *  it updates everywhere it appears — nothing is hardcoded in components.
 *
 *  Percentages are plain numbers (0-100). `overall` is the one official
 *  overall-completion number and is NOT calculated from the categories
 *  below — set it by hand.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const progress = {
  // The single official "how much of Fraso is done" number.
  // This is set by hand — it is intentionally NOT an average of the
  // categories below.
  overall: 49.6,

  // Production categories — shown in the "FRASO PROGRESS" section.
  // Add/remove a category here and the grid updates automatically.
  categories: [
    { key: 'idea', label: 'Idea', value: 100 },
    { key: 'storyLines', label: 'Story Lines', value: 100 },
    { key: 'textWriting', label: 'Text Writing', value: 100 },
    { key: 'textPolish', label: 'Text Polish', value: 70 },
    { key: 'sceneDrawing', label: 'Scene Drawing', value: 48 },
    { key: 'scenePolish', label: 'Scene Polish', value: 46 },
    { key: 'bookCover', label: 'Book Cover', value: 50 },
  ],

  // Pages milestone.
  pagesCompleted: 83,
  // Total pages Fraso is currently expected to run. Shown as "83 / 175" in
  // the milestone section and used to fill its progress bar. Set to `null`
  // to go back to showing pagesCompleted alone with no target/bar, exactly
  // like before this existed.
  pagesTarget: 207,

  // Chapter-by-chapter progress. `status` of "locked" renders the chapter
  // as a "coming soon" placeholder instead of a percentage — use this only
  // for chapters that don't exist yet. A real chapter that simply hasn't
  // had any pages finished yet should stay "active" with value: 0 — the UI
  // shows it grayed out rather than red, without calling it "coming soon".
  chapters: [
    { key: 'book1-chapter1', label: 'Book 1 · Chapter 01', value: 100, status: 'active' },
    { key: 'book1-chapter2', label: 'Book 1 · Chapter 02', value: 85, status: 'active' },
    { key: 'book1-chapter3', label: 'Book 1 · Chapter 03', value: 30, status: 'active' },
    { key: 'book2-chapter1', label: 'Book 2 · Chapter 01', value: 0, status: 'active' },
  ],

  // ── Countdown / release date ──────────────────────────────────────────
  // Fraso does not have an announced release date yet. Leave
  // `countdownEnabled: false` and `releaseDate: null` until there is a
  // real target date — the site will not invent one.
  //
  // When a real date is set, flip `countdownEnabled` to true and set
  // `releaseDate` to an ISO string (e.g. "2027-06-01"). No other changes
  // are needed — the hero will automatically start showing a live
  // countdown instead of the "journey" framing.
  countdownEnabled: false,
  releaseDate: null,

  // ── Misc / editable placeholders ──────────────────────────────────────
  // Freely editable. Set any of these to `null` to hide them from the UI
  // instead of showing a fabricated value.
  currentPhase: 'Scene Drawing',
  lastUpdated: 'September 24, 2026',
  wordCount: null,
};

/** Derived: how much of the story is left, computed from `overall`. */
export const remainingPercent = Number((100 - progress.overall).toFixed(1));

/** Derived: pagesCompleted as a % of pagesTarget, or null if there's no target set. */
export const pagesPercent = progress.pagesTarget
  ? Number(Math.min(100, (progress.pagesCompleted / progress.pagesTarget) * 100).toFixed(1))
  : null;

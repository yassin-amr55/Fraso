/**
 * ─────────────────────────────────────────────────────────────────────────
 *  FRASO — WORD STATISTICS
 * ─────────────────────────────────────────────────────────────────────────
 *  Word / name frequency counts shown in the "FRASO BY THE NUMBERS"
 *  section. Add, remove, or edit entries freely in any order — the UI
 *  always sorts by `count` descending, so you never need to reorder
 *  this list by hand.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const wordStats = [
  { word: 'Fraso', count: 1076 },
  { word: 'Zeolite', count: 385 },
  { word: 'Sern', count: 202 },
  { word: 'Koil', count: 182 },
  { word: 'Pole', count: 133 },
  { word: 'Molp', count: 116 },
  { word: 'slayer', count: 88 },
  { word: 'peasant', count: 86 },
  { word: 'Klyth', count: 17 },
  { word: 'Dutch', count: 16 },
  { word: 'flestium', count: 8 },
  { word: 'Kuster', count: 7 },
];

/** Always read this sorted export from components — never the raw array. */
export const sortedWordStats = [...wordStats].sort((a, b) => b.count - a.count);

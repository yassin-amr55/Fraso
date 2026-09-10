# Fraso — Official Progress Website

The public "road to release" site for **Fraso**, a dark fantasy story by Yassin Shehab
(Elent Tales). Built with React + Vite.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` folder you can
host anywhere (Netlify, Vercel, GitHub Pages, any static host).

## Updating the numbers on the site

You should never need to touch a component to change a statistic. Everything the site
displays is read from two files:

- **[src/data/progress.js](src/data/progress.js)** — overall completion %, the production
  category percentages (Idea, Story Lines, Text Writing, Text Polish, Scene Drawing, Scene
  Polish, Book Cover), pages completed, chapter progress, and the release-countdown switch.
- **[src/data/wordStats.js](src/data/wordStats.js)** — word/name mention counts. The
  leaderboard sorts itself by count automatically, so entries can be listed in any order and
  you can add or remove words freely.

Edit a value in either file and every place it's displayed on the site updates — nothing is
duplicated or hardcoded elsewhere.

### Adding a real release date later

Fraso doesn't have an announced release date yet, so the site currently frames progress as
"48.2% complete / 51.8% remaining" rather than a countdown clock. When there's a real date:

1. Open `src/data/progress.js`.
2. Set `releaseDate` to an ISO date string, e.g. `"2027-06-01"`.
3. Set `countdownEnabled: true`.

The data layer is already shaped for this — wiring an actual countdown-timer component up to
those two fields is a self-contained follow-up, no redesign required.

## Project structure

```
src/
  assets/        Fraso cover art + Elent Tales logo
  data/          progress.js, wordStats.js — the single source of truth for all numbers
  hooks/         useCountUp, useInView, useReducedMotion — small animation utilities
  components/
    ui/          Reveal, ProgressBar, RadialGauge — shared building blocks
    Hero.jsx, ProgressSection.jsx, MilestoneSection.jsx,
    ChapterTimeline.jsx, WordStats.jsx, Footer.jsx
  styles/
    global.css   Design tokens (colors, type, spacing) + shared utilities
```

Each section component pairs with its own CSS file (e.g. `Hero.jsx` / `Hero.css`) so styling
stays scoped and easy to find.

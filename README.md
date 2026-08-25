# Portfolio — Ahmed Amin

My personal portfolio. Plain HTML, CSS and JavaScript. No frameworks, no build step,
no dependencies.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: hero, headline numbers, what I do, featured projects |
| `projects.html` | All projects, filterable by type |
| `about.html` | Bio, timeline, skills, awards, how I work |
| `cv.html` | Full CV, with a Save as PDF button |
| `contact.html` | Ways to reach me |
| `assets/style.css` | All styling, both themes |
| `assets/main.js` | All behaviour |

## Features

- **Light and dark theme** — light by default, dark is opt-in and remembered in the browser
- **Scroll animations** that fade sections in as you reach them
- **Animated counters** on the headline numbers
- **Typing effect** in the hero
- **Project filter** by research, production and hardware
- **Reading progress bar** and back-to-top button
- **Fully responsive**, with a mobile menu under 680px
- **Respects `prefers-reduced-motion`** — all animation switches off
- **Prints cleanly** to PDF, and the CV page has its own Save as PDF button

## Running it

Open `index.html` in a browser. That is the whole setup.

## Publishing to GitHub Pages

Push to `main`, then in the repository go to **Settings → Pages** and set the source
to `main` / root. The site appears at `https://ahmedamen1.github.io/Portfolio-/`.

## Editing

- **Change a project**: edit the `<article class="card pcard">` block in `projects.html`.
  The `data-kind` attribute controls which filter it appears under, and `--t` sets the
  accent colour.
- **Change a number**: the counters use `data-count`, with optional `data-suffix`,
  `data-prefix` and `data-dec`.
- **Change the typing lines**: edit `data-lines` on `#typed` in `index.html`.
- **Change colours**: the palette lives at the top of `assets/style.css`, in `:root`
  for light and `html[data-theme="dark"]` for dark.

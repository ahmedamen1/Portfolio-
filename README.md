# Portfolio — Ahmed Amin

My personal portfolio. Plain HTML, CSS and JavaScript. No frameworks, no build step,
no dependencies.

Live at **https://ahmedamen1.github.io/Portfolio-/**

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: hero, what I do, featured projects |
| `projects.html` | All projects, grouped and filterable by type |
| `about.html` | Bio, timeline, skills, awards, how I work |
| `cv.html` | Full CV, with a Save as PDF button |
| `contact.html` | Ways to reach me |
| `project-*.html` | One page per project — 11 of them |
| `transcript-analysis.html` | Standalone write-up |
| `assets/style.css` | All styling, both themes |
| `assets/main.js` | All behaviour |

## Project pages

Each project page is a short summary built around whatever shows the work best,
rather than a long write-up:

- **Hero figures** — the two or three numbers that matter
- **What it does** — a grid of capabilities, one line each
- **See it work** — a scripted walkthrough of real behaviour, or photographs
  (`project-rafeeq.html`)
- **Page nav** — previous and next project

Four pages (`credit`, `energy`, `finverse`, `security`) have no demo or photographs
yet, so they are shorter than the rest.

## Features

- **Light and dark theme** — light by default, dark is opt-in and remembered in the
  browser
- **Scroll animations** that fade sections in as you reach them
- **Typing effect** in the hero
- **Project filter** — all, rag, research, learning, optimization, vision, hardware
- **Clickable project cards** — the whole card is the link to its project page
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

- **Change a project card**: edit the `<article class="card pcard">` block in
  `projects.html`. The `data-kind` attribute controls which filter it appears under,
  and `--t` sets the accent colour.
- **Card links**: each card contains `<a class="cardfill">`, an overlay that makes the
  whole card clickable. Any other link in a card needs to sit above it — the
  `.pcard .foot a` and `.pcard .tags` rules in `assets/style.css` handle that. Do not nest a
  link inside the overlay.
- **Change the typing lines**: edit `data-lines` on `#typed` in `index.html`.
- **Change colours**: the palette lives at the top of `assets/style.css`, in `:root`
  for light and `html[data-theme="dark"]` for dark.

# SignalFoundry v2

An interactive idea shelf and launch workbench with an animated navy/pastel visual identity.

## Version 2

- 18 distinct editorial starter concepts across content, software and products
- Text search, category/time filters, sorting and an explicit empty state
- Favourite ideas persisted in browser local storage
- Audience- and time-aware four-week plans with eight tracked tasks
- Markdown plan download and three tailored prompt templates
- Revenue less variable and fixed costs calculator, with invalid-input handling
- Reduced-motion support and a manual animation pause button
- Native keyboard-accessible dialogs and responsive layouts

This is a static, rule-based planning application. It has no connected AI API,
payments, live market data, cloud accounts or automated publishing service.
Concept costs and time requirements are editorial estimates, not verified quotes.
Plans and favourites only persist in the same browser and can be lost if its data
is cleared. Export plans for a portable backup.

## Design research

Reviewed Starter Story's clear searchable business discovery and concrete breakdowns,
IdeaBrowser's published database/idea descriptions, and Gumroad's direct creator
positioning. Original artwork is implemented in CSS; no competitor assets are copied.

- https://www.starterstory.com/
- https://www.ideabrowser.com/
- https://gumroad.com/

## Original version notes

A responsive, static decision tool that compares three AI-assisted online business models: niche content, micro-SaaS and digital products.

## Features

- Three-step business-model finder
- Interactive gross-revenue assumption calculator
- Model-specific 30-day launch roadmaps
- Detailed playbook dialogs
- Responsive layout and reduced-motion support
- No framework, build process, database or API keys required
- Automatic GitHub Pages workflow

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Publish with GitHub Pages

1. Push these files to the default branch of a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. The included workflow publishes the site after each push to `main`.

If your default branch has another name, change the branch under `on.push.branches` in `.github/workflows/pages.yml`.

## Content and compliance

The calculator models gross revenue from user-entered assumptions. It is not a projection, promise or financial advice. Any affiliate implementation should clearly disclose commercial relationships, and AI-assisted editorial content should be reviewed for accuracy and original value before publication.

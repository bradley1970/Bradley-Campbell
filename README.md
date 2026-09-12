# SignalFoundry

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

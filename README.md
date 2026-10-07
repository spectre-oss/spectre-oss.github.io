# Spectre OSS

Minimal organization landing page built with Svelte 5 and SvelteKit 3.

**Website:** https://spectre-oss.github.io

## Develop

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run check
npm run build
npm run preview
```

The static adapter writes the site to `build/`. GitHub Actions checks and builds pull requests, then builds and deploys pushes to `main` through GitHub Pages. Manual deployment is also available from the Actions tab. Repository Pages settings must use GitHub Actions as the build source.

Edit `src/routes/+page.svelte` to update the page. The project owner supplied the ghost artwork in `src/lib/assets/favicon.svg`; no new license is assigned to that artwork here.

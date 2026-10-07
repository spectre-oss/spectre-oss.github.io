# Spectre OSS website

A simple, responsive organization landing page built with Svelte 5 and SvelteKit 3. Includes the Spectre ghost, an introduction to the organization, and links to the Rabbit R1 projects.

## Development

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

## Checks and production build

```sh
npm run check
npm run build
npm run preview
```

The static adapter generates the site in `build/`. Serve that directory from a static host at the domain root. Hosting is not configured yet.

Page content and styles: `src/routes/+page.svelte`.
Brand artwork: `src/lib/assets/favicon.svg`, supplied by the project owner. No new license is assigned to the artwork here.

No external fonts, analytics, or backend services are required.

# ProjectLibration website

The Spectre OSS landing page for ProjectLibration, built with Svelte and SvelteKit. It introduces the Linux-host mobile Linux workflow and provides a downloadable starter system prompt.

## Develop

Use Node.js 22.12+ and npm:

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run check
npm run build
python3 -m unittest discover -s tools -p 'test_*.py'
```

## Versions and signed commits

The website and [ProjectLibration](https://github.com/spectre-oss/project-libration) have independent versions. Website versions are synchronized across `VERSION`, `package.json`, and `package-lock.json`; release history is in `Changelog.txt`.

Run `sh tools/install-hooks.sh` after cloning. The hooks validate Conventional Commits, scan the index for common credential patterns, calculate the version, and ask the authenticated Grok CLI for changelog notes. Read [the release workflow](tools/README.md). Git signing must be configured with your own identity and key outside the repository.

The static adapter writes to `build/`. Existing GitHub Actions deploy pushes to `main` through GitHub Pages. Local commits do not publish the site.

The landing artwork uses the remote video and poster supplied in the design brief. Fonts load from Google Fonts. The original Spectre ghost artwork remains in `src/lib/assets/favicon.svg`.

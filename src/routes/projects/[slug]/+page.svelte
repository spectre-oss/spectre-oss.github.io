<script lang="ts">
  import HeroIcon from '#lib/HeroIcon.svelte';
  import { projects } from '#lib/projects.js';
  import { version } from '../../../../package.json';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  let scrollY = $state(0);
</script>

<svelte:head>
  <title>{data.project.name} — SpectreOSS</title>
  <meta name="description" content={data.project.summary} />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<svelte:window bind:scrollY />

<div class="project-page">
  <header class:scrolled={scrollY > 24}><a class="wordmark" href="/">SpectreOSS</a><a class="back" href="/#projects" aria-label="All projects"><HeroIcon name="arrow-left" /><span class="back-label">All projects</span></a></header>
  <main>
    <div class="eyebrow"><span>{data.project.category}</span><span class="status"><span aria-hidden="true">·</span> {data.project.status}</span></div>
    <h1>{data.project.name}</h1>
    <p class="tagline">{data.project.tagline}</p>
    <p class="summary">{data.project.summary}</p>
    <div class="details">
      {#each data.project.sections as section}
        <section><h2>{section.title}</h2><p>{section.text}</p></section>
      {/each}
    </div>
    <section class="resources" aria-labelledby="resources"><h2 id="resources">Explore the work</h2><nav aria-label={data.project.name + ' resources'}>{#each data.project.links as link}<a href={link.href}>{link.label}<HeroIcon name="arrow-up-right" /></a>{/each}</nav></section>
    <nav class="other-projects" aria-label="Other projects"><span>MORE FROM SPECTREOSS</span>{#each projects.filter(project => project.slug !== data.project.slug) as project}<a href={'/projects/' + project.slug + '/'}>{project.name} <HeroIcon name="arrow-right" /></a>{/each}</nav>
  </main>
  <footer><a href="https://github.com/spectre-oss">GitHub <HeroIcon name="arrow-up-right" /></a><span>Website v{version}</span></footer>
</div>

<style>
  .project-page { max-width: 824px; margin: 0 auto; padding: 69px 32px 28px; }
  a { color: #ccc; text-decoration: none; transition: color .15s; } a:hover { color: #fff; }
  header { position: fixed; z-index: 50; top: 24px; left: 0; right: 0; padding: 0 32px; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 12px; pointer-events: none; }
  header a { pointer-events: auto; min-height: 44px; border: 1px solid transparent; border-radius: 999px; padding: 8px 16px; display: inline-flex; align-items: center; transition: background .2s, border-color .2s, box-shadow .2s, color .15s; }
  header.scrolled a { background: rgba(18,18,18,.88); border-color: #ffffff24; backdrop-filter: blur(16px); box-shadow: 0 4px 20px #0005; }
  header.scrolled a:hover { background: #222; border-color: #ffffff40; }
  .wordmark { grid-column: 2; grid-row: 1; justify-self: center; font-size: 17px; letter-spacing: -.4px; font-weight: 550; }
  .back { grid-column: 1; grid-row: 1; justify-self: start; gap: 8px; font-size: 12px; color: #aaa; }
  main { margin-top: clamp(72px, 14vh, 150px); }
  .eyebrow { display: flex; flex-wrap: wrap; gap: 12px 24px; font-size: 10px; letter-spacing: 1.2px; color: #858585; }
  .status { letter-spacing: 0; } .status span { color: #ccc; padding-right: 4px; }
  h1 { margin: 20px 0 16px; font-size: clamp(36px, 7vw, 64px); font-weight: 450; line-height: 1.15; letter-spacing: -2px; overflow-wrap: anywhere; }
  .tagline { color: #ddd; font-size: clamp(20px, 3vw, 26px); letter-spacing: -.5px; margin: 0; }
  .summary { max-width: 620px; color: #999; font-size: 16px; line-height: 1.8; margin: 24px 0 64px; }
  .details { border-top: 1px solid #242424; }
  .details section { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; padding: 32px 0; border-bottom: 1px solid #1d1d1d; }
  h2 { font-size: 15px; font-weight: 500; margin: 0; } section p { margin: 0; color: #999; font-size: 14px; line-height: 1.9; }
  .resources { margin-top: 48px; } .resources nav { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
  .resources a { display: inline-flex; align-items: center; gap: 20px; border: 1px solid #292929; border-radius: 5px; padding: 10px 16px; font-size: 12px; } .resources a:hover { border-color: #666; }
  .other-projects { margin-top: 72px; padding-top: 28px; border-top: 1px solid #242424; display: flex; align-items: center; flex-wrap: wrap; gap: 16px 28px; }
  .other-projects > span { font-size: 10px; letter-spacing: 1px; color: #666; width: 100%; }.other-projects a { display: inline-flex; align-items: center; gap: 12px; font-size: 14px; }
  footer a { display: inline-flex; align-items: center; gap: 6px; }
  footer { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 24px; border-top: 1px solid #242424; font-size: 11px; color: #666; }
  @media(max-width: 560px) { .project-page { padding: 57px 24px 28px; } header { top: 16px; padding: 0 16px; } .details section { grid-template-columns: 1fr; gap: 12px; } }
  @media(max-width: 380px) { .back-label { display: none; } }
  @media(prefers-reduced-motion: reduce) { a, header a { transition: none; } }
</style>

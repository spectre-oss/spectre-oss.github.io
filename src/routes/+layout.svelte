<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { background: #000; color-scheme: dark; scroll-behavior: smooth; }
  :global(body) { margin: 0; background: #000; color: #e8e8e8; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.7; }
  :global(a:focus-visible) { outline: 2px solid #fff; outline-offset: 5px; }
  @media(prefers-reduced-motion: reduce) { :global(html) { scroll-behavior: auto; } }
</style>

<script lang="ts">
  // Heroicons outline icons, MIT licensed. See LICENSE.heroicons.txt.
  let { name, size = 16 }: { name: 'arrow-up-right' | 'arrow-right' | 'arrow-left' | 'chevron-down'; size?: number } = $props();
  const paths = {
  "arrow-up-right": [
    "m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
  ],
  "arrow-right": [
    "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  ],
  "arrow-left": [
    "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  ],
  "chevron-down": [
    "m19.5 8.25-7.5 7.5-7.5-7.5"
  ]
};
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false">
  {#each paths[name] as d}<path stroke-linecap="round" stroke-linejoin="round" {d} />{/each}
</svg>

<style>
  svg { display: block; flex-shrink: 0; }
</style>

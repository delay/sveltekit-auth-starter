<script lang="ts">
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	export let data;
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-50))', start: 75, end: 100 }
	];
</script>

{#if data.result?.heading}
	<h3>{data.result.heading}</h3>
{/if}
<hr class="!border-t-2 mt-2 mb-6" />
{#if data.result?.message}
	{@html data.result.message}
{:else}
	<ConicGradient stops={conicStops} spin width="w-12" />
{/if}

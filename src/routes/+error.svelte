<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status === 404}
		<h1>Page Not Found.</h1>
		<h3 class="mt-6"><a href="/">Go Home</a></h3>
	{:else}
		<h1 class="h1">Unexpected Error</h1>
		<h3 class="mt-6">We're investigating the issue.</h3>
	{/if}

	{#if $page.error?.errorId}
		<p class="mt-6">Error ID: {$page.error.errorId}</p>
	{/if}
</div>

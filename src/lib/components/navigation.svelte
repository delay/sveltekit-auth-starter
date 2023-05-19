<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { i, languages, language, switchLanguage } from '@inlang/sdk-js';

	function drawerClose(): void { drawerStore.close() };
	
	import { page } from '$app/stores';
	import type { NavItems } from '$lib/config/constants';
    export let navItems: NavItems;
	let selectedLanguage: string = language || 'en';
</script>

<nav class="list-nav p-4">
	<div class="flex flex-row justify-between items-center">
		<div class="">
			<select
				class="select"
				bind:value={selectedLanguage}
				size="1"
				on:change={() => switchLanguage(selectedLanguage)}
			>
				{#each languages as lang}
					<option value={lang}>{lang}</option>
				{/each}
			</select>
		</div>
		<div class="">
			<LightSwitch />
		</div>
	</div>
	<ul class="list mt-8">
		{#each navItems||[] as nav}
			{#if nav.title === 'signout'}
				{#if $page.data.user}
					<li>
						<form
								use:enhance
								action="/auth/sign-out"
								method="post"
								on:click={drawerClose}
								on:keydown={drawerClose}
							>
								<button type="submit" class="btn"
									><span><svelte:component this={nav.icon}/></span><span>{i(nav.title)}</span></button
								>
						</form>
					</li>
				{/if}
			{:else if (nav.alwaysVisible || ($page.data.user && nav.protected) || (!$page.data.user && !nav.protected))}
				<li>
					<a href="{nav.url}" on:click={drawerClose} class="{$page.url.pathname === nav.url ? 'bg-primary-active-token' : ''}">
						<span><svelte:component this={nav.icon}/></span>
						<span class="flex-auto">{i(nav.title)}</span>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

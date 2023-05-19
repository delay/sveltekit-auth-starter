<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { NavItems } from '$lib/config/constants';
    import { i } from '@inlang/sdk-js';
    export let navItems: NavItems;
</script>

<div class="card h-16 md:hidden">
    <div class="h-full max-w-sm flex mx-auto justify-center">
        {#each navItems||[] as nav}
            {#if nav.title === 'signout'}
                {#if $page.data.user}
                    <form
                            use:enhance
                            action="/auth/sign-out"
                            method="post"
                        >
                            <button type="submit" class="btn"
                                ><span><svelte:component this={nav.icon}/></span><span>{i(nav.title)}</span></button
                            >
                    </form>
                {/if}
            {:else if (nav.alwaysVisible || ($page.data.user && nav.protected) || (!$page.data.user && !nav.protected))}
                <a class="btn variant-glass inline-flex flex-col items-center justify-center card {$page.url.pathname === nav.url ? 'bg-primary-active-token' : ''}" href="{nav.url}">
                    <svelte:component this={nav.icon} />
                    <span class="text-sm">{i(nav.title)}</span>
                </a>
            {/if}
        {/each}
    </div>
</div>
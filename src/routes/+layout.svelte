<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	//import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Modal,
		Toast,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/navigation.svelte';
	import { APP_NAME, navItems } from '$lib/config/constants';
	import Footer from '$lib/components/footer.svelte';
	import { Menu } from 'lucide-svelte';
	import convertNameToInitials from '$lib/_helpers/convertNameToInitials';
	import BottomBar from '$lib/components/BottomBar.svelte';
	export let data;
</script>

<Toast position="tr" />
<Modal />
<Drawer>
	<Navigation {navItems} />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" aria-label="Menu Button" on:click={() => drawerStore.open()}>
					<span>
						<Menu />
					</span>
				</button>
				<strong class="text-xl uppercase">{APP_NAME}</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if data?.user}
					<Avatar initials={convertNameToInitials(data?.user?.firstName||'', data?.user?.lastName||'')} width="w-10" background="bg-primary-500" />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation {navItems} />
	</svelte:fragment>
	<!-- Main Content -->
	<div class="container lg:p-10 mx-auto">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
	<svelte:fragment slot="footer">
			<BottomBar {navItems}/>
	</svelte:fragment>

</AppShell>

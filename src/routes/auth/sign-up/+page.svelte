<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import SignUp from '$lib/components/sign-up.svelte';
	import SignIn from '$lib/components/sign-in.svelte';
	import { goto } from '$app/navigation';
	import { i } from '@inlang/sdk-js';
	export let data;

	//let tab: string = $page.params.tab;
	//let tabSet: string = tab === 'sign-up' ? 'signUp' : 'signIn';
	let tabSet: string = 'signUp';
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="signInTab" value={'signIn'}>{i("signin")}</Tab>
	<Tab bind:group={tabSet} name="signUpTab" value={'signUp'}>{i("signup")}</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 'signIn'}
			<SignIn {data} />
		{:else if tabSet === 'signUp'}
			<SignUp {data} />
		{/if}
	</svelte:fragment>
</TabGroup>

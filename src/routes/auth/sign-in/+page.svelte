<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import SignIn from '$lib/components/sign-in.svelte';
	import SignUp from '$lib/components/sign-up.svelte';
	export let data;

	//let tab: string = $page.params.tab;
	//let tabSet: string = tab === 'sign-up' ? 'signUp' : 'signIn';
	let tabSet: string = 'signIn';
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={tabSet} name="signInTab" value={'signIn'}>Sign In</Tab>
	<Tab bind:group={tabSet} name="signUpTab" value={'signUp'}>Sign Up</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 'signIn'}
			<SignIn {data} />
		{:else if tabSet === 'signUp'}
			<SignUp {data} />
		{/if}
	</svelte:fragment>
</TabGroup>

<script lang="ts">
	import { LightSwitch, dataTableHandler } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { Prisma } from '@prisma/client';

	function drawerClose(): void {
		drawerStore.close();
	}
	import { LogIn, LogOut, Contact2, UserCircle2, Lock } from 'lucide-svelte';
	import Logo from '$lib/components/logo.svelte';
	export let user: any;
</script>

<nav class="list-nav p-4">
	<div class=" float-right">
		<LightSwitch />
	</div>
	<ul class="list mt-8">
		<li>
			<a href="/" on:click={drawerClose}>
				<span><Logo size="24" /></span><span class="flex-auto">Home</span></a
			>
		</li>
		<li>
			<a href="/protected" on:click={drawerClose}>
				<span><Lock /></span><span class="flex-auto">Protected</span></a
			>
		</li>
		{#if user}
			<li>
				<a href="/auth/profile" on:click={drawerClose}>
					<span><Contact2 /></span><span class="flex-auto">Profile</span></a
				>
			</li>
			<li>
				<form
					use:enhance
					action="/auth/sign-out"
					method="post"
					on:click={drawerClose}
					on:keydown={drawerClose}
				>
					<button type="submit" class="btn"><span><LogOut /></span><span>Log Out</span></button>
				</form>
			</li>
		{/if}
		{#if !user}
			<li>
				<a href="/auth/sign-in" on:click={drawerClose}>
					<span><LogIn /></span><span class="flex-auto">Sign In</span></a
				>
			</li>
			<li>
				<a href="/auth/sign-up" on:click={drawerClose}>
					<span><UserCircle2 /></span><span class="flex-auto">Sign Up</span></a
				>
			</li>
		{/if}
	</ul>
</nav>

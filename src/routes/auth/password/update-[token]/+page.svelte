<script lang="ts">
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userUpdatePasswordSchema } from '$lib/config/zod-schemas';
	import { AlertTriangle } from 'lucide-svelte';
	import { i } from '@inlang/sdk-js';
	export let data;
	const { form, errors, enhance, delayed } = superForm(data.form, {
		taintedMessage: null,
		validators: userUpdatePasswordSchema,
		delayMs: 0
	});
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
	];
</script>

<h3>{i("auth.password.update.changePassword")}</h3>

<hr class="!border-t-2 mt-2 mb-6" />

<form method="POST" use:enhance>
	<!--<SuperDebug data={$form} />-->
	{#if $errors._errors}
		<aside class="alert variant-filled-error mt-6">
			<!-- Icon -->
			<div><AlertTriangle size="42" /></div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">{i("auth.password.update.passwordProblem")}</h3>
				<p>{$errors._errors}</p>
			</div>
		</aside>
	{/if}
	<div class="mt-6">
		<label class="label">
			<span class="sr-only">{i("password")}</span>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="Password"
				data-invalid={$errors.password}
				bind:value={$form.password}
				class="input"
				class:input-error={$errors.password}
			/>
			{#if $errors.password}
				<small>{$errors.password}</small>
			{/if}
		</label>
	</div>
	<div class="mt-6">
		<label class="label">
			<span class="sr-only">{i("password")}</span>
			<input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				placeholder="Retype Password"
				data-invalid={$errors.confirmPassword}
				bind:value={$form.confirmPassword}
				class="input"
				class:input-error={$errors.confirmPassword}
			/>
			{#if $errors.confirmPassword}
				<small>{$errors.confirmPassword}</small>
			{/if}
		</label>
	</div>

	<div class="mt-6">
		<button type="submit" class="btn variant-filled-primary w-full"
			>{#if $delayed}<ConicGradient stops={conicStops} spin width="w-6" />{:else}{i("auth.password.update.updatePassword")}{/if}</button
		>
	</div>
</form>

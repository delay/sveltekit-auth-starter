<script lang="ts">
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from '$lib/config/zod-schemas';
	import { AlertTriangle } from 'lucide-svelte';
	export let data;
	const resetPasswordSchema = userSchema.pick({ email: true });
	const { form, errors, enhance, delayed } = superForm(data.form, {
		taintedMessage: null,
		validators: resetPasswordSchema,
		delayMs: 0
	});
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
	];
</script>

<h3>Reset Your Password</h3>

<hr class="!border-t-2 mt-2 mb-6" />

<form method="POST" use:enhance>
	<!--<SuperDebug data={$form} />-->
	{#if $errors._errors}
		<aside class="alert variant-filled-error mt-6">
			<!-- Icon -->
			<div><AlertTriangle size="42" /></div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">Reset Password Problem</h3>
				<p>{$errors._errors}</p>
			</div>
		</aside>
	{/if}
	<div class="mt-6">
		<label class="label">
			<span class="sr-only">Email address</span>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="Email address"
				autocomplete="email"
				data-invalid={$errors.email}
				bind:value={$form.email}
				class="input"
				class:input-error={$errors.email}
			/>
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>
	</div>

	<div class="mt-6">
		<button type="submit" class="btn variant-filled-primary w-full"
			>{#if $delayed}<ConicGradient stops={conicStops} spin width="w-6" />{:else}Send Password Reset
				Email{/if}</button
		>
	</div>
</form>

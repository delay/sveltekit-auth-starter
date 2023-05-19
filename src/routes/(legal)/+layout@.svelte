<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
</script>

<div class="flex flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-2xl">
	<div class="card p-6 pb-8 pt-8">
		<div>
			<div class="flex flex-row justify-center items-center mb-4">
				<div>
					<Logo size="42" />
				</div>
			</div>
			<slot />
		</div>
	</div>
</div>

<style>
</style>

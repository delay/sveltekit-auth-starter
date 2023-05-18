<script lang="ts">
	import { CONTACT_EMAIL } from '$lib/config/constants';
	import { i } from "@inlang/sdk-js";
</script>

<div class="flex flex-row justify-center m-8">
	<a href="mailto:{CONTACT_EMAIL}" class="px-4">{i("contact")}</a> |
	<a href="/auth/legal/privacy" class="px-4">{i("privacy")}</a> |
	<a href="/auth/legal/terms" class="px-4">{i("terms")}</a>
</div>

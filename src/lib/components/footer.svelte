<script lang="ts">
	import { CONTACT_EMAIL } from '$lib/config/constants';
	import { i } from "@inlang/sdk-js";
</script>

<div class="flex flex-row justify-center m-8">
	<a href="mailto:{CONTACT_EMAIL}" class="px-4">{i("contact")}</a> |
	<a href="/privacy" class="px-4">{i("privacy")}</a> |
	<a href="/terms" class="px-4">{i("terms")}</a>
</div>

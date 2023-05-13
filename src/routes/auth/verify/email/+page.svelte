<script lang="ts">
	import { APP_NAME } from '$lib/config/constants';
	export let data;
</script>

<h3>Confirm Your Email Address</h3>

<hr class="!border-t-2 mt-2 mb-6" />

Please check your email account for a message to confirm your email address for {APP_NAME}. If you
did not receive the email,
<a href="/auth/verify/resend-email-{data.user.token}">click here</a> to resend it.

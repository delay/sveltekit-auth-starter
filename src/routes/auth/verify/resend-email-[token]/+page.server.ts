import prisma from '$lib/config/prisma';
import { fail } from '@sveltejs/kit';
import { sendVerificationEmail } from '$lib/config/email-messages';
export async function load({ params }) {
	try {
		const token = params.token as string;

		const result = await prisma.authUser
			.findUnique({
				where: {
					token: token
				}
			})
			.then(async (user) => {
				let heading = 'Email Verification Problem';
				let message =
					'A new email could not be sent. Please contact support if you feel this was an error.';
				if (user) {
					heading = 'Email Verification Sent';
					message =
						'A new verification email was sent.  Please check your email for the message. (Check the spam folder if it is not in your inbox)';
					await prisma.authUser.update({
						where: {
							token: token
						},
						data: {
							verified: false
						}
					});
					sendVerificationEmail(user.email, token);
				}
				return { heading: heading, message: message };
			});

		return {
			result
		};
	} catch (e) {
		return fail(500, {
			error: e
		});
	}
}

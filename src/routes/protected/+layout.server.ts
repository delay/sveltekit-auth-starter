import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const { user } = await event.locals.auth.validateUser();
	if (!user) throw redirect(302, '/auth/sign-in');
	if (!user.verified) throw redirect(302, '/auth/verify/email');
	return {
		user
	};
};

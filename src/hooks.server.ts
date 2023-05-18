import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if (event.url.pathname.startsWith('/protected')) {
		const { user } = await event.locals.auth.validateUser();
		if (!user) throw redirect(302, '/auth/sign-in');
		if (!user.verified) throw redirect(302, '/auth/verify/email');
	}

	return await resolve(event);
};

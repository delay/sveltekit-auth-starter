import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

/* begin sentry.io */
/*import * as SentryNode from '@sentry/node';
import type { HandleServerError } from '@sveltejs/kit';*/
/*SentryNode.init({
	dsn: 'https://8c3bc4d0fd5c4d64b8e36187fa9150de@o516805.ingest.sentry.io/4505106025545728',

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});

export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();
	console.error(error);
	SentryNode.captureException(error, {
		contexts: { sveltekit: { event, errorId } }
	});
	return {
		message: 'An unexpected error occurred.',
		errorId
	};
};*/
/* end sentry.io */

export const handle: Handle = async ({ event, resolve }) => {
	// if directed to the auth directory, skip the auth check
	if (event.request.url.startsWith('/auth')) {
		return resolve(event);
	}

	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};

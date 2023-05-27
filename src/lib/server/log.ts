import { Client } from '@axiomhq/axiom-node';
import { AXIOM_TOKEN, AXIOM_ORG_ID, AXIOM_DATASET } from '$env/static/private';
import getAllUrlParams from '$lib/_helpers/getAllUrlParams';
import parseTrack from '$lib/_helpers/parseTrack';
import parseMessage from '$lib/_helpers/parseMessage';
import { DOMAIN } from '$lib/config/constants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function log(statusCode: number, event) {
	try {
		let level = 'info';
		if (statusCode >= 400) {
			level = 'error';
		}
		const error = event?.locals?.error || undefined;
		const errorId = event?.locals?.errorId || undefined;
		const errorStackTrace = event?.locals?.errorStackTrace || undefined;
		let urlParams = {};
		if (event?.url?.search) {
			urlParams = await getAllUrlParams(event?.url?.search);
		}
		let messageEvents = {};
		if (event?.locals?.message) {
			messageEvents = await parseMessage(event?.locals?.message);
		}
		let trackEvents = {};
		if (event?.locals?.track) {
			trackEvents = await parseTrack(event?.locals?.track);
		}

		let referer = event.request.headers.get('referer');
		if (referer) {
			const refererUrl = await new URL(referer);
			const refererHostname = refererUrl.hostname;
			if (refererHostname === 'localhost' || refererHostname === DOMAIN) {
				referer = refererUrl.pathname;
			}
		} else {
			referer = undefined;
		}
		const logData: object = {
			level: level,
			method: event.request.method,
			path: event.url.pathname,
			status: statusCode,
			timeInMs: Date.now() - event?.locals?.startTimer,
			user: event?.locals?.user?.email,
			userId: event?.locals?.user?.userId,
			referer: referer,
			error: error,
			errorId: errorId,
			errorStackTrace: errorStackTrace,
			...urlParams,
			...messageEvents,
			...trackEvents
		};
		console.log('log: ', JSON.stringify(logData));
		if (!AXIOM_TOKEN || !AXIOM_ORG_ID || !AXIOM_DATASET) {
			return;
		}
		const client = new Client({
			token: AXIOM_TOKEN,
			orgId: AXIOM_ORG_ID
		});
		await client.ingestEvents(AXIOM_DATASET, [logData]);
	} catch (err) {
		throw new Error(`Error Logger: ${JSON.stringify(err)}`);
	}
}

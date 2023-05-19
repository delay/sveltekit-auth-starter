export const load = async (event) => {
	const { user } = await event.locals.auth.validateUser();
	return {
		user
	};
};

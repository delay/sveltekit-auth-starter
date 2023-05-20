export const load = async (event: { locals: { user: any } }) => {
	return { user: event.locals.user };
};

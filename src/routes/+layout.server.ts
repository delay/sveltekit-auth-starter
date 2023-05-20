export const load = async (event: { locals: { user: Lucia.UserAttributes } }) => {
	return { user: event.locals.user };
};

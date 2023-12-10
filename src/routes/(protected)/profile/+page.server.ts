import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { auth } from '$lib/server/lucia';
import { userSchema } from '$lib/config/zod-schemas';
import { updateEmailAddressSuccessEmail } from '$lib/config/email-messages';
import prisma from '$lib/config/prisma';

const profileSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	email: true
});

export const load = async (event) => {
	const form = await superValidate(event, profileSchema);
	const session = await event.locals.auth.validate();
	const user  = session?.user;
	form.data = {
		firstName: user?.firstName,
		lastName: user?.lastName,
		email: user?.email
	};
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, profileSchema);
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			console.log('updating profile');
			const session = await event.locals.auth.validate();
			const user  = session?.user;

			auth.updateUserAttributes(user?.userId, {
				firstName: form.data.firstName,
				lastName: form.data.lastName,
				email: form.data.email
			});
			//await auth.invalidateAllUserSessions(user.userId);

			if (user?.email !== form.data.email) {
				//TODO: get emailaddress to change for prisma not just in attributes.  setUser not working... weird
				// worse comes to worse, update the auth_key manually in the db
				//auth.setKey(user.userId, 'emailpassword', form.data.email);
				//auth.setUser(user.userId, 'email', form.data.email);
				//remove this once bug is fixed and setKey or setUser works
				//https://github.com/pilcrowOnPaper/lucia/issues/606
				console.log('user: ' + JSON.stringify(user));
				await prisma.authKey.update({
					where: {
						id: 'email:' + user?.email
					},
					data: {
						id: 'email:' + form.data.email
					}
				});

				auth.updateUserAttributes(user?.userId, {
					verified: false
				});
				//await auth.invalidateAllUserSessions(user.userId);
				await updateEmailAddressSuccessEmail(form.data.email, user?.email, user?.token);
			}
		} catch (e) {
			console.error(e);
			return setError(form, null, 'There was a problem updating your profile.');
		}
		console.log('profile updated successfully');
		return message(form, 'Profile updated successfully.');
	}
};

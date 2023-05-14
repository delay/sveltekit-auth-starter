// lib/server/lucia.ts
import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import prisma from '@lucia-auth/adapter-prisma';
//import { PrismaClient } from '@prisma/client';
//https://github.com/prisma/prisma/issues/4816 handles docker error
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;
import { dev } from '$app/environment';

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			email: userData.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
			role: userData.role,
			verified: userData.verified,
			receiveEmail: userData.receiveEmail,
			token: userData.token
		};
	}
});

export type Auth = typeof auth;

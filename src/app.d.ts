// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/lucia').Auth;
		type UserAttributes = {
			email: string;
			firstName: string;
			lastName: string;
			role: string;
			verified: boolean;
			receiveEmail: boolean;
			token: string;
		};
	}
}

// THIS IS IMPORTANT!!!
export {};

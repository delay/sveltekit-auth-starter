import { dev } from '$app/environment';
import { LogIn, LogOut, Contact2, UserCircle2, Lock, Home, LayoutDashboard } from 'lucide-svelte';

export const BASE_URL = dev ? 'http://localhost:5173' : 'https://sveltekit-auth.uv-ray.com';
export const APP_NAME = 'Sveltekit Auth Starter';
export const CONTACT_EMAIL = 'yourname@email.com';
/* WARNING!!! TERMS AND CONDITIONS AND PRIVACY POLICY 
WERE CREATED BY CHATGPT AS AN EXAMPLE ONLY. 
CONSULT A LAWYER AND DEVELOP YOUR OWN TERMS AND PRIVACY POLICY!!! */
export const TERMS_PRIVACY_CONTACT_EMAIL = 'yourname@email.com';
export const TERMS_PRIVACY_WEBSITE = 'yourdomain.com';
export const TERMS_PRIVACY_COMPANY = 'Your Company';
export const TERMS_PRIVACY_EFFECTIVE_DATE = 'January 1, 2023';
export const TERMS_PRIVACY_APP_NAME = 'Your App';
export const TERMS_PRIVACY_APP_PRICING_AND_SUBSCRIPTIONS =
	'[Details about the pricing, subscription model, refund policy]';
export const TERMS_PRIVACY_COUNTRY = 'United States';


export const navItems = [
	{ title: "home", url: "/", icon: Home, alwaysVisible: true },
	{ title: 'dashboard', url: '/dashboard', icon: LayoutDashboard, alwaysVisible: true },
	{ title: 'profile', url: '/profile', icon: LayoutDashboard, protected: true },
	{ title: 'signout', url: '/auth/sign-out', icon: LogOut, protected: true },
	{ title: 'signin', url: '/auth/sign-in', icon: LogIn },
	{ title: 'signup', url: '/auth/sign-up', icon: UserCircle2 },
]

export type NavItems = typeof navItems;
# Sveltekit Auth Starter

![Sveltekit Auth User Interface](https://miro.medium.com/v2/resize:fit:4772/1*v-oJRLXc299bFOzDS-fnyA.png)

This is a Sveltekit Auth Starter Project. An example website is currently deployed [here](https://sveltekit-auth.uv-ray.com/). It is an open source auth starter project utilizing [Lucia](https://lucia-auth.com/) for authentication, [Skeleton](https://www.skeleton.dev) for ui elements, [Lucide](https://lucide.dev) for icons, [Prisma](https://www.prisma.io) for database connectivity and type safety, [inlang](https://inlang.com) for language translation and [Sveltekit](https://kit.svelte.dev) for the javascript framework. I also used [Zod](https://zod.dev) and [Superforms](https://superforms.vercel.app) to handle form validation and management. It has email verification, password reset, and will send an email if the user changes their email address to re-verify it. It also has a custom error logging system which I wrote about in [this blog post](https://jeffmcmorris.medium.com/awesome-logging-in-sveltekit-6afa29c5892c). The log results are sent to [Axiom](https://axiom.co). It is released as open source under an MIT license.

While creating this project, I made use of several great videos and tutorials from [Huntabyte](https://www.youtube.com/@huntabyte) and [Joy of Code](https://www.youtube.com/@JoyofCodeDev). Both have great tutorials for all things related to Sveltekit.

This project creates an email and password user log in system and is my attempt to make something production ready with all of the usual features you expect. You can create new users and sign them in. It has user roles. It will verify a users email address. You can edit your profile including changing your email address and password. You can reset your password in case you forgot it. You can also change themes and have a light and dark mode. I didn’t see any examples utilizing these frameworks that had all of these necessary features.

I picked [Lucia](https://lucia-auth.com/) for auth because it had great documentation and seemed to be in active development and was very full featured. It can provide authentication for OAuth providers as well. I always want to have a fallback for email and password, so that is what I chose to make for this project.

[Skeleton](https://www.skeleton.dev) is another great project with a really nice development experience. Perhaps the coolest feature is it makes use of [design tokens](https://www.skeleton.dev/docs/tokens). This allows for lots of customization just by modifying the [theme.css](https://www.skeleton.dev/docs/generator).

![skeleton themes](https://miro.medium.com/v2/resize:fit:1400/1*qo_ZLFxpaijwvOK_7vbyFw.png)

[Prisma](https://www.prisma.io) is another great package and it is used for database connectivity and type safety. It works with many databases so it’s easy to change your database with one line of code. It has an easy to use ORM that cuts back on the amount of code you need to write.

[Zod](https://zod.dev) is a typescript schema validation that allows you to easily validate your input in projects. It is very easy to setup what your data should look like to validate against.

Finally [Superforms](https://superforms.vercel.app/) makes it easy to work with forms in Sveltekit. It cuts down a lot on boilerplate code when working with forms.

This was the first time working with many of these packages, but they really do streamline much of the Sveltekit development process. If there are any mistakes, please open up an issue on the project. Also I was pleasantly surprised at the scores from [Google PageSpeed Insights](https://pagespeed.web.dev). This project scored a 100% in all metrics.

![pagespeed insights metrics](https://miro.medium.com/v2/resize:fit:1400/1*SlpRE8RL3KIJW8af7P8otw.png)

## File Structure for the App

**sample.env** — private environmental server side variables that must be set. Rename to.env and supply your personal project settings.

**/prisma/schema.prisma** — holds the prism schema which is the design of your data in the app and db. Currently holds the auth schema for Lucia auth.

## **/src/**

**app.d.ts** — holds type definitions for lucia and can hold your additional types for other features.

**hooks.server.ts** — holds a Lucia auth handle function.

**theme.postcss** — holds a custom theme for skeleton. This can be set in /routes/+layout.svelte. Comment out the theme-skeleton and add in theme.postcss. You can create your own custom theme [https://www.skeleton.dev/docs/generator](https://www.skeleton.dev/docs/generator). There are also lots of premade themes included with sveltekit. To use those, change theme-skeleton.css to theme-modern.css or another theme name.

## /lib

## /\_helpers

**convertNameToInitials.ts** — function for making initials from first and last name of user for the avatar.

**getAllUrlParams.ts** - puts any url parameters in an object to be used in our log system.
**parseMessage** - puts event.locals.message message into object or string and for our log.
**parseTrack** - puts event.locals.track message into object or string for our log.

## **/components**

**footer.svelte** — footer in the app, used in /routes/+layout.svelte

**logo.svelte** — used as the logo throughout the app.

**navigation.svelte** — navigation menu links used in /routes/+layout.svelte. They change based on whether user is logged in or not.

**sign-in.svelte** — sign in form component used in /auth/sign-in/+page.svelte

**sign-up.svelte** — sign up form component used in /auth/sign-up/+page.svelte

## /config

**constants.ts** — all of the public constants that do not need to be hidden server side. I prefer this to naming constants PUBLIC_WHATEVER in the .env file, which is another option. I prefer to keep my .env file with only server side env variables.

**email-messages.ts** — this is where I keep all of the email messages that need to be sent. It makes it easier in case changes need to be made to the emails that are sent out.

**prima.ts —** file used to initialize the prisma client.

**zod-schema.ts** — holds the schema used in zod. This defines how our form data needs to be validated.

## /server

**email-send.ts** — this handles our email sending with AWS SES. It only runs server side to keep your credentials hidden. It also allows you to use SMTP settings in case you are not using AWS through nodemailer.

**lucia.ts**- this initializes the lucia-auth package for handling our auth functions. It also holds the extra custom fields we added to the user.

**log.ts** - This is used by our hook to get the log data and send to our log service.

## /routes

**+layout.server.ts** — gets the user info from lucia-auth if available so we can access it in our app.

**+layout.svelte** — overall site layout which is inherited by the rest of our app.

**+page.svelte** - basic info about our app

**+error.svelte** - custom error page.

## /auth

**+layout.svelte**\-handles our layout for the auth section.

## /legal

**+layout@.svelte** — resets our layout for the legal section so it doesn’t inherit the auth layout. add the @ at the end to do this.

## /legal/terms

Holds our terms and conditions page. Do not use this for your own website as I just used ChatGPT to make this. You should consult a legal professional to develop the terms for your own app.

## /legal/privacy

Holds our privacy policy page. Do not use this for your own website as I just used ChatGPT to make this. You should consult a legal professional to develop the privacy policy for your own app.

## /password/reset

This holds the password reset form and function to send a password reset email when the user enters there email address,

## /password/update-\[token\]

This allows the user to actually put in the new password, the token comes from the email from the users reset request. Anything in \[\] is able to be accessed as a parameter in Sveltekit, so \[token\] can be accessed via (token = event.params.token).

## /password/update-\[token\]/success

This is the message the user sees if there reset was successful.

## /profile

This allows the user to update their profile with new information. If they change their email address we also un-verify them and send them an email asking them to reconfirm their email. We also send an email to their old address telling them this change was made with the old and new address so that the data can be reset manually if the users account was hacked.

## /sign-in

Page and functions for signing in the user.

## /sign-out

Function for signing out the user.

## /sign-up

Page and functions for signing up the user.

## /verify/email

This page asks user to check there email and verify it.

## /verify/email-\[token\]

This page confirms the email address by verifying the token the user received in his email account.

## /verify/resend-email-\[token\]

This resends the verify email token email in case the user didn’t receive or lost the email.

## /(protected)

This route group is only allowed to be accessed when a user is logged in.

Hopefully you may find some of this code useful for your own project. Please feel free to use it in any project.

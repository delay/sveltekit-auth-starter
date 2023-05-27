import nodemailer, { type Transporter } from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import {
	FROM_EMAIL,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_API_VERSION,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_SECURE,
	SMTP_USER,
	SMTP_PASS
} from '$env/static/private';
//import { z } from "zod";
export default async function sendEmail(
	email: string,
	subject: string,
	bodyHtml?: string,
	bodyText?: string
) {
	const hasAccessKeys = AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY;
	let transporter: Transporter;
	if (hasAccessKeys) {
		const ses = new aws.SES({
			apiVersion: AWS_API_VERSION,
			region: AWS_REGION,
			...(hasAccessKeys
				? {
						credentials: {
							accessKeyId: AWS_ACCESS_KEY_ID || '',
							secretAccessKey: AWS_SECRET_ACCESS_KEY || ''
						}
				  }
				: {})
		});

		// create Nodemailer SES transporter
		transporter = nodemailer.createTransport({
			SES: { ses, aws }
		});
	} else {
		// create Nodemailer SMTP transporter
		transporter = nodemailer.createTransport({
			// @ts-ignore
			host: SMTP_HOST,
			port: Number(SMTP_PORT),
			secure: Number(SMTP_SECURE) === 1,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASS
			}
		});
	}
	interface MailConfig {
		recipient: string;
		subject: string;
		htmlMessage: string;
	}

	try {
		if (!bodyText) {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml
				},
				(err, info) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		} else if (!bodyHtml) {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					text: bodyText
				},
				(err, info) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		} else {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml,
					text: bodyText
				},
				(err, info) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		}
		console.log('E-mail sent successfully!');
		return {
			statusCode: 200,
			message: 'E-mail sent successfully.'
		};
	} catch (error) {
		throw new Error(`Error sending email: ${JSON.stringify(error)}`);
	}
}

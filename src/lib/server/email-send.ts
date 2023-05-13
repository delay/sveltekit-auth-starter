import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import {
	FROM_EMAIL,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION
} from '$env/static/private';
export default async function sendEmail(
	email: string,
	subject: string,
	bodyHtml?: string,
	bodyText?: string
) {
	/* The following example sends a formatted email: */

	if (!bodyHtml && !bodyText) {
		throw new Error(`Error sending email: bodyHtml and bodyText cannot both be empty.`);
	}
	if (!email) {
		throw new Error(`Error sending email: email cannot be empty.`);
	}
	if (!subject) {
		throw new Error(`Error sending email: subject cannot be empty.`);
	}

	const from = FROM_EMAIL;

	const sesClient = new SESClient({
		region: AWS_REGION,
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_SECRET_ACCESS_KEY
		}
	});

	try {
		if (!bodyText) {
			const sendEmailHTMLOnly = new SendEmailCommand({
				Destination: {
					ToAddresses: [email]
				},
				Source: from,
				Message: {
					Subject: {
						Charset: 'UTF-8',
						Data: subject
					},
					Body: {
						Html: {
							Charset: 'UTF-8',
							Data: bodyHtml
						}
					}
				}
			});
			await sesClient.send(sendEmailHTMLOnly);
		} else if (!bodyHtml) {
			const sendEmailTextOnly = new SendEmailCommand({
				Destination: {
					ToAddresses: [email]
				},
				Source: from,
				Message: {
					Subject: {
						Charset: 'UTF-8',
						Data: subject
					},
					Body: {
						Text: {
							Charset: 'UTF-8',
							Data: bodyText
						}
					}
				}
			});
			await sesClient.send(sendEmailTextOnly);
		} else {
			const sendEmail = new SendEmailCommand({
				Destination: {
					ToAddresses: [email]
				},
				Source: from,
				Message: {
					Subject: {
						Charset: 'UTF-8',
						Data: subject
					},
					Body: {
						Html: {
							Charset: 'UTF-8',
							Data: bodyHtml
						},
						Text: {
							Charset: 'UTF-8',
							Data: bodyText
						}
					}
				}
			});
			await sesClient.send(sendEmail);
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

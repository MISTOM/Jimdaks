import { error } from '@sveltejs/kit';
import { BASE_URL, SECRET_KEY, SENDGRID_API_KEY } from '$env/static/private';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import auth from '$lib/server/auth';

sendgrid.setApiKey(SENDGRID_API_KEY);

const dateStr = new Date().toLocaleString('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	hour12: true
});

type Mail = {
	to: string;
	subject: string;
	text: string;
	html: string;
};
export async function sendMail({ to, subject, text, html }: Mail) {
	const Identity = '';
	const msg = {
		to,
		from: {
			name: '',
			email: Identity
		},
		subject,
		text,
		html
	};
	await sendgrid.send(msg);
}

/**
 * Send dynamic mail
 * @param to - The email address of the recipient
 * @param templateId - The SendGrid template ID
 * @param dynamicTemplateData - The dynamic data to be used in the template
 */
export async function sendDynamicMail(to: string, templateId: string, dynamicTemplateData: object) {
	const _msg: MailDataRequired = {
		to,
		from: {
			name: '',
			email: ''
		},
		templateId,
		dynamicTemplateData
	};
	await sendgrid.send(_msg);
}

/**
 * Sends a verification email to the user
 * @param name - The name of the user
 * @param email - The email of the user
 */
export async function sendVerificationEmail(name: string, email: string) {
	try {
		if (!email) throw error(400, 'Email is required');
		const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: 60 * 24 });
		const link = `${BASE_URL}/verify?token=${token}`;
		// const devLink = `http://localhost:5174/verify?token=${token}`;

		await sendDynamicMail(email, '', { name, link });
		// await sendgrid.send(_msg);
	} catch (error) {
		console.error('Error sending verification email:', error);
	}
}

/**
 * Send a reset password email to the user
 */
type User = {
	id: number;
	firstName: string;
	email: string;
}; //TODO Get user from prisma
export async function sendResetPasswordEmail({ id, firstName: name, email }: User) {
	try {
		const token = auth.generateResetToken(id);
		const link = `${BASE_URL}/reset-password?token=${token}`;

		await sendDynamicMail(email, '', { name, link });
	} catch (error) {
		console.error('Error sending reset password email:', error);
	}
}

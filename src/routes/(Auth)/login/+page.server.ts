import prisma from '$lib/server/prisma.js';
import auth from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { maxAge, refreshTokenMaxAge, secure } from '$lib/server/utils';

// export const load = (async ({ locals: { user } }) => {}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		console.log(formData);
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			return fail(400, {
				data: { email },
				errors: 'Username and password required'
			});
		}

		let user;
		try {
			user = await prisma.user.findUnique({
				where: { email: email.toString() }
			});
			if (!user) {
				return fail(400, {
					data: { email },
					errors: 'Invalid emmail or password'
				});
			}
		} catch (e) {
			console.log(e);
			return fail(500, {
				data: { email },
				errors: 'Internal Server Error'
			});
		}

		const isvalidPassword = await auth.compare(password.toString(), user.password);
		if (!isvalidPassword) {
			return fail(401, {
				data: { email },
				errors: 'Invalid email or passsword'
			});
		}
		const token = auth.sign(user);
		const refreshToken = await auth.generateRefreshToken(user);

		//TODO - set secure to true in production
		cookies.set('token', token, { httpOnly: true, secure: secure, path: '/', maxAge });
		cookies.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: secure,
			path: '/',
			maxAge: refreshTokenMaxAge
		});

		//  redirect(303, '/dashboard');

		(await auth.isAdmin(user)) ? redirect(303, '/dashboard') : redirect(303, '/farm'); // TODO - if user is not admin, redirect to caretaker page
	}
} satisfies Actions;

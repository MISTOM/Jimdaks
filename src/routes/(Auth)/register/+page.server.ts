import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import auth from '$lib/server/auth';
import prisma from '$lib/server/prisma';
import { maxAge, refreshTokenMaxAge, secure } from '$lib/server/utils';

export const load = (async ({ locals }) => {
	// if (locals.user) { throw redirect(303, '/') }
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		if (!name || !email || !password) {
			return fail(400, {
				data: { name, email },
				errors: 'Please fill in all fields'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				data: { name, email },
				errors: 'Passwords do not matchhh'
			});
		}

		try {
			const user = await prisma.user.findUnique({
				where: { email: email.toString() }
			});
			if (user) {
				return fail(400, {
					data: { name, email },
					errors: 'User already exists'
				});
			}
			const hashedPassword = await auth.hash(password.toString());
			const newUser = await prisma.user.create({
				data: {
					name: name.toString(),
					email: email.toString(),
					password: hashedPassword,
					role: { connect: { name: 'CARETAKER' } }
				}
			});

			// Register user and Login immediately
			const token = auth.sign(newUser);
			const refreshToken = await auth.generateRefreshToken(newUser);

			cookies.set('token', token, { httpOnly: true, secure: secure, path: '/', maxAge });
			cookies.set('refreshToken', refreshToken, {
				httpOnly: true,
				secure: secure,
				path: '/',
				maxAge: refreshTokenMaxAge
			});

			// console.log('User created', formData);
		} catch (e) {
			console.log(e);
			return fail(500, {
				data: { name, email, password },
				errors: 'An error occurred'
			});
		}
		throw redirect(303, '/dashboard');
	}
} satisfies Actions;

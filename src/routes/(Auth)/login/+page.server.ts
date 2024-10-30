import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { compare, generateRefreshToken, sign } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			
			const user = await prisma.user.findUnique({
				where: { email: email }
			});
			if (!user) return fail(401, { email, message: 'Invalid email or password' });
			await compare(password, user.password);
			const token = sign({ id: user.id, roleId: user.roleId });
			const refreshToken = generateRefreshToken(user);
			return { success: true, token, refreshToken };
		} catch (e) {
			
			//@ts-ignore
			return fail(e.status || 500, { message: e.body });
		}

	}
};

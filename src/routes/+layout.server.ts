import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user } }) => {
	try {
		if (user) {
			const loggedInUser = await prisma.user.findUnique({
				where: { id: user.id }
			});
			return { user: loggedInUser };
		}
		return { user: null };
	} catch (e) {
		console.error(e);
		return { user: null };
	}
}) satisfies LayoutServerLoad;

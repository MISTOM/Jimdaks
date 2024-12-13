import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async () => {
	const users = await prisma.user.findMany({
		include: {
			role: true,
			flock: true,
			feedUsage: true
		}
	});

	if (!users || users.length === 0) {
		throw new Error('No users found');
	}

	return {
		users
	};
}) satisfies PageServerLoad;

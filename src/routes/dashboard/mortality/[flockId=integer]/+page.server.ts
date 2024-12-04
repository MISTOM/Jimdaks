import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = Number(params.flockId);

	try {
		const flock = await prisma.flock.findUnique({
			where: { id },
			include: {
				Mortality: {
					include: { loggedBy: true },
					orderBy: { createdAt: 'desc' }
				}
			}
		});

		return { flock };
	} catch (e) {
		console.error(e);
		return { flock: null, error: 'Failed to load data' };
	}
}) satisfies PageServerLoad;

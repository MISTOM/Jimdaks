import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	try {
		const flock = await prisma.flock.findMany({
			include: { Mortality: true }
		});

		const flocksWithMortality = flock.map((flock) => {
			return {
				...flock,
				totalMortality: flock.Mortality.reduce((acc, curr) => acc + curr.number, 0)
			};
		});

		return { flocks: flocksWithMortality };
	} catch (e) {
		console.error(e);
		return { flocks: [], error: 'Failed to load data' };
	}
}) satisfies PageServerLoad;

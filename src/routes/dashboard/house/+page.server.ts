import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	try {
		const houses = await prisma.house.findMany();

		return { houses };
	} catch (e) {
		console.error(e);
	}
}) satisfies PageServerLoad;

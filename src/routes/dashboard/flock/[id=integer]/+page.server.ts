import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = Number(params.id);

	try {
		const flock = await prisma.flock.findUnique({
			where: { id },
			include: { weightLogs: true, expenses: true }
		})
		return { flock };
	} catch (error) {
		console.error(error);
	}
}) satisfies PageServerLoad;

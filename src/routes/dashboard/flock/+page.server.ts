import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const flocksPromise = prisma.flock.findMany({
			include: {
				weightLogs: true,
				house: true
			}
		});

		const housesPromise = prisma.house.findMany();

		const [flocks, houses] = await Promise.all([flocksPromise, housesPromise]);

		return { flocks, houses };
	} catch (e) {
		console.error(e);
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		console.log('flock Data', data);
		//TODO - Validate data ~ zod

		try {
			const flock = await prisma.flock.create({
				data: {
					name: data.name.toString(),
					startDate: new Date(data.startDate.toString()),
					birdAge: parseInt(data.birdAge.toString()),
					breeder: data.breeder.toString(),
					birdType: data.birdType.toString() === 'BROILER' ? 'BROILER' : 'LAYER', // TODO review this
					numberOfBirds: parseInt(data.numberOfBirds.toString()),
					notes: data.notes.toString(),
					house: { connect: { id: parseInt(data.houseId.toString()) } },
					user: { connect: { id: 1 } } // TODO get user from session
				}
			});

			return { status: 200, flock };
		} catch (e) {
			console.error(e);
			return { status: 500, error: e };
		}
	}
};

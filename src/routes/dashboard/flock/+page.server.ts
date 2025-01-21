import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('update:flocks');
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
	flock: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { name, startDate, breeder, birdType, numberOfBirds, notes, houseId } = data;

		//TODO - Validate data ~ zod
		if (!name || !startDate || !breeder || !birdType || !numberOfBirds || !notes || !houseId) {
			return fail(400, { error: 'Please Fill all Fileds' });
		}

		try {
			const flock = await prisma.flock.create({
				data: {
					name: name.toString(),
					startDate: new Date(startDate.toString()),
					breeder: breeder.toString(),
					birdType: birdType.toString() === 'BROILER' ? 'BROILER' : 'LAYER', // TODO review this
					numberOfBirds: parseInt(numberOfBirds.toString()),
					notes: notes.toString(),
					house: { connect: { id: parseInt(houseId.toString()) } },
					user: { connect: { id: user?.id } }
				}
			});

			return { status: 200, flock };
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Internal error creating flock' });
		}
	},

	mortalityLog: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { causeOfDeath, numberOfDeaths, flockId, logDate } = data;
		//TODO - Validate data ~ zod

		if (!causeOfDeath || !numberOfDeaths || !flockId || !logDate) {
			return fail(400, { error: 'Please Fill all Fileds' });
		}

		try {
			//Check if flock exists
			const flock = await prisma.flock.findUnique({ where: { id: parseInt(flockId.toString()) } });
			if (!flock) return fail(400, { error: 'Flock not found' });

			//Log mortality
			const mortality = await prisma.mortality.create({
				data: {
					causeOfDeath: causeOfDeath.toString(),
					number: parseInt(numberOfDeaths.toString()),
					flock: { connect: { id: parseInt(flockId.toString()) } },
					loggedBy: { connect: { id: user?.id } },
					createdAt: new Date(logDate.toString())
				}
			});

			return { status: 200, mortality };
		} catch (e) {
			console.error(e);
			fail(500, { error: 'Internal error logging mortality' });
		}
	},

	deleteFlock: async ({ request }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { flockId } = data;
		if (!flockId) return fail(400, { error: 'Invalid or missing data' });

		const id = Number(flockId);
		if (isNaN(id)) return fail(400, { error: 'Invalid id' });

		try {
			await prisma.flock.delete({ where: { id } });
			return { status: 200, message: 'Flock deleted' };
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Internal error deleting flock' });
		}
	}
};

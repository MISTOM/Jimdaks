import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ depends }) => {
	depends('update:houses');
	try {
		const houses = await prisma.house.findMany();

		return { houses };
	} catch (e) {
		console.error(e);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	house: async ({ request }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { name, capacity, description } = data;

		if (!name || !capacity) return fail(400, { error: 'Missing fields' });

		try {
			const house = await prisma.house.create({
				data: {
					name: name.toString(),
					capacity: parseInt(capacity.toString()),
					description: description ? description.toString() : undefined
				}
			});

			return { status: 201 };
		} catch (e) {
			console.error(e);
		}
	}
};

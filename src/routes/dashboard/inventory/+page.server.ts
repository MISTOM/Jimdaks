import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { FeedType } from '@prisma/client';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const feedType = url.searchParams.get('feedType') as FeedType;
	const sortBy = url.searchParams.get('sortBy') || 'createdAt';
	const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

	const feedInventory = await prisma.feedInventory.findMany();

	// Create a record with feedType as key and record as value
	const feedInventoryMap = feedInventory.reduce<Record<FeedType, (typeof feedInventory)[0]>>(
		(acc, record) => {
			acc[record.feedType] = record;
			return acc;
		},
		{} as Record<FeedType, (typeof feedInventory)[0]>
	);

	return { feedInventoryMap, FeedType, feedInventory };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries((await request.formData()).entries());

		const { quantity, notes, feedType } = formData;

		//validate feedType
		if (!Object.values(FeedType).includes(feedType as FeedType)) {
			return fail(400, { error: 'Invalid feed type' });
		}

		//validate quantity
		if (isNaN(Number(quantity))) {
			return fail(400, { error: 'Invalid quantity' });
		}

		try {
			const feedInventory = await prisma.feedInventory.upsert({
				where: { feedType: feedType as FeedType },
				update: {
					quantity: { increment: Number(quantity) },
					notes: notes ? notes.toString() : undefined
				},
				create: {
					feedType: feedType as FeedType,
					quantity: Number(quantity),
					notes: notes ? notes.toString() : undefined
				}
			});
			return { feedInventory };
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Failed to update feed inventory' });
		}
	}
};

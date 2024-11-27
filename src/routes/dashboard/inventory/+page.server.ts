import prisma from '$lib/server/prisma';
import { FeedType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const feedType = url.searchParams.get('feedType') as FeedType;
	const sortBy = url.searchParams.get('sortBy') || 'createdAt';
	const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

	// Fetch total quantity for each feed type
	const feedInventory = await prisma.feedInventory.groupBy({
		by: ['feedType', 'notes'],
		_sum: { quantity: true }
	}); // TODO: feedtype is unique so we can use findMany instead of groupBy

	// Create a record with feedType as key and record as value
	const feedInventoryMap = feedInventory.reduce(
		(acc, record) => {
			acc[record.feedType] = record;
			return acc;
		},
		{} as Record<FeedType, (typeof feedInventory)[0]>
	);

	return { feedInventoryMap, FeedType };
};

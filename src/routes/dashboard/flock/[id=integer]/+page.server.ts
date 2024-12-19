import type { PageServerLoad } from './$types';
import { ExpenseCategory, FeedType } from '@prisma/client';
import prisma from '$lib/server/prisma';

export const load = (async ({ params }) => {
	const flockId = parseInt(params.id);

	const flockPromise = prisma.flock.findUnique({
		where: { id: flockId },
		include: {
			house: true,
			feedUsages: {
				orderBy: { createdAt: 'desc' },
				take: 10
			},
			weightLogs: { take: 10, orderBy: { createdAt: 'desc' } },
			Mortality: true,
			vaccinationRecords: {
				include: { vaccine: true, administeredBy: true }
			},
			expenses: true,
			SlaughterLog: true
		}
	});

	const vaccinesPromise = prisma.vaccine.findMany();
	const vaccinationSchedulePromise = prisma.vaccinationSchedule.findMany({
		include: { vaccine: true }
	});

	// Get total feed usage
	const feedUsagePromise = prisma.feedUsage.aggregate({
		where: { flockId },
		_sum: { quantity: true },
		_avg: { quantity: true }
	});
	// Get weight progression
	const weightLogPromise = prisma.weightLog.findMany({
		where: { flockId },
		orderBy: { createdAt: 'asc' }
	});

	const [flock, feedUsage, weightLogs, vaccines, vaccinationSchedule] = await Promise.all([
		flockPromise,
		feedUsagePromise,
		weightLogPromise,
		vaccinesPromise,
		vaccinationSchedulePromise
	]);

	if (!flock) return { flock: null };

	// Calculate derived data
	const totalMortality = flock.Mortality.reduce((sum, record) => sum + record.number, 0); // can also use database aggregate function
	const mortalityRate = ((totalMortality / flock.numberOfBirds) * 100).toFixed(1);

	const currentAge = Math.floor(
		(new Date().getTime() - new Date(flock.startDate).getTime()) / (1000 * 60 * 60 * 24)
	);

	const totalExpenses = flock.expenses.reduce((sum, expense) => sum + expense.amount, 0);
	const costPerBird = (totalExpenses / flock.numberOfBirds).toFixed(2);

	return {
		flock,
		ExpenseCategory,
		FeedType,
		vaccines,
		vaccinationSchedule,
		metrics: {
			currentAge,
			mortalityRate,
			totalMortality,
			totalExpenses,
			costPerBird,
			birdsRemaining: flock.numberOfBirds - totalMortality,

			totalFeedUsed: feedUsage._sum.quantity || 0,
			avgDailyFeed: feedUsage._avg.quantity || 0,
			currentWeight: weightLogs[weightLogs.length - 1]?.sampleWeight || 0,
			feedConversionRatio: calculateFCR(
				flock.numberOfBirds,
				feedUsage._sum.quantity || 0,
				weightLogs[weightLogs.length - 1]?.sampleWeight || 0
			)
		}
	};
}) satisfies PageServerLoad;

/**
 * Calculate Feed Conversion Ratio (FCR) https://en.wikipedia.org/wiki/Feed_conversion_ratio | The lower the FCR, the better
 * @param birds Total no of birds
 * @param feedUsed Total feed used
 * @param weight Current weight of birds
 * @returns Feed Conversion Ratio
 */
const calculateFCR = (birds: number, feedUsed: number, weight: number) => {
	if (weight === 0) return 0;
	return parseFloat((feedUsed / birds / weight).toFixed(2));
};

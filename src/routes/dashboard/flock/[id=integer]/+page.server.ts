import type { PageServerLoad, Actions } from './$types';
import { ExpenseCategory, FeedType } from '@prisma/client';
import prisma from '$lib/server/prisma';
import { calculateBirdAge } from '$lib/utils/utils';
import { fail } from '@sveltejs/kit';

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
			Mortality: { orderBy: { createdAt: 'desc' } },
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

	const totalExpensesPromise = prisma.expense.aggregate({
		where: { flockId },
		_sum: { amount: true }
	});

	const totalMortalityPromise = prisma.mortality.aggregate({
		where: { flockId },
		_sum: { number: true }
	});

	const [flock, feedUsage, weightLogs, vaccines, vaccinationSchedule, expenses, mortality] =
		await Promise.all([
			flockPromise,
			feedUsagePromise,
			weightLogPromise,
			vaccinesPromise,
			vaccinationSchedulePromise,
			totalExpensesPromise,
			totalMortalityPromise
		]);

	if (!flock) return { flock: null };

	// Calculate derived data
	const totalMortality = mortality._sum.number || 0;
	const mortalityRate = ((totalMortality / flock.numberOfBirds) * 100).toFixed(1);

	const currentAge = calculateBirdAge(flock.startDate);

	const totalExpenses = expenses._sum.amount || 0;
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
			totalMortality: totalMortality,
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

export const actions: Actions = {
	mortalityLog: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { causeOfDeath, numberOfDeaths, flockId, logDate } = data;
		//TODO - Validate data ~ with zod

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
	recordExpense: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { category, amount, description, flockId } = data;

		if (!category || !amount || !description || !flockId)
			return fail(400, { error: 'Please Fill all Fileds' });

		// Validate category is a valid enum value
		if (!Object.values(ExpenseCategory).includes(category.toString() as ExpenseCategory))
			return fail(400, { error: 'Invalid expense category' });

		try {
			const expense = await prisma.expense.create({
				data: {
					category: category.toString() as ExpenseCategory,
					amount: parseFloat(amount.toString()),
					description: description.toString(),
					flock: { connect: { id: parseInt(flockId.toString()) } },
					user: { connect: { id: user?.id } }
				}
			});

			return { status: 200, expense };
		} catch (e) {
			console.error(e);
			fail(500, { error: 'Internal error creating expense' });
		}
	},

	recordFeedUsage: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { feedType, quantity, flockId, usageDate, notes } = data;

		if (!feedType || !quantity || !flockId || !usageDate)
			return fail(400, { error: 'Please Fill all Fileds' });

		// Validate feedType is a valid enum value
		if (!Object.values(FeedType).includes(feedType.toString() as FeedType))
			return fail(400, { error: 'Invalid feed type' });

		try {
			return await prisma
				.$transaction(async (tx) => {
					// Deduct feed from inventory
					const currentFeed = await tx.feedInventory.findFirst({
						where: { feedType: feedType.toString() as FeedType }
					});

					if (!currentFeed) return fail(400, { error: 'Feed not found' });

					if (currentFeed.quantity < parseFloat(quantity.toString()))
						return fail(400, { error: 'Insufficient feed' });

					await tx.feedInventory.update({
						where: { id: currentFeed.id },
						data: { quantity: currentFeed.quantity - parseFloat(quantity.toString()) }
					});

					// Log feed usage
					const feedUsage = await tx.feedUsage.create({
						data: {
							feedType: feedType.toString() as FeedType,
							quantity: parseFloat(quantity.toString()),
							date: new Date(usageDate.toString()),
							flock: { connect: { id: parseInt(flockId.toString()) } },
							user: { connect: { id: user?.id } }
						}
					});

					return { status: 200, feedUsage };
				})
				.catch((error) => {
					return fail(400, { error: error.message });
				});
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Internal error creating feed usage' });
		}
	},

	recordWeight: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { sampleWeight, flockId, weightDate } = data;

		if (!sampleWeight || !flockId || !weightDate)
			return fail(400, { error: 'Please Fill all Fileds' });

		try {
			const weightLog = await prisma.weightLog.create({
				data: {
					sampleWeight: parseFloat(sampleWeight.toString()),
					flock: { connect: { id: parseInt(flockId.toString()) } },
					user: { connect: { id: user?.id } }
				}
			});

			return { status: 200, weightLog };
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Internal error creating weight log' });
		}
	},

	recordVaccination: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries((await request.formData()).entries());
		const { vaccineId, flockId, vaccinationDate, notes } = data;

		if (!vaccineId || !flockId || !vaccinationDate)
			return fail(400, { error: 'Please Fill all Fileds' });

		try {
			const vaccination = await prisma.vaccinationRecord.create({
				data: {
					vaccinationDate: new Date(vaccinationDate.toString()),
					notes: notes.toString(),
					vaccine: { connect: { id: parseInt(vaccineId.toString()) } },
					flock: { connect: { id: parseInt(flockId.toString()) } },
					administeredBy: { connect: { id: user?.id } }
				}
			});

			return { status: 200, vaccination };
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Internal error creating vaccination record' });
		}
	}
};

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

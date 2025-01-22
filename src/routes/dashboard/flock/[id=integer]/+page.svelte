<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import Chart from 'chart.js/auto';
	import { formatDate } from '$lib/utils/utils.js';
	import Modal from '$lib/components/Modal.svelte';
	import { getToastState } from '$lib/Toast.svelte';
	import { ExpenseCategory } from '@prisma/client';

	const { data } = $props();
	const flock = $derived(data?.flock);
	const metrics = $derived(data?.metrics);
	const expenseCategories = $derived(Object.values(data?.ExpenseCategory || {}));
	const feedTypes = $derived(Object.values(data?.FeedType || {}));

	const toast = getToastState();

	// State for tabs
	let activeTab = $state('overview');
	let showSlaughterModal = $state(false);
	let showMortalityModal = $state(false);
	let showFeedModal = $state(false);
	let showWeightModal = $state(false);
	let showExpenseModal = $state(false);
	let showVaccinationModal = $state(false);
	let formErrors = $state();
	let today = $state(new Date().toISOString().split('T')[0]);

	const formatCurrency = (num: number) =>
		num.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
</script>

{#if !flock}
	<p class="text-center text-gray-600">Flock not found</p>
{:else}
	<!-- Header Section -->
	<div class="p-4 sm:p-6">
		<a
			href="/dashboard/flock"
			class="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 hover:text-gray-900"
		>
			Back
		</a>
		<div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<h1 class="mb-2 text-2xl font-bold text-gray-800 sm:mb-0">{flock.name}</h1>
			<button
				class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
				onclick={() => {}}
			>
				Edit Flock
			</button>
		</div>

		<!-- Overview Cards -->
		<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div
				class="rounded-lg bg-green-50 p-4 shadow transition-transform duration-300 ease-in-out hover:scale-105"
			>
				<h3 class="text-sm font-medium text-gray-500">Current Age</h3>
				<p class="text-xl font-bold text-black sm:text-2xl">{metrics?.currentAge} days</p>
			</div>
			<div
				class="rounded-lg bg-green-50 p-4 shadow transition-transform duration-300 ease-in-out hover:scale-105"
			>
				<h3 class="text-sm font-medium text-gray-500">Mortality Rate</h3>
				<p class="text-xl font-bold text-black sm:text-2xl">{metrics?.mortalityRate}%</p>
				<p class="text-sm text-gray-500">{metrics?.totalMortality} birds</p>
			</div>

			<div
				class="rounded-lg bg-green-50 p-4 shadow transition-transform duration-300 ease-in-out hover:scale-105"
			>
				<h3 class="text-sm font-medium text-gray-500">Birds Remaining</h3>
				<p class="text-xl font-bold text-black sm:text-2xl">{metrics?.birdsRemaining}</p>
				<p class="text-sm text-gray-500">Initial: {flock.numberOfBirds} birds</p>
			</div>
			<div
				class="rounded-lg bg-green-50 p-4 shadow transition-transform duration-300 ease-in-out hover:scale-105"
			>
				<h3 class="text-sm font-medium text-gray-500">Cost per Bird</h3>
				<p class="text-xl font-bold text-black sm:text-2xl">
					{formatCurrency(parseInt(metrics?.costPerBird || '0'))}
				</p>
				<p class="text-sm text-gray-500">
					Total Expenses: {formatCurrency(metrics?.totalExpenses || 0)}
				</p>
			</div>
		</div>

		<!-- Tabs -->
		<div class="mb-4 border-b">
			<nav class="-mb-px flex flex-wrap justify-start space-x-2 sm:space-x-8">
				{#each ['Overview', 'Health', 'Feed', 'Weight', 'Expenses', 'Vaccination'] as tab}
					<button
						class="border-b-2 px-1 py-2 text-sm font-medium focus:outline-none"
						class:border-green-400={activeTab === tab.toLowerCase()}
						class:text-black={activeTab === tab.toLowerCase()}
						class:border-transparent={activeTab !== tab.toLowerCase()}
						class:text-gray-500={activeTab !== tab.toLowerCase()}
						onclick={() => (activeTab = tab.toLowerCase())}
					>
						{tab}
					</button>
				{/each}
			</nav>
		</div>

		<!-- Tab Content -->
		<div class="rounded-lg bg-gray-100 p-4 shadow sm:p-6">
			{#if activeTab === 'overview'}
				<!-- Basic Information -->
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<div>
						<h3 class="mb-4 text-lg font-medium">Flock Details</h3>
						<dl class="space-y-2">
							<div class="flex justify-between">
								<dt class="text-black">Bird Type:</dt>
								<dd>{flock.birdType}</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-black">Start Date:</dt>
								<dd>{formatDate(new Date(flock.startDate))}</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-black">House:</dt>
								<dd>{flock.house.name}</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-black">Breeder:</dt>
								<dd>{flock.breeder || 'N/A'}</dd>
							</div>
						</dl>
					</div>
				</div>
			{:else if activeTab === 'health'}
				<div class="space-y-6">
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<h3 class="text-lg font-medium">Health Records</h3>
						<button
							class="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:mt-0"
							onclick={() => (showMortalityModal = true)}
						>
							Record Mortality
						</button>
					</div>

					<!-- Mortality Records -->
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Date</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Deaths</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Cause</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each flock.Mortality as record}
									<tr>
										<td class="whitespace-nowrap px-4 py-2"
											>{new Date(record.createdAt).toLocaleDateString()}</td
										>
										<td class="whitespace-nowrap px-4 py-2">{record.number}</td>
										<td class="whitespace-nowrap px-4 py-2">{record.causeOfDeath}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{:else if activeTab === 'feed'}
				<div class="space-y-6">
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<h3 class="text-lg font-medium">Feed Usage</h3>
						<button
							class="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:mt-0"
							onclick={() => (showFeedModal = true)}
						>
							Record Feed Usage
						</button>
					</div>
					<!-- Feed Summary Cards -->
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<div class="rounded-lg bg-white p-4 shadow">
							<h3 class="text-sm font-medium text-gray-500">Total Feed Used</h3>
							<p class="text-xl font-bold">{metrics?.totalFeedUsed} kg</p>
						</div>

						<div class="rounded-lg bg-white p-4 shadow">
							<h3 class="text-sm font-medium text-gray-500">Average Daily Consumption</h3>
							<p class="text-xl font-bold">{metrics?.avgDailyFeed.toFixed(1)} kg</p>
						</div>

						<div class="rounded-lg bg-white p-4 shadow">
							<h3 class="text-sm font-medium text-gray-500">Feed Conversion Ratio</h3>
							<p class="text-xl font-bold">{metrics?.feedConversionRatio}</p>
						</div>
					</div>

					<!-- Feed Usage Records -->
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Date</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Feed Type</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Quantity (kg)</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each flock.feedUsages as usage}
									<tr>
										<td class="whitespace-nowrap px-4 py-2"
											>{formatDate(new Date(usage.createdAt))}</td
										>
										<td class="whitespace-nowrap px-4 py-2">{usage.feedType}</td>
										<td class="whitespace-nowrap px-4 py-2">{usage.quantity} kg</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{:else if activeTab === 'weight'}
				<div class="space-y-6">
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<h3 class="text-lg font-medium">Weight Tracking</h3>
						<button
							class="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:mt-0"
							onclick={() => (showWeightModal = true)}
						>
							Record Weight
						</button>
					</div>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div class="rounded-lg bg-white p-4 shadow">
							<h3 class="text-sm font-medium text-gray-500">Current Weight</h3>
							<p class="text-xl font-bold">{metrics?.currentWeight} kg</p>
						</div>
					</div>

					<!-- Weight Records -->
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Date</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Sample Weight (kg)</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each flock.weightLogs as log}
									<tr>
										<td class="whitespace-nowrap px-4 py-2"
											>{formatDate(new Date(log.createdAt))}</td
										>
										<td class="whitespace-nowrap px-4 py-2">{log.sampleWeight}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{:else if activeTab === 'expenses'}
				<div class="space-y-6">
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<h3 class="text-lg font-medium">Expenses</h3>
						<button
							class="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:mt-0"
							onclick={() => (showExpenseModal = true)}
						>
							Add Expense
						</button>
					</div>

					<!-- Expense Records -->
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Date</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Category</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Amount</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Notes</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each flock.expenses as expense}
									<tr>
										<td class="whitespace-nowrap px-4 py-2">{formatDate(expense.createdAt)}</td>
										<td class="whitespace-nowrap px-4 py-2">{expense.category}</td>
										<td class="whitespace-nowrap px-4 py-2">{formatCurrency(expense.amount)}</td>
										<td class="whitespace-nowrap px-4 py-2">{expense.description}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{:else if activeTab === 'vaccination'}
				<div class="space-y-6">
					<!-- Vaccination Section -->
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<h3 class="text-lg font-medium">Vaccination Records</h3>
						<button
							class="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:mt-0"
							onclick={() => (showVaccinationModal = true)}
						>
							Record Vaccination
						</button>
					</div>

					<!-- Upcoming Vaccinations -->
					<div class="rounded-lg bg-yellow-50 p-4">
						<h4 class="mb-2 font-medium text-yellow-800">Upcoming Vaccinations</h4>
						<div class="space-y-2">
							{#each data.vaccinationSchedule || [] as schedule}
								<div
									class="flex flex-col rounded-md bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
								>
									<div>
										<p class="font-medium">{schedule.vaccine.name}</p>
										<p class="text-sm text-gray-500">Due at {schedule.ageInDays} days</p>
									</div>
									<span class="mt-2 text-sm text-yellow-600 sm:mt-0">
										Due in {schedule.ageInDays - (metrics?.currentAge || 0)} days
									</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Vaccination History -->
					<div class="overflow-x-auto rounded-lg bg-white shadow">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Date</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Vaccine</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Administered by</th
									>
									<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
										>Notes</th
									>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each flock.vaccinationRecords as record}
									<tr class="hover:bg-gray-50">
										<td class="whitespace-nowrap px-4 py-2"
											>{formatDate(new Date(record.createdAt))}</td
										>
										<td class="whitespace-nowrap px-4 py-2">{record.vaccine.name}</td>
										<td class="whitespace-nowrap px-4 py-2">
											{record.administeredBy.name || 'N/A'}
										</td>
										<td class="px-4 py-2">{record.notes || '-'}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Slaughter Modal -->
	{#if showSlaughterModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div class="w-full max-w-md rounded-lg bg-white p-6">
				<h2 class="mb-4 text-xl font-bold">Record Slaughter</h2>
				<form method="POST" action="?/recordSlaughter">
					<div class="mb-4">
						<label class="mb-2 block text-sm font-bold" for="number">Number of Birds</label>
						<input
							type="number"
							id="number"
							name="number"
							class="w-full rounded border px-3 py-2"
							required
						/>
					</div>
					<div class="mb-4">
						<label class="mb-2 block text-sm font-bold" for="averageWeight">
							Average Weight (kg)
						</label>
						<input
							type="number"
							id="averageWeight"
							name="averageWeight"
							step="0.01"
							class="w-full rounded border px-3 py-2"
							required
						/>
					</div>
					<div class="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
						<button
							type="button"
							class="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
							onclick={() => (showSlaughterModal = false)}
						>
							Cancel
						</button>
						<button type="submit" class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
							Record
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Mortality Modal -->
	<Modal bind:show={showMortalityModal} title="Record Mortality">
		{#if formErrors}
			<span class="text-red-500">{formErrors}</span>
		{/if}
		<form
			class="grid grid-cols-1 gap-4 md:grid-cols-2"
			method="POST"
			action="?/mortalityLog"
			use:enhance={() => {
				formErrors = '';
				return async ({ result, update }) => {
					if (result.type === 'success') {
						showMortalityModal = false;
						formErrors = '';
						await update();
						toast.add('Success', 'Mortality logged successfully', 'success', 2000);
					} else if (result.type === 'failure') {
						formErrors = result.data?.error ? result.data.error : 'Error saving mortality log';
					}
				};
			}}
		>
			<!-- Log Date -->
			<div>
				<label for="logDate" class="mb-2 block font-medium text-gray-700">Date</label>
				<input
					id="logDate"
					type="date"
					name="logDate"
					class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
					bind:value={today}
				/>
			</div>
			<!-- Number of Deaths -->
			<div>
				<label for="numberOfDeaths" class="mb-2 block font-medium text-gray-700"
					>Number of Deaths</label
				>
				<input
					id="numberOfDeaths"
					type="number"
					name="numberOfDeaths"
					placeholder="Enter number of deaths"
					class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
				/>
			</div>
			<!-- Cause of Death -->
			<div>
				<label for="causeOfDeath" class="mb-2 block font-medium text-gray-700">Cause of Death</label
				>
				<input
					id="causeOfDeath"
					type="text"
					name="causeOfDeath"
					placeholder="Enter cause of death"
					class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
					required
				/>

				<input type="hidden" name="flockId" value={flock.id} />
			</div>
			<!-- Submit Button -->
			<div class="flex flex-col sm:flex-row sm:justify-between md:col-span-2">
				<button
					type="button"
					class="mb-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 sm:mb-0"
					onclick={() => (showMortalityModal = false)}
				>
					Cancel
				</button>
				<button type="submit" class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
					Save
				</button>
			</div>
		</form>
	</Modal>

	<Modal bind:show={showExpenseModal} title="Record Expense">
		{#if formErrors}
			<span class="text-red-500">{formErrors}</span>
		{/if}
		<form
			method="POST"
			action="?/recordExpense"
			class="space-y-4"
			use:enhance={() => {
				return async ({ result, update }) => {
					formErrors = '';
					if (result.type === 'success') {
						showExpenseModal = false;
						formErrors = '';
						await update();
						toast.add('Success', 'Expense recorded successfully', 'success');
					} else if (result.type === 'failure') {
						formErrors = result.data?.error ? result.data.error : 'Error saving expense';
					}
				};
			}}
		>
			<input type="hidden" name="flockId" value={flock.id} />

			<div class="space-y-4">
				<div>
					<label for="category" class="block text-sm font-medium">Category</label>
					<select
						id="category"
						name="category"
						required
						class="mt-1 w-full rounded border px-3 py-2"
					>
						{#each expenseCategories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="amount" class="block text-sm font-medium">Amount (KES)</label>
					<input
						type="number"
						id="amount"
						name="amount"
						required
						min="0"
						step="0.01"
						class="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium">Description</label>
					<textarea
						id="description"
						name="description"
						rows="3"
						class="mt-1 w-full rounded border px-3 py-2"
					></textarea>
				</div>

				<div class="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
					<button
						type="button"
						class="mb-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 sm:mb-0"
						onclick={() => (showExpenseModal = false)}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
					>
						Save Expense
					</button>
				</div>
			</div>
		</form>
	</Modal>

	<!-- Feed Usage Modal -->
	<Modal bind:show={showFeedModal} title="Record Feed Usage">
		{#if formErrors}
			<span class="text-red-500">{formErrors}</span>
		{/if}
		<form
			method="POST"
			action="?/recordFeedUsage"
			class="space-y-4"
			use:enhance={() => {
				formErrors = '';
				return async ({ result, update }) => {
					if (result.type === 'success') {
						formErrors = '';
						showFeedModal = false;
						await update();
						toast.add('Success', 'Feed usage recorded', 'success');
					} else if (result.type === 'failure') {
						formErrors = result.data?.error ? result.data.error : 'Error saving feed usage';
					}
				};
			}}
		>
			<input type="hidden" name="flockId" value={flock.id} />

			<div class="space-y-4">
				<div>
					<label for="feedType" class="block text-sm font-medium">Feed Type</label>
					<select
						id="feedType"
						name="feedType"
						required
						class="mt-1 w-full rounded border px-3 py-2"
					>
						{#each feedTypes as feedType}
							<option value={feedType}>{feedType.replace('_', ' ')}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="quantity" class="block text-sm font-medium">Quantity (kg)</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						required
						min="0"
						step="0.1"
						class="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				<div>
					<label for="usageDate" class="block text-sm font-medium">Date</label>
					<input
						type="date"
						id="usageDate"
						name="usageDate"
						required
						class="mt-1 w-full rounded border px-3 py-2"
						value={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<div>
					<label for="notes" class="block text-sm font-medium">Notes</label>
					<textarea id="notes" name="notes" rows="2" class="mt-1 w-full rounded border px-3 py-2"
					></textarea>
				</div>

				<input type="hidden" name="flockId" value={flock.id} />

				<div class="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
					<button
						type="button"
						class="mb-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 sm:mb-0"
						onclick={() => (showFeedModal = false)}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	</Modal>

	<!-- Weight Log Modal -->
	<Modal bind:show={showWeightModal} title="Record Weight">
		{#if formErrors}
			<span class="text-red-500">{formErrors}</span>
		{/if}
		<form
			method="POST"
			action="?/recordWeight"
			class="space-y-4"
			use:enhance={() => {
				return async ({ result, update }) => {
					formErrors = '';
					if (result.type === 'success') {
						formErrors = '';
						showWeightModal = false;
						await update();
						toast.add('Success', 'Weight recorded', 'success');
					}
					if (result.type === 'failure') {
						formErrors = result.data?.error ? result.data.error : 'Error saving weight log';
					}
				};
			}}
		>
			<input type="hidden" name="flockId" value={flock.id} />

			<div class="space-y-4">
				<div>
					<label for="sampleWeight" class="block text-sm font-medium">Sample Weight (kg)</label>
					<input
						type="number"
						id="sampleWeight"
						name="sampleWeight"
						required
						min="0"
						step="0.01"
						class="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				<div>
					<label for="weightDate" class="block text-sm font-medium">Date</label>
					<input
						type="date"
						id="weightDate"
						name="weightDate"
						required
						class="mt-1 w-full rounded border px-3 py-2"
						value={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<div>
					<label for="notes" class="block text-sm font-medium">Notes</label>
					<textarea id="notes" name="notes" rows="2" class="mt-1 w-full rounded border px-3 py-2"
					></textarea>
				</div>

				<input type="hidden" name="flockId" value={flock.id} />

				<div class="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
					<button
						type="button"
						class="mb-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 sm:mb-0"
						onclick={() => (showWeightModal = false)}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	</Modal>

	<Modal bind:show={showVaccinationModal} title="Record Vaccination">
		{#if formErrors}
			<span class="text-red-500">{formErrors}</span>
		{/if}
		<form
			method="POST"
			action="?/recordVaccination"
			class="space-y-4"
			use:enhance={() => {
				formErrors = '';
				return async ({ result, update }) => {
					if (result.type === 'success') {
						formErrors = '';
						showVaccinationModal = false;
						await update();
						toast.add('Success', 'Vaccination recorded', 'success');
					} else if (result.type === 'failure') {
						formErrors = result.data?.error ? result.data.error : 'Error saving vaccination record';
					}
				};
			}}
		>
			<input type="hidden" name="flockId" value={flock.id} />

			<div class="space-y-4">
				<!-- Vaccine Selection -->
				<div>
					<label for="vaccineId" class="block text-sm font-medium">Vaccine</label>
					<select
						id="vaccineId"
						name="vaccineId"
						required
						class="mt-1 w-full rounded border px-3 py-2"
					>
						{#each data.vaccines || [] as vaccine}
							<option value={vaccine.id}>{vaccine.name}</option>
						{/each}
					</select>
				</div>

				<!-- Date -->
				<div>
					<label for="vaccinationDate" class="block text-sm font-medium">Date</label>
					<input
						type="date"
						id="vaccinationDate"
						name="vaccinationDate"
						required
						class="mt-1 w-full rounded border px-3 py-2"
						value={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<!-- Notes -->
				<div>
					<label for="notes" class="block text-sm font-medium">Notes</label>
					<textarea id="notes" name="notes" rows="3" class="mt-1 w-full rounded border px-3 py-2"
					></textarea>
				</div>

				<!-- Action Buttons -->
				<div class="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
					<button
						type="button"
						class="mb-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 sm:mb-0"
						onclick={() => (showVaccinationModal = false)}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
					>
						Record Vaccination
					</button>
				</div>
			</div>
		</form>
	</Modal>
{/if}

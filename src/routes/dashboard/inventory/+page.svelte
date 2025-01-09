<script lang="ts">
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { FeedType } from '@prisma/client';
	import { writable, derived } from 'svelte/store';

	let { data } = $props();

	let openFormFeedType = $state('');
	let formErrors = $state('');

	let buttonColors = writable<Record<string, string>>({});

	let feedInventoryMap = writable(data.feedInventoryMap);
	let inventoryData = derived(feedInventoryMap, ($feedInventoryMap) => $feedInventoryMap);

	const feedTypes = Object.values(data.FeedType);

	const toggleForm = (feedType: string) => {
		openFormFeedType = openFormFeedType === feedType ? '' : feedType;
		formErrors = '';
	};

	const getProgressWidth = (feedType: FeedType) => {
		let quantity = 0;
		inventoryData.subscribe(($inventoryData) => {
			quantity = $inventoryData[feedType]?.quantity ?? 0;
		})();
		return Math.min((quantity / 500) * 100, 100);
	};

	// Mapping button colors to corresponding progress bar colors
	const progressBarMap: Record<string, string> = {
		'bg-gray-350': 'bg-gray-400',
		'bg-green-350': 'bg-green-400',
		'bg-blue-350': 'bg-blue-400',
		'bg-red-350': 'bg-red-400'
	};

	const getProgressBarColor = (buttonColor: string) => {
		return progressBarMap[buttonColor] || 'bg-gray-400';
	};
</script>

<div class="p-6">
	<h1 class="mb-6 text-3xl font-semibold text-gray-800">Feed Inventory</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each feedTypes as feedType (feedType)}
			<div
				class="card flex flex-col justify-between rounded-lg border bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
			>
				<div>
					<h2 class="mb-2 text-2xl font-semibold text-gray-700">{feedType.replace('_', ' ')}</h2>
					<p class="mb-4 text-gray-600">
						Notes: {#if $inventoryData[feedType]}{$inventoryData[feedType].notes}{/if}
					</p>
					<p class="mb-4 text-4xl font-bold text-gray-800">
						{$inventoryData[feedType]?.quantity ?? 0}
						<span class="text-lg font-medium"> kg</span>
					</p>
					<!-- Progress bar (500 kg max) -->
					<div class="flex items-center">
						<div class="h-2 w-full rounded-full bg-gray-200">
							<!-- Dynamically colored progress bar -->
							<div
								class={`h-2 rounded-full ${getProgressBarColor($buttonColors[feedType] || 'bg-gray-300')}`}
								style="width: {getProgressWidth(feedType)}%"
							></div>
						</div>
						<span class="ml-2 text-sm text-gray-600">500KG</span>
					</div>
				</div>
				<div class="mt-4">
					<!-- Color dropdown -->
					<label for="button-color-{feedType}" class="mb-2 block text-sm font-medium text-gray-700">
						Button Color:
					</label>
					<select
						id="button-color-{feedType}"
						class="mb-2 w-full rounded border px-3 py-2"
						onchange={(e: Event) => {
							const target = e.target as HTMLSelectElement;
							buttonColors.update((colors) => ({
								...colors,
								[feedType]: target.value
							}));
						}}
					>
						<option value="bg-gray-400">Gray</option>
						<option value="bg-green-400">Green</option>
						<option value="bg-blue-400">Blue</option>
						<option value="bg-red-400">Red</option>
					</select>

					<!-- Dynamically colored button -->
					<button
						class={`w-full rounded px-4 py-2 text-white transition-colors hover:opacity-90 ${
							$buttonColors[feedType] || 'bg-gray-300'
						}`}
						onclick={() => toggleForm(feedType)}
					>
						{openFormFeedType === feedType ? 'Cancel' : 'Add Stock'}
					</button>
					{#if openFormFeedType === feedType}
						<form
							method="POST"
							class="mt-4"
							in:slide
							out:slide={{ duration: 150 }}
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.type === 'success') {
										await update();
										toggleForm(feedType);
									}
									if (result.type === 'failure') {
										formErrors = result?.data?.error
											? String(result.data.error)
											: 'Error adding feed stock';
									}
								};
							}}
						>
							{#if formErrors}
								<span class="text-sm text-red-600">{formErrors}</span>
							{/if}
							<div class="flex flex-col space-y-4">
								<input
									type="number"
									name="quantity"
									min="0"
									step="10"
									placeholder="Quantity (kg)"
									class="w-full rounded border px-3 py-2"
								/>
								<textarea name="notes" placeholder="Notes" class="w-full rounded border px-3 py-2"
								></textarea>
								<input type="hidden" name="feedType" value={feedType} />
								<button
									type="submit"
									class={`w-full rounded px-4 py-2 text-white transition-colors hover:opacity-90 ${
										$buttonColors[feedType] || 'bg-gray-300'
									}`}
								>
									Submit
								</button>
							</div>
						</form>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 0.5rem;
		background-color: white;
		padding: 1.5rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.3s ease-in-out,
			box-shadow 0.3s ease-in-out;
	}
	.card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 12px 20px -3px rgba(0, 0, 0, 0.1),
			0 8px 10px -2px rgba(0, 0, 0, 0.05);
	}
</style>

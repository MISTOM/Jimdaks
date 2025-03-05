<script lang="ts">
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { FeedType } from '@prisma/client';

	let { data } = $props();

	let openFormFeedType = $state('');
	let formErrors = $state();

	let inventoryData = $derived(data.feedInventoryMap);

	const feedTypes = Object.values(data.FeedType);
	// $inspect('Feed inventory: ', inventoryData

	const toggleForm = (feedType: string) => {
		openFormFeedType = openFormFeedType === feedType ? '' : feedType;
		formErrors = '';
	};

	const getProgressWidth = (feedType: FeedType) => {
		const quantity = inventoryData[feedType]?.quantity ?? 0;
		return Math.min((quantity / 500) * 100, 100);
	};
</script>

<div class="p-6">
	<h1 class=" text-2xl font-light text-gray-800 transition duration-300 hover:text-black">
		Feed Inventory
	</h1>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each feedTypes as feedType (feedType)}
			<div class="flex flex-col justify-between rounded-lg border p-4 shadow-xs hover:shadow-md">
				<div>
					<h2 class="mb-2 text-xl font-semibold">{feedType.replace('_', ' ')}</h2>
					<p>Notes: {inventoryData[feedType]?.notes}</p>
					<p class="mb-2 text-4xl font-bold">
						{inventoryData[feedType]?.quantity ?? 0}
						<span class="text-lg font-medium"> kg</span>
					</p>
					<!-- Progress bar ( 500 kg max) -->
				</div>
				<div class="flex items-center justify-center">
					<div class="mb-4 h-2 w-full rounded-full bg-gray-200">
						<div
							class="h-2 rounded-full bg-green-700"
							style="width: {getProgressWidth(feedType)}%"
						></div>
					</div>
					<span class="ml-2 text-center text-sm text-gray-600">500KG</span>
				</div>
				<div class="flex space-x-5">
					<button
						class="rounded-sm bg-green-700 px-3 py-2 text-white transition-colors hover:bg-green-800"
						onclick={() => toggleForm(feedType)}
					>
						{openFormFeedType === feedType ? 'Cancel' : 'Add Stock'}
					</button>
					{#if openFormFeedType === feedType}
						<form
							method="POST"
							class="mt-2"
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
											? result.data.error
											: 'Error adding feed stock';
									}
								};
							}}
						>
							{#if formErrors}
								<span class="text-sm text-red-600">{formErrors}</span>
							{/if}
							<div class="flex items-center space-x-5">
								<input
									type="number"
									name="quantity"
									min="0"
									step="10"
									placeholder="Quantity (kg)"
									class="w-full rounded-sm border px-3 py-2"
								/>
								<input
									type="textarea"
									name="notes"
									placeholder="Notes"
									class="w-full rounded-sm border px-3 py-2"
								/>
								<input type="hidden" name="feedType" value={feedType} />
								<button
									type="submit"
									class="rounded-sm bg-green-700 px-3 py-2 text-white transition-colors hover:bg-green-800"
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

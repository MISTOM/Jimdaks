<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let feedTypeFilter = $state('');
	let sortBy = $state('createdAt');
	let sortOrder = $state('desc');

	let inventoryData = $derived(data.feedInventoryMap);

	const feedTypes = Object.values(data.FeedType);

	const applyFilters = () => {
		const params = new URLSearchParams();
		if (feedTypeFilter) params.set('feedType', feedTypeFilter);
		if (sortBy) params.set('sortBy', sortBy);
		if (sortOrder) params.set('sortOrder', sortOrder);
		goto(`/dashboard/inventory/?${params.toString()}`);
	};

	$inspect('Feed inventory: ', inventoryData);
</script>

<h1 class="mb-4 text-2xl font-bold">Feed Inventory</h1>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	{#each feedTypes as feedType}
		<div class="flex flex-col justify-between rounded-lg border p-4 shadow-sm hover:shadow-md">
			<div>
				<h2 class="mb-2 text-xl font-semibold">{feedType.replace('_', ' ')}</h2>
				<p>Notes: {inventoryData[feedType]?.notes}</p>
				<p class="mb-2 text-4xl font-bold">
					{inventoryData[feedType]?._sum.quantity ?? 0}
					<span class="text-lg font-medium"> kg</span>
				</p>
				<!-- Progress bar (Example using a max capacity of 1000 kg) -->
				<div class="mb-4 h-2 w-full rounded-full bg-gray-200">
					<div
						class="h-2 rounded-full bg-green-500"
						style="width: {Math.min(
							100,
							((inventoryData[feedType]?._sum.quantity ?? 0) / 1000) * 100
						)};"
					></div>
				</div>
			</div>
			<div class="flex space-x-2">
				<button
					class="rounded bg-green-600 px-3 py-2 text-white transition-colors hover:bg-green-700"
					onclick={() => console.log('Add stock clicked!')}
				>
					Add Stock
				</button>
				<button
					class="self-center text-green-600 transition-colors hover:underline"
					onclick={() => console.log('View details clicked!')}
				>
					View Details
				</button>
			</div>
		</div>
	{/each}
</div>

<!-- <div class="mb-4 flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
	<div class="flex flex-wrap space-x-2">
	  <div>
		<label for="feedTypeFilter" class="block font-medium">Filter by Feed Type</label>
		<select
		  id="feedTypeFilter"
		  bind:value={feedTypeFilter}
		  class="mt-1 block w-full border rounded p-2"
		>
		  <option value="">All</option>
		  {#each feedTypes as type}
			<option value={type}>{type.replace('_', ' ')}</option>
		  {/each}
		</select>
	  </div>
	  <div>
		<label for="sortBy" class="block font-medium">Sort By</label>
		<select
		  id="sortBy"
		  bind:value={sortBy}
		  class="mt-1 block w-full border rounded p-2"
		>
		  <option value="createdAt">Date</option>
		  <option value="quantity">Quantity</option>
		  <option value="feedType">Feed Type</option>
		</select>
	  </div>
	  <div>
		<label for="sortOrder" class="block font-medium">Order</label>
		<select
		  id="sortOrder"
		  bind:value={sortOrder}
		  class="mt-1 block w-full border rounded p-2"
		>
		  <option value="desc">Descending</option>
		  <option value="asc">Ascending</option>
		</select>
	  </div>
	  <button
		onclick={() => applyFilters()}
		class="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
	  >
		Apply
	  </button>
	</div>
	<div>
	  <button
		onclick={() => goto('/feed-inventory/add')}
		class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
	  >
		Add New Feed
	  </button>
	</div>
  </div>
  
  <div class="overflow-auto">
	<table class="min-w-full border">
	  <thead>
		<tr class="bg-gray-100">
		  <th class="px-4 py-2 border">Date</th>
		  <th class="px-4 py-2 border">Feed Type</th>
		  <th class="px-4 py-2 border">Quantity (kg)</th>
		  <th class="px-4 py-2 border">Notes</th>
		</tr>
	  </thead>
	  <tbody>
		{#each feedInventoryRecords as record}
		  <tr class="hover:bg-gray-50">
			<td class="px-4 py-2 border">
			  {new Date(record.createdAt).toLocaleDateString()}
			</td>
			<td class="px-4 py-2 border">{record.feedType.replace('_', ' ')}</td>
			<td class="px-4 py-2 border">{record.quantity}</td>
			<td class="px-4 py-2 border">{record.notes}</td>
		  </tr>
		{/each}
	  </tbody>
	</table>
  </div> -->

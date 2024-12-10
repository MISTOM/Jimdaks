<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';

	let { data }: { data: PageData } = $props();
	const houses = $derived(data?.houses || []);
	let searchTerm = $state('');

	let filteredFlocks = $derived(() =>
		houses.filter((house) =>
			house.name ? house.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
		)
	);
</script>

<Header />
<!-- Houses page with Table Layout -->
<div class="p-6">
	<div class="mb-4 flex justify-between">
		<div class="relative flex items-center">
			<svg
				class="absolute left-3 h-5 w-5 text-gray-500"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
					clip-rule="evenodd"
				></path>
			</svg>
			<input
				type="text"
				placeholder="Search..."
				class="w-64 rounded border py-2 pl-10 pr-4"
				bind:value={searchTerm}
			/>
		</div>
		<button class="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-500">
			Add House
		</button>
	</div>

	{#if houses.length === 0}
		<p class="text-gray-600">No houses found.</p>
	{:else}
		<table class="w-full table-auto border-collapse rounded-lg bg-white shadow-md">
			<thead class="bg-gray-200">
				<tr>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Name</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Capacity</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Description</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Created At</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Updated At</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each houses as house}
					<tr class="border-b hover:bg-gray-100">
						<td class="border px-4 py-2 text-sm">{house.name}</td>
						<td class="border px-4 py-2 text-sm">{house.capacity}</td>
						<td class="border px-4 py-2 text-sm">{house.description || 'N/A'}</td>
						<td class="border px-4 py-2 text-sm">{new Date(house.createdAt).toLocaleString()}</td>
						<td class="border px-4 py-2 text-sm">{new Date(house.updatedAt).toLocaleString()}</td>
						<td class="border px-4 py-2 text-center text-sm">
							<button
								class="rounded-md bg-yellow-500 px-3 py-1 text-white transition duration-200 hover:bg-yellow-600"
							>
								Edit
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

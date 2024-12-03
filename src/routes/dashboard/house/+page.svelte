<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';

	let { data }: { data: PageData } = $props();
	const houses = $derived(data?.houses || []);
</script>

<Header />
<!-- Houses page with Table Layout -->
<div class="p-6">
	<div class="mb-4 flex justify-between">
		<h1 class="text-3xl font-bold text-gray-700">Houses</h1>
		<button
			class="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
		>
			Add House
		</button>
	</div>

	{#if houses.length === 0}
		<p class="text-gray-600">No houses found.</p>
	{:else}
		<table class="w-full table-auto border-collapse rounded-lg bg-white shadow-md">
			<thead class="bg-gray-100">
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
					<tr class="border-b hover:bg-gray-50">
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

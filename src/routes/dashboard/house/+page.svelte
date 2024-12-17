<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';
	import SearchIcon from '$lib/components/SearchIcon.svelte';
	import { getToastState } from '$lib/Toast.svelte';

	let { data } = $props();

	const houses = $derived(data?.houses || []);

	const toast = getToastState();

	let showHouseModal = $state(false);
	let formErrors = $state();
	let name = $state('');
	let capacity = $state('');
	let description = $state('');

	let searchTerm = $state('');

	let filteredHouses = $derived.by(() =>
		houses.filter((house) =>
			house.name ? house.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
		)
	);

	// Delete house
	const deleteHouse = (houseName: string | null, houseId: number) => async () => {
		if (!confirm(`Are you sure you want to delete ${houseName || 'this'} house?`)) return;

		const response = await fetch(`/api/house/${houseId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			invalidate('update:houses');
			toast.add('Success', 'House deleted successfully', 'success');
		} else {
			const res = await response.json();
			console.log('Error deleting house -> ', res);
			toast.add('Error', `${res.message || 'Error Deleteing House'}`, 'error');
		}
	};
</script>

<!-- Resuable snippet -->
{#snippet formError(formErrors: any)}
	<div
		class="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
		in:slide={{ duration: 150 }}
	>
		<strong class="font-bold">Oops!</strong>
		<span class="block sm:inline">{formErrors}</span>
	</div>
{/snippet}

<div class="p-6">
	<h1 class="text-2xl font-light text-gray-800 transition duration-300 hover:text-black">Houses</h1>
	<div class="mb-4 flex flex-wrap items-center justify-between gap-4">
		<div class="relative flex w-full max-w-md items-center">
			<SearchIcon />
			<input
				type="text"
				placeholder="Search..."
				class="w-full rounded border py-2 pl-10 pr-4"
				bind:value={searchTerm}
			/>
		</div>
		<button
			class="w-full rounded bg-green-700 px-4 py-2 text-white transition-colors hover:bg-green-600 sm:w-auto"
			onclick={() => (showHouseModal = true)}
		>
			Add House
		</button>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full table-auto border-collapse bg-white shadow-md">
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
				{#if filteredHouses.length === 0}
					<tr>
						<td class="border px-4 py-2 text-center text-sm text-gray-500" colspan="6">
							No Houses found
						</td>
					</tr>
				{:else}
					{#each filteredHouses as house}
						<tr class="border-b hover:bg-gray-100">
							<td class="border px-4 py-2 text-sm">{house.name}</td>
							<td class="border px-4 py-2 text-sm">{house.capacity}</td>
							<td class="border px-4 py-2 text-sm">{house.description || 'N/A'}</td>
							<td class="border px-4 py-2 text-sm">
								{new Date(house.createdAt).toLocaleString()}
							</td>
							<td class="border px-4 py-2 text-sm">
								{new Date(house.updatedAt).toLocaleString()}
							</td>
							<td class="border px-4 py-2 text-center text-sm">
								<button
									class="mb-2 w-full rounded-md bg-yellow-500 px-3 py-1 text-white transition duration-200 hover:bg-yellow-600 sm:mb-0 sm:w-auto"
								>
									Edit
								</button>
								<button
									class="w-full rounded-md bg-red-500 px-3 py-1 text-white transition duration-200 hover:bg-red-600 sm:w-auto"
									onclick={deleteHouse(house.name, house.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

{#if showHouseModal}
	<div
		class="fixed inset-0 z-50 flex cursor-default items-center justify-center bg-gray-600 bg-opacity-50"
		role="button"
		tabindex="-1"
		onclick={() => (showHouseModal = false)}
		onkeydown={(e) => {
			e.key === 'Escape' && (showHouseModal = false);
		}}
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 50 }}
	>
		<div
			class="w-full max-w-lg rounded bg-white p-6 shadow-lg"
			role="button"
			onclick={(e) => e.stopPropagation()}
		>
			<h2 class="mb-6 text-2xl font-semibold text-green-600">New House</h2>
			<!-- Form Contents -->
		</div>
	</div>
{/if}

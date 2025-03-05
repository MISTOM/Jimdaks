<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';
	import SearchIcon from '$lib/components/SearchIcon.svelte';
	import { getToastState } from '$lib/Toast.svelte';
	import { formatDate } from '$lib/utils/utils.js';

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
			toast.add('Error', `${res.message || 'Error Deleting House'}`, 'error');
		}
	};
</script>

<!-- Reusable snippet -->
{#snippet formError(formErrors: any)}
	<div
		class="relative mb-4 rounded-sm border border-red-400 bg-red-100 px-4 py-3 text-red-700"
		in:slide={{ duration: 150 }}
	>
		<strong class="font-bold">Oops!</strong>
		<span class="block sm:inline">{formErrors}</span>
	</div>
{/snippet}

<div class="p-6">
	<h1 class="text-2xl font-light text-gray-800 transition duration-300 hover:text-black">Houses</h1>
	<div class="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
		<!-- Search Bar -->
		<div class="relative flex w-full max-w-md items-center">
			<!-- <SearchIcon class="absolute left-3" /> -->
			<input
				type="text"
				placeholder="Search..."
				class="w-full rounded-sm border py-2 pr-4 pl-10 focus:ring-2 focus:ring-green-500 focus:outline-hidden"
				bind:value={searchTerm}
			/>
		</div>
		<!-- Add House Button -->
		<button
			class="w-full rounded-sm bg-green-700 px-4 py-2 text-white transition-colors hover:bg-green-600 sm:w-auto"
			onclick={() => (showHouseModal = true)}
		>
			Add House
		</button>
	</div>

	<!-- Desktop Table View -->
	<div class="hidden overflow-x-auto shadow-lg md:block">
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
				{#if filteredHouses.length === 0}
					<tr>
						<td class="border px-4 py-2 text-center text-sm text-gray-500" colspan="6">
							No Houses found
						</td>
					</tr>
				{:else}
					{#each filteredHouses as house (house.id)}
						<tr class="border-b hover:bg-gray-100">
							<td class="border px-4 py-2 text-sm">{house.name}</td>
							<td class="border px-4 py-2 text-sm">{house.capacity}</td>
							<td class="border px-4 py-2 text-sm">{house.description || 'N/A'}</td>
							<td class="border px-4 py-2 text-sm">
								{formatDate(house.createdAt)}
							</td>
							<td class="border px-4 py-2 text-sm">
								{formatDate(house.updatedAt)}
							</td>
							<td class="border px-4 py-2 text-center text-sm">
								<div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
									<button
										class="rounded-sm bg-yellow-500 px-3 py-1 text-white transition duration-200 hover:bg-yellow-600"
									>
										Edit
									</button>
									<button
										class="rounded-sm bg-red-500 px-3 py-1 text-white transition duration-200 hover:bg-red-600"
										onclick={deleteHouse(house.name, house.id)}
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<!-- Mobile Card View -->
	<div class="grid gap-4 md:hidden">
		{#if filteredHouses.length === 0}
			<div class="rounded-lg bg-white p-4 text-sm shadow-sm">No Houses found</div>
		{:else}
			{#each filteredHouses as house (house.id)}
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-lg font-semibold">{house.name}</h3>
						<div class="flex space-x-2">
							<button
								class="rounded-sm bg-yellow-500 px-2 py-1 text-white shadow-sm hover:bg-yellow-600"
							>
								Edit
							</button>
							<button
								class="rounded-sm bg-red-500 px-2 py-1 text-white shadow-sm hover:bg-red-600"
								onclick={deleteHouse(house.name, house.id)}
							>
								Delete
							</button>
						</div>
					</div>

					<div class="grid gap-2 text-sm">
						<div class="grid grid-cols-2 border-b py-2">
							<span class="font-medium">Capacity:</span>
							<span>{house.capacity}</span>
						</div>
						<div class="grid grid-cols-2 border-b py-2">
							<span class="font-medium">Description:</span>
							<span>{house.description || 'N/A'}</span>
						</div>
						<div class="grid grid-cols-2 border-b py-2">
							<span class="font-medium">Created At:</span>
							<span>{formatDate(house.createdAt)}</span>
						</div>
						<div class="grid grid-cols-2 border-b py-2">
							<span class="font-medium">Updated At:</span>
							<span>{formatDate(house.updatedAt)}</span>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<!-- Add House Modal -->
{#if showHouseModal}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-600 p-4 sm:p-6"
		role="dialog"
		aria-modal="true"
		onclick={() => (showHouseModal = false)}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				showHouseModal = false;
			}
		}}
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 50 }}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="w-full max-w-lg rounded-sm bg-white p-6 shadow-lg"
			role="document"
			onclick={(e) => e.stopPropagation()}
		>
			<h2 class="mb-6 text-2xl font-semibold text-green-600">New House</h2>
			{#if formErrors}
				{@render formError(formErrors)}
			{/if}
			<form
				class="grid grid-cols-1 gap-4 md:grid-cols-2"
				action="?/house"
				method="POST"
				use:enhance={() => {
					formErrors = '';
					return async ({ result, update }) => {
						if (result.type === 'success') {
							showHouseModal = false;
							formErrors = '';
							await update();
							toast.add('Success', 'House added successfully', 'success');
						} else if (result.type === 'failure') {
							formErrors = result.data?.error ? result.data.error : 'Error saving House';
						}
					};
				}}
			>
				<!-- Name -->
				<div>
					<label for="name" class="mb-2 block font-medium text-gray-700">Name</label>
					<input
						id="name"
						type="text"
						name="name"
						placeholder="Enter house name"
						class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-hidden"
						bind:value={name}
						required
					/>
				</div>

				<!-- Capacity -->
				<div>
					<label for="capacity" class="mb-2 block font-medium text-gray-700">Capacity</label>
					<input
						id="capacity"
						type="number"
						name="capacity"
						min="0"
						placeholder="Enter house capacity"
						class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-hidden"
						bind:value={capacity}
						required
					/>
				</div>

				<!-- Description -->
				<div class="md:col-span-2">
					<label for="description" class="mb-2 block font-medium text-gray-700">Description</label>
					<textarea
						id="description"
						name="description"
						placeholder="Enter additional notes for the house"
						class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-hidden"
						bind:value={description}
					></textarea>
				</div>

				<!-- Submit Buttons -->
				<div class="flex justify-between md:col-span-2">
					<button
						type="button"
						class="rounded-sm bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
						onclick={() => (showHouseModal = false)}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded-sm bg-green-500 px-4 py-2 text-white hover:bg-green-600"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

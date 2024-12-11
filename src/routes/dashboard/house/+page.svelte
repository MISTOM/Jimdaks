<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';
	import SearchIcon from '$lib/components/SearchIcon.svelte';
	import { getToastState } from '$lib/Toast.svelte';
	import Header from '$lib/components/Header.svelte';

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

<!-- <Header /> -->
<!-- Houses page with Table Layout -->
<h1 class="mb-4 text-3xl font-light">Houses</h1>
<div class="p-6">
	<div class="mb-4 flex justify-between">
		<div class="relative flex items-center">
			<SearchIcon />
			<input
				type="text"
				placeholder="Search..."
				class="w-64 rounded border py-2 pl-10 pr-4"
				bind:value={searchTerm}
			/>
		</div>
		<button
			class="rounded bg-green-700 px-4 py-2 text-white transition-colors hover:bg-green-600"
			onclick={() => (showHouseModal = true)}
		>
			Add House
		</button>
	</div>

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
				{#each filteredHouses as house}
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
							<button
								class="rounded-md bg-red-500 px-3 py-1 text-white transition duration-200 hover:bg-red-600"
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
			class="w-full max-w-lg cursor-auto rounded bg-white p-6 shadow-lg"
			role="button"
			onkeydown={() => {}}
			tabindex="0"
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
						// console.log('add flock result ->  ', result);
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
						class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
						bind:value={name}
						required
					/>
				</div>

				<div>
					<label for="capacity" class="mb-2 block font-medium text-gray-700">Capacity</label>
					<input
						id="capacity"
						type="number"
						name="capacity"
						min="0"
						placeholder="Enter house capacity"
						class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
						bind:value={capacity}
						required
					/>
				</div>

				<!-- Notes -->
				<div class="md:col-span-2">
					<label for="description" class="mb-2 block font-medium text-gray-700">Description</label>
					<textarea
						id="description"
						name="description"
						placeholder="Enter additional notes for the house"
						class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
						bind:value={description}
					></textarea>
				</div>

				<!-- Submit Button -->
				<div class="flex justify-between md:col-span-2">
					<button
						type="button"
						class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
						onclick={() => (showHouseModal = false)}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

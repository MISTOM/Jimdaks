<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import SearchIcon from '$lib/components/SearchIcon.svelte';
	import { getToastState } from '$lib/Toast.svelte';
	import { fade, slide } from 'svelte/transition';

	const { data, form } = $props();

	const toast = getToastState();

	const flocks = $derived(data.flocks || []);
	const houses = $derived(data.houses || []);

	const formattedToday = new Date().toISOString().split('T')[0];

	let name = $state('');
	let startDate = $state(formattedToday);
	let birdAge = $state('');
	let breeder = $state('');
	let birdType = $state('BROILER');
	let numberOfBirds = $state();
	let notes = $state('');
	let houseId = $state('');
	let showLogModal = $state(false);
	let showFlockModal = $state(false);
	let searchTerm = $state('');

	// Set default log date to today
	let logDate = $state(formattedToday);
	let numberOfDeaths = $state('');
	let causeOfDeath = $state('');
	let logFlockId = $state();

	let formErrors = $state();

	// Filter flocks based on search term, either flockname or house name or breeder
	let filteredFlocks = $derived.by(() => {
		return flocks?.filter(
			(flock) =>
				flock.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				flock.house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				flock.breeder?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	const showLogForm = (flockId: number) => {
		formErrors = '';

		//reset log form fields
		logDate = new Date().toISOString().split('T')[0];
		numberOfDeaths = '';
		causeOfDeath = '';

		logFlockId = flockId;
		showLogModal = true;
	};

	// Delete flock
	const deleteFlock = (flockName: string | null, flockId: number) => async () => {
		if (!confirm(`Are you sure you want to delete ${flockName || 'this'} flock?`)) return;

		const response = await fetch(`/api/flock/${flockId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			invalidate('update:flocks');
			toast.add('Success', 'Flock deleted successfully', 'success');
		} else {
			const res = await response.json();
			console.log('Error deleting flock -> ', res);
			toast.add('Error', `${res.message || 'Error Deleteing Flock'}`, 'error');
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

<h1 class="mb-4 text-3xl font-light">Flocks</h1>
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
			onclick={() => (showFlockModal = true)}
		>
			Add Flock
		</button>
	</div>

	<!-- Data Table -->
	<div class="overflow-x-auto shadow-lg">
		<table class="w-full table-auto border-collapse rounded-lg bg-white shadow-md">
			<thead class="bg-gray-200">
				<tr>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Name</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Start Date</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Bird Age</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Breeder</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Bird Type</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Number of Birds</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Notes</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">House</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#if filteredFlocks.length === 0}
					<tr>
						<td class="border px-4 py-2 text-sm" colspan="9">No flocks found</td>
					</tr>
				{:else}
					{#each filteredFlocks as flock (flock.id)}
						<tr class="hover:bg-gray-100">
							<td class="border border-gray-300 px-4 py-2">{flock.name}</td>
							<td class="border border-gray-300 px-4 py-2">
								{new Date(flock.startDate).toLocaleDateString()}
							</td>
							<td class="border px-4 py-2 text-sm">{flock.birdAge}</td>
							<td class="border px-4 py-2 text-sm">{flock.breeder}</td>
							<td class="border px-4 py-2 text-sm">{flock.birdType}</td>
							<td class="border px-4 py-2 text-sm">{flock.numberOfBirds}</td>
							<td class="border px-4 py-2 text-sm">{flock.notes}</td>
							<td class="border px-4 py-2 text-sm">{flock.house.name}</td>
							<td class="border px-4 py-2 text-sm">
								<button
									class="mr-2 rounded bg-green-500 px-2 py-1 text-white shadow hover:bg-yellow-600"
									onclick={() => showLogForm(flock.id)}
								>
									Log
								</button>

								<button
									class="rounded bg-red-500 px-2 py-1 text-white shadow hover:bg-red-600"
									onclick={deleteFlock(flock.name, flock.id)}
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

	<!-- Modal for add flock-->
	{#if showFlockModal}
		<div
			class="fixed inset-0 z-50 flex cursor-auto items-center justify-center bg-gray-600 bg-opacity-50"
			role="button"
			tabindex="-1"
			onclick={() => (showFlockModal = false)}
			onkeydown={(e) => {
				e.key === 'Escape' && (showFlockModal = false);
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
				<h2 class="mb-6 text-2xl font-semibold text-green-600">New Flock</h2>
				{#if formErrors}
					{@render formError(formErrors)}
				{/if}
				<form
					class="grid grid-cols-1 gap-4 md:grid-cols-2"
					action="?/flock"
					method="POST"
					use:enhance={() => {
						formErrors = '';
						return async ({ result, update }) => {
							// console.log('add flock result ->  ', result);
							if (result.type === 'success') {
								showFlockModal = false;
								formErrors = '';
								await update();
								toast.add('Success', 'Flock added successfully', 'success');
							} else if (result.type === 'failure') {
								formErrors = result.data?.error ? result.data.error : 'Error saving flock';
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
							placeholder="Enter flock name"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={name}
						/>
					</div>
					<!-- Start Date -->
					<div>
						<label for="startDate" class="mb-2 block font-medium text-gray-700">Start Date</label>
						<input
							id="startDate"
							type="date"
							name="startDate"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={startDate}
							required
						/>
					</div>
					<!-- Bird Age -->
					<div>
						<label for="birdAge" class="mb-2 block font-medium text-gray-700">Bird Age</label>
						<input
							id="birdAge"
							type="number"
							name="birdAge"
							placeholder="Enter bird age in days"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={birdAge}
						/>
					</div>
					<!-- Breeder -->
					<div>
						<label for="breeder" class="mb-2 block font-medium text-gray-700">Breeder</label>
						<input
							id="breeder"
							type="text"
							name="breeder"
							placeholder="Enter breeder name"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={breeder}
						/>
					</div>
					<!-- Bird Type -->
					<div>
						<label for="birdType" class="mb-2 block font-medium text-gray-700">Bird Type</label>
						<select
							id="birdType"
							name="birdType"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={birdType}
						>
							<option value="BROILER">Broiler</option>
							<option value="LAYER">Layer</option>
						</select>
					</div>
					<!-- Number of Birds -->
					<div>
						<label for="numberOfBirds" class="mb-2 block font-medium text-gray-700"
							>Number of Birds</label
						>
						<input
							id="numberOfBirds"
							type="number"
							name="numberOfBirds"
							placeholder="Enter number of birds"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={numberOfBirds}
							required
						/>
					</div>
					<!-- Notes -->
					<div class="md:col-span-2">
						<label for="notes" class="mb-2 block font-medium text-gray-700">Notes</label>
						<textarea
							id="notes"
							name="notes"
							placeholder="Enter additional notes"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={notes}
						></textarea>
					</div>

					<!-- House -->
					<div class="md:col-span-2">
						<label for="houseId" class="mb-2 block font-medium text-gray-700">House</label>
						<select
							id="houseId"
							name="houseId"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={houseId}
						>
							<option value="" selected disabled>--Select House--</option>
							{#each houses as house}
								<option value={house.id}>{house.name}</option>
							{/each}
						</select>
					</div>

					<!-- Submit Button -->
					<div class="flex justify-between md:col-span-2">
						<button
							type="button"
							class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
							onclick={() => (showFlockModal = false)}
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

	<!-- Modal for mortality logs -->
	{#if showLogModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
			role="button"
			tabindex="-1"
			onclick={() => (showLogModal = false)}
			onkeydown={(e) => {
				e.key === 'Escape' && (showLogModal = false);
			}}
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 50 }}
		>
			<div
				class="w-full max-w-lg rounded bg-white p-6 shadow-lg"
				role="button"
				onkeydown={() => {}}
				tabindex="0"
				onclick={(e) => e.stopPropagation()}
			>
				<h2 class="mb-6 text-2xl font-bold text-green-600">Log Form</h2>
				{#if formErrors}
					{@render formError(formErrors)}
				{/if}
				<form
					class="grid grid-cols-1 gap-4 md:grid-cols-2"
					method="POST"
					action="?/mortalityLog"
					use:enhance={() => {
						formErrors = '';
						return async ({ result, update }) => {
							// console.log('add flock result ->  ', result);
							if (result.type === 'success') {
								showLogModal = false;
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
							bind:value={logDate}
						/>
					</div>
					<!-- LOG FORM -->
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
							bind:value={numberOfDeaths}
						/>
					</div>
					<!-- Cause of Death -->
					<div>
						<label for="causeOfDeath" class="mb-2 block font-medium text-gray-700"
							>Cause of Death</label
						>
						<input
							id="causeOfDeath"
							type="text"
							name="causeOfDeath"
							placeholder="Enter cause of death"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={causeOfDeath}
							required
						/>

						<input type="hidden" name="flockId" bind:value={logFlockId} />
					</div>
					<!-- Submit Button -->
					<div class="flex justify-between md:col-span-2">
						<button
							type="button"
							class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
							onclick={() => (showLogModal = false)}
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
</div>

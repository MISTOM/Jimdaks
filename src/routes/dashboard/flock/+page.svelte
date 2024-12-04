<script lang="ts">
	import { enhance } from '$app/forms';
	import Header from '$lib/components/Header.svelte';

	const { data, form } = $props();

	let flocks = $derived(data.flocks || []);
	let houses = $derived(data.houses || []);

	let name = $state('');
	let startDate = $state('');
	let birdAge = $state('');
	let breeder = $state('');
	let birdType = $state('BROILER');
	let numberOfBirds = $state();
	let notes = $state('');
	let houseId = $state('');
	let showModal = $state(false);
	let searchTerm = $state('');

	//!filter function to be done on backend
	let filteredFlocks = $derived(() =>
		flocks.filter((flock) =>
			flock.name ? flock.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
		)
	);
</script>

<!-- Display all flocks -->
<div class="flex flex-col md:flex-row md:space-x-8">
	<div class="w-full md:w-2/3">
		<h2 class="mb-4 text-2xl font-bold">Flocks</h2>
		{#if flocks.length === 0}
			<p class="text-xl text-gray-400">No flocks found</p>
		{/if}
		{#each flocks as flock}
			<div class="mb-4 rounded border p-4">
				<h3 class="text-xl font-semibold">{flock.name}</h3>
				<p>
					<span class="font-medium">Start Date:</span>
					{new Date(flock.startDate).toLocaleDateString()}
				</p>
				{#if flock.endDate}
					<p>
						<span class="font-medium">End Date:</span>
						{new Date(flock.endDate).toLocaleDateString()}
					</p>
				{/if}
				<p><span class="font-medium">Breeder:</span> {flock.breeder}</p>
				<p><span class="font-medium">Bird Type:</span> {flock.birdType}</p>
				<p><span class="font-medium">Number of Birds:</span> {flock.numberOfBirds}</p>
				<p><span class="font-medium">Initial chick age (in days)</span> {flock.birdAge}</p>
				<p><span class="font-medium">Notes:</span> {flock.notes}</p>
				<p><span class="font-medium">House:</span> {flock.house.name}</p>
				<p>
					<span class="font-medium">Current age of birds in days </span>
					{Math.floor(
						(new Date().getTime() - new Date(flock.startDate).getTime()) / (1000 * 60 * 60 * 24)
					) + flock.birdAge}
				</p>
			</div>
			<button class="">Log Mortality</button>
		{/each}
	</div>

	<!-- Modal for Add/Edit Form -->
	{#if showModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
			<div class="w-full max-w-lg rounded bg-white p-6 shadow-lg">
				<h2 class="mb-6 text-2xl font-bold text-green-600">Flock Form</h2>
				<form class="grid grid-cols-1 gap-4 md:grid-cols-2" method="POST" use:enhance>
					<!-- Name -->
					<div>
						<label for="name" class="mb-2 block font-medium text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							placeholder="Enter flock name"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={name}
							required
						/>
					</div>
					<!-- Start Date -->
					<div>
						<label for="startDate" class="mb-2 block font-medium text-gray-700">Start Date</label>
						<input
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
							type="number"
							name="birdAge"
							placeholder="Enter bird age"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={birdAge}
						/>
					</div>
					<!-- Breeder -->
					<div>
						<label for="breeder" class="mb-2 block font-medium text-gray-700">Breeder</label>
						<input
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
							name="birdType"
							id="birdType"
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
							name="houseId"
							class="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
							bind:value={houseId}
						>
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
							on:click={() => (showModal = false)}
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

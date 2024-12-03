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

	// Filtered flocks based on search term
	let filteredFlocks = $derived(() =>
		flocks.filter((flock) =>
			flock.name ? flock.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
		)
	);
</script>

<Header />

<div class="p-6">
	<!-- Add New Flock Button -->
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
		<!-- svelte-ignore event_directive_deprecated -->
		<button
			class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
			on:click={() => (showModal = true)}
		>
			Add Flock
		</button>
	</div>

	<!-- Data Table -->
	<div class="overflow-x-auto rounded-lg shadow-lg">
		<table class="w-full table-auto border-collapse rounded-lg bg-white shadow-md">
			<thead class="bg-green-100">
				<tr>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Name</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Start Date</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Bird Age</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Breeder</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Bird Type</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Number of Birds</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600"></th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">House</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each flocks as flock}
					<tr class="hover:bg-green-50">
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
							<!-- svelte-ignore event_directive_deprecated -->
							<button
								class="mr-2 rounded bg-yellow-500 px-2 py-1 text-white shadow hover:bg-yellow-600"
								on:click={() => editFlock(flock)}
							>
								Edit
							</button>
							<!-- svelte-ignore event_directive_deprecated -->
							<button
								class="rounded bg-red-500 px-2 py-1 text-white shadow hover:bg-red-600"
								on:click={() => deleteFlock(flock.id)}
							>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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

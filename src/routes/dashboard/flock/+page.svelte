<script lang="ts">
	import { enhance } from '$app/forms';

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
	let houseId = $state();

	// $inspect(flocks)
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
		{/each}
	</div>

	<!-- Add new flock -->
	<div class="w-full md:w-1/3">
		<h2 class="mb-4 text-2xl font-bold">Add New Flock</h2>
		{#if form?.error}
			<p class="text-red-600">{form.error}</p>
		{/if}
		<form class="space-y-4" method="POST" use:enhance>
			<div>
				<label for="name" class="block font-medium">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					bind:value={name}
					class="mt-1 block w-full rounded border p-2"
					required
				/>
			</div>
			<div>
				<label for="startDate" class="block font-medium">Start Date</label>
				<input
					type="date"
					id="startDate"
					name="startDate"
					bind:value={startDate}
					class="mt-1 block w-full rounded border p-2"
					required
				/>
			</div>
			<div>
				<label for="birdAge" class="block font-medium">Bird/Chick age</label>
				<input
					type="number"
					id="birdAge"
					name="birdAge"
					bind:value={birdAge}
					class="mt-1 block w-full rounded border p-1"
				/>
			</div>
			<div>
				<label for="breeder" class="block font-medium">Breeder</label>
				<input
					type="text"
					id="breeder"
					name="breeder"
					bind:value={breeder}
					class="mt-1 block w-full rounded border p-2"
				/>
			</div>
			<div>
				<label for="birdType" class="block font-medium">Bird Type</label>
				<select
					id="birdType"
					name="birdType"
					class="mt-1 block w-full rounded border p-2"
					bind:value={birdType}
				>
					<option value="BROILER">Broiler</option>
					<option value="LAYER">Layer</option>
				</select>
			</div>
			<div>
				<label for="numberOfBirds" class="block font-medium">Number of Birds</label>
				<input
					type="number"
					id="numberOfBirds"
					name="numberOfBirds"
					bind:value={numberOfBirds}
					class="mt-1 block w-full rounded border p-2"
					required
				/>
			</div>
			<div>
				<label for="notes" class="block font-medium">Notes</label>
				<textarea
					id="notes"
					name="notes"
					class="mt-1 block w-full rounded border p-2"
					bind:value={notes}
				></textarea>
			</div>
			<div>
				<label for="houseId" class="block font-medium">House</label>
				<select
					id="houseId"
					name="houseId"
					class="mt-1 block w-full rounded border p-2"
					bind:value={houseId}
					required
				>
					{#each houses as house}
						<option value={house.id}>{house.name}</option>
					{/each}
				</select>
			</div>
			<button type="submit" class="mt-4 rounded bg-blue-500 px-4 py-2 text-white">Add Flock</button>
		</form>
	</div>
</div>

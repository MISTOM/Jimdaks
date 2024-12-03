<script lang="ts">
	export let name: string;
	export let capacity: number;
	export let description: string | null;
	export let createdAt: string;
	export let updatedAt: string;
	export let flocks: { name: string; count: number }[];
</script>

<div class="rounded-lg border bg-white p-4 shadow">
	<h2 class="mb-2 text-xl font-bold">{name}</h2>
	<p class="mb-1 text-gray-600"><strong>Capacity:</strong> {capacity}</p>
	<p class="mb-1 text-gray-600">
		<strong>Description:</strong>
		{description || 'No description available'}
	</p>
	<p class="mb-1 text-gray-600">
		<strong>Created At:</strong>
		{new Date(createdAt).toLocaleDateString()}
	</p>
	<p class="mb-1 text-gray-600">
		<strong>Updated At:</strong>
		{new Date(updatedAt).toLocaleDateString()}
	</p>

	<div class="mt-4">
		<strong class="mb-2 block">Flocks:</strong>
		{#if flocks.length > 0}
			<ul class="list-inside list-disc text-gray-700">
				{#each flocks as flock}
					<li>{flock.name}: {flock.count}</li>
				{/each}
			</ul>
		{:else}
			<p class="text-gray-500">No flocks available</p>
		{/if}
	</div>

	<!-- View Details Button -->
</div>

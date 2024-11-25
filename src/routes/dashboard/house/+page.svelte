<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const houses = $derived(data?.houses || []);
</script>

<!-- Houses page -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	{#if houses.length === 0}
		<p class="text-gray-600">No houses found.</p>
	{:else}
		{#each houses as house}
			<div class="space-y-2 rounded-lg border p-4 shadow">
				<h2 class="text-xl font-bold">{house.name}</h2>
				<p class="">Capacity: {house.capacity}</p>
				{#if house.description}
					<p class="">{house.description}</p>
				{/if}
				<p>Current flock: <span class="rounded-full bg-green-400 px-2 text-xs">Flock A</span></p>
			</div>
		{/each}
	{/if}
</div>

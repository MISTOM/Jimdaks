<script lang="ts">
	let { data } = $props();
	const flocks = $derived(data.flocks || []);
</script>

<h1 class="mb-4 text-2xl font-bold">Mortality Overview</h1>

<ul class="space-y-2">
	{#if flocks.length === 0}
		<p class="text-center text-gray-400">No flocks found</p>
	{:else}
		{#each data.flocks as flock}
			<li>
				<a href="/dashboard/mortality/{flock.id}" class="hover:underline">
					{flock.name || 'Unnamed Flock'} - Total Mortality: {flock.totalMortality}
				</a>
			</li>
		{/each}
	{/if}
</ul>

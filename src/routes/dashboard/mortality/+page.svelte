<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	let { data } = $props();
	const flocks = $derived(data.flocks || []);
</script>

<Header />
<div class="p-6">
	<h1 class="mb-4 text-2xl font-bold">Mortality Overview</h1>

	<ul class="space-y-4 rounded-lg bg-gray-100 p-4 shadow-md">
		{#if flocks.length === 0}
			<p class="text-center text-gray-400">No flocks found</p>
		{:else}
			{#each data.flocks as flock}
				<li class="pop-in flex items-center justify-between rounded-lg bg-white p-4 shadow">
					<span class="text-black-500">
						{flock.name || 'Unnamed Flock'} - Total Mortality: {flock.totalMortality}
					</span>
					<a
						href="/dashboard/mortality/{flock.id}"
						class="flex items-center text-green-700 hover:text-green-700"
					>
						<span class="mr-1">View</span>
						<i class="fas fa-arrow-right"></i>
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</div>

<style>
	.pop-in {
		transition:
			transform 0.2s ease-in-out,
			color 0.2s ease-in-out;
	}
	.pop-in:hover {
		transform: scale(1.05);
	}
</style>

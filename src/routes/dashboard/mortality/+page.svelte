<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	let { data } = $props();
	const flocks = $derived(data.flocks || []);
</script>

<!-- <Header /> -->

<div class="p-6">
	<h1 class=" text-2xl font-light text-gray-800 transition duration-300 hover:text-black">
		Mortality Overview
	</h1>
	<ul class="space-y-4 rounded-lg bg-gray-100 p-4 shadow-md">
		{#if flocks.length === 0}
			<p class="text-center text-gray-400">No flocks found</p>
		{:else}
			{#each data.flocks as flock}
				<li class="pop-in flex items-center justify-between rounded-lg bg-white p-4 shadow">
					<span class="text-black-500">
						{flock.name || 'Unnamed Flock'} - Total Mortality: {flock.totalMortality}
					</span>
					<button
						class="rounded bg-green-700 px-3 py-1 text-white hover:bg-green-600"
						onclick={() => (window.location.href = `/dashboard/mortality/${flock.id}`)}
					>
						View
					</button>
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

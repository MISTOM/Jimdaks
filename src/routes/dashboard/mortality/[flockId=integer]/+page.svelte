<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	let { data } = $props();
	const flock = $derived(data.flock);
</script>

<!-- <Header /> -->
<div class="p-6">
	{#if !flock}
		<p class="text-center text-gray-700">No Flock Found</p>
	{:else}
		<h1 class="mb-4 text-2xl font-bold">
			Mortality Logs for {flock.name || 'Unnamed Flock'}
		</h1>

		<table class="w-full table-auto border-collapse rounded-lg bg-white shadow-md">
			<thead class="bg-gray-200">
				<tr>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Date</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Number of Deaths</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Cause of Death</th>
					<th class="border px-4 py-2 text-left text-sm text-gray-600">Logged By</th>
				</tr>
			</thead>
			<tbody>
				{#if flock.Mortality.length === 0}
					<tr>
						<td class="border px-4 py-2 text-center text-sm text-gray-700" colspan="4">
							No Mortality Logs Found
						</td>
					</tr>
				{:else}
					{#each flock.Mortality as record}
						<tr class="border-b hover:bg-gray-100">
							<td class="border px-4 py-2 text-sm">
								{new Date(record.createdAt).toLocaleDateString()}
							</td>
							<td class="border px-4 py-2 text-sm">{record.number}</td>
							<td class="border px-4 py-2 text-sm">{record.causeOfDeath}</td>
							<td class="border px-4 py-2 text-sm">{record.loggedBy.name}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	{/if}
</div>

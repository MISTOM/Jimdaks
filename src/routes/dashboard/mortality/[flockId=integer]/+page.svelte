<script lang="ts">
	let { data } = $props();
	const flock = $derived(data.flock);
</script>

{#if !flock}
	<p class="text-center text-gray-700">No Flock Found</p>
{:else}
	<h1 class="mb-4 text-2xl font-bold">
		Mortality Logs for {flock.name || 'Unnamed Flock'}
	</h1>

	<table class="min-w-full border">
		<thead>
			<tr class="bg-gray-100">
				<th class="border px-4 py-2">Date</th>
				<th class="border px-4 py-2">Number of Deaths</th>
				<th class="border px-4 py-2">Cause of Death</th>
				<th class="border px-4 py-2">Logged By</th>
			</tr>
		</thead>
		<tbody>
			{#if flock.Mortality.length === 0}
				<tr>
					<td class="border px-4 py-2 text-center text-sm text-gray-700" colspan="4"
						>No Mortality Logs Found</td
					>
				</tr>
			{:else}
				{#each flock.Mortality as record}
					<tr class="hover:bg-gray-50">
						<td class="border px-4 py-2">
							{new Date(record.createdAt).toLocaleDateString()}
						</td>
						<td class="border px-4 py-2">{record.number}</td>
						<td class="border px-4 py-2">{record.causeOfDeath}</td>
						<td class="border px-4 py-2">{record.loggedBy.name}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
{/if}

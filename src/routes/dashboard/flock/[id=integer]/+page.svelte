<script lang="ts">
	const { data } = $props();
	const flock = $derived(data?.flock);
</script>

<!-- Flock Details -->

{#if !flock}
	<p>Flock not found</p>
{:else}
	<main class="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
		<div class="rounded-md shadow-md">
			<div class="border-b border-gray-200 p-4">
				<h2 class="text-xl text-lime-700">{flock.name}</h2>
				<p>{flock.numberOfBirds}</p>
			</div>
			<div>
				<p>{flock.notes}</p>
			</div>
		</div>
	</main>
{/if}

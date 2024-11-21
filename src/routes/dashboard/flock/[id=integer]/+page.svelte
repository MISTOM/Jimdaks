<script lang="ts">
	const { data } = $props();
	const flock = $derived(data?.flock);
</script>

<h1 class="text-2xl text-lime-700">Flock {flock?.name} Details</h1>
<p>Details for lot {flock?.birdType}</p>

<h4 class="text-3xl">Expenses</h4>
<p>{flock?.expenses.toLocaleString()}</p>

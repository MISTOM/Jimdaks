<script lang="ts">

	const {data} = $props();

	let flocks = $derived(data.flocks || [])
	$inspect(flocks)


</script>

<h1 class="text-2xl text-lime-700">Flocks</h1>
<pre>{flocks.toLocaleString()}</pre>


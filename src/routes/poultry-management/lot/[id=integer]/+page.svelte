<script lang="ts">
	//get route parameters
	import { page } from '$app/stores';
	console.log($page);
	const id = $page.params.id;
</script>

<h1 class="text-2xl text-lime-700">Lot Details</h1>
<p>Details for lot {id}</p>

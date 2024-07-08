<script>
	import { setStateContext } from '$lib/state.svelte';
	import '../app.css';
	let { children } = $props();
	$effect(() => {
		setStateContext();
	});
</script>

{@render children()}

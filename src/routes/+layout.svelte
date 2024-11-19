<script>
	import Toaster from '$lib/components/Toaster.svelte';
	import { setToastState } from '$lib/Toast.svelte';
	import '../app.css';
	let { children } = $props();

	setToastState();
</script>

<noscript>Please Enable Javascript for this app to run</noscript>
<Toaster />
{@render children?.()}
<footer></footer>

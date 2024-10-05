<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<!-- watches the current light/dark mode -->
<ModeWatcher />
{@render children()}

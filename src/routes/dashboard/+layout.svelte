<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';

	const { children, data } = $props();
	const user = $derived(data.user);
</script>

<div class="flex min-h-screen">
	<Sidebar {user} />

	<div class="flex-1 p-6">
		{@render children?.()}
	</div>
</div>

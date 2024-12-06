<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';

	const { children, data } = $props();
	const user = $derived(data.user);
</script>

<div class="flex min-h-screen">
	<!-- Sidebar container, flex will make it grow with the content -->
	<Sidebar {user} class="flex-shrink-0" />

	<!-- Main content area -->
	<div class="flex-1 p-6">
		{@render children?.()}
	</div>
</div>

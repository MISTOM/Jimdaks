<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	const { children, data } = $props();
	const user = $derived(data.user);
</script>

<div class="flex min-h-screen">
	<Sidebar {user} />

	<div class="flex-1 p-6">
		<Header />
		{@render children?.()}
	</div>
</div>

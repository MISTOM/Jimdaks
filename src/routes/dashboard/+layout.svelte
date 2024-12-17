<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	const { children, data } = $props();
	const user = $derived(data.user);

	let isSidebarVisible = false;

	const toggleSidebar = () => {
		isSidebarVisible = !isSidebarVisible;
	};
</script>

<div class="flex min-h-screen">
	<!-- Sidebar -->

	<div
		class={`fixed z-50 flex min-h-screen w-64 transform bg-green-800 text-white transition-transform duration-300 ease-in-out ${
			isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
		} md:relative md:w-auto md:translate-x-0`}
	>
		<Sidebar {user} />
	</div>

	<!-- Overlay for Mobile -->
	<div
		class={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
			isSidebarVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
		} md:hidden`}
		onclick={toggleSidebar}
		onkeydown={(e) => e.key === 'Enter' && toggleSidebar()}
		role="button"
		tabindex="0"
	></div>

	<!-- Main Content -->
	<div class="flex-1 p-6">
		<!-- Header with Toggle Button -->
		<Header />
		<div class="flex items-center justify-between">
			<!-- <Header /> -->
			<!-- <button class="text-green-800 md:hidden" onclick={toggleSidebar} aria-label="Toggle Sidebar">
				<i class="fas fa-bars"></i>
			</button> -->
		</div>

		{@render children?.()}
	</div>
</div>

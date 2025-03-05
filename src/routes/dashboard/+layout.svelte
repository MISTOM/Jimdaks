<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { slide } from 'svelte/transition';

	const { children, data } = $props();
	const user = $derived(data.user);

	let innerWidth = $state(0);
	let isSidebarVisible = $state(false);

	let isMobile = $derived.by(() => {
		return innerWidth < 768;
	});

	const toggleSideBar = () => {
		isSidebarVisible = !isSidebarVisible;
	};
</script>

<svelte:window bind:innerWidth />

<div class="flex min-h-screen">
	<!-- Sidebar -->

	<!-- <div
		class={`fixed z-50 flex min-h-screen w-64 transform bg-green-800 text-white transition-transform duration-300 ease-in-out ${
			isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
		} md:relative md:w-auto md:translate-x-0`}
	>
		<Sidebar {user} />
	</div> -->

	{#if !isMobile}
		<!-- Desktop Sidebar: Always visible on large screens -->
		<Sidebar {user} />
	{/if}

	<!-- Mobile Sidebar -->
	{#if isMobile && isSidebarVisible}
		<div class="fixed inset-0 z-50 flex">
			<!-- Sidebar content -->
			<div in:slide={{ axis: 'x' }} out:slide={{ axis: 'x', duration: 150 }}>
				<Sidebar {user} />
			</div>
			<!-- Overlay -->
			<div
				class="flex-1 bg-black bg-opacity-30 backdrop-blur-xs"
				onclick={toggleSideBar}
				onkeydown={(e) => e.key === 'Enter' && toggleSideBar()}
				role="button"
				tabindex="0"
			></div>
		</div>
	{/if}

	<!-- Main Content -->
	<div class="flex-1 p-6">
		<Header {toggleSideBar} />
		{@render children?.()}
	</div>
</div>

<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Block from '$lib/components/Block.svelte';
	import { selections } from '$lib/selections';

	let profile = { name: 'nasinza', role: 'Admin' };

	let houses = [
		{
			name: 'House A',
			capacity: 100,
			description: 'This is the first house.',
			createdAt: '2024-01-01',
			updatedAt: '2024-11-01',
			flocks: [
				{ name: 'Chickens', count: 50 },
				{ name: 'Turkeys', count: 70 }
			]
		},
		{
			name: 'House B',
			capacity: 150,
			description: null,
			createdAt: '2024-02-01',
			updatedAt: '2024-11-02',
			flocks: [
				{ name: 'Chickens', count: 50 },
				{ name: 'Ducks', count: 30 }
			]
		},
		{
			name: 'House C',
			capacity: 200,
			description: 'This is the third house.',
			createdAt: '2024-03-01',
			updatedAt: '2024-11-03',
			flocks: [
				{ name: 'Chickens', count: 50 },
				{ name: 'Ducks', count: 30 }
			]
		}
	];

	// Reactive variable for dark mode
	let isDarkMode = false;

	// Apply theme based on user selection
	const toggleTheme = () => {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	// On mount, apply saved theme
	import { onMount } from 'svelte';
	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		if (savedTheme === 'dark') {
			isDarkMode = true;
			document.documentElement.classList.add('dark');
		}
	});
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<Sidebar {selections} {profile} />

	<!-- Main Content -->ss
	<div class="flex-1 bg-gray-100 p-6">
		<!-- Theme Toggle Button at the top-right corner -->
		<div class="absolute right-4 top-4">
			<button
				class="rounded border px-4 py-2 text-sm font-semibold transition duration-300"
				on:click={toggleTheme}
			>
				{isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
			</button>
		</div>

		<h1 class="mb-6 text-3xl font-bold">Dashboard</h1>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each houses as house}
				<Block
					name={house.name}
					capacity={house.capacity}
					description={house.description}
					createdAt={house.createdAt}
					updatedAt={house.updatedAt}
					flocks={house.flocks}
				/>
			{/each}
		</div>
	</div>
</div>

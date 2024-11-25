<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Block from '$lib/components/Block.svelte';

	let selections = [
		{ name: 'Chicks', dropdown: ['Item 1', 'Item 2'] },
		{ name: 'Profile', dropdown: ['Edit', 'Settings'] },
		{ name: 'Monthly Stats', dropdown: ['Report 1', 'Report 2'] }
	];

	let profile = { name: 'John Doe', role: 'Admin' };

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
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<Sidebar {selections} {profile} />

	<!-- Main Content -->
	<div class="flex-1 bg-gray-100 p-6">
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

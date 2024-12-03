<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Block from '$lib/components/Block.svelte';
	import { toggleTheme, applySavedTheme, isDarkMode } from '$lib/utils/theme';

	type Profile = { name: string; role: string };
	let profile: Profile = { name: 'nasinza', role: 'Admin' };

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
		}
		// Other houses...
	];

	onMount(() => applySavedTheme());
</script>

<div class="flex h-screen">
	<Sidebar {profile} />

	<div class="flex-1 p-6">
		<div class="absolute right-4 top-4">
			<button class="rounded border px-4 py-2 text-sm font-semibold" on:click={toggleTheme}>
				{#if $isDarkMode}
					🌙 Dark Mode
				{:else}
					☀️ Light Mode
				{/if}
			</button>
		</div>

		<h1 class="mb-6 text-3xl font-bold">Dashboard</h1>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each houses as house}
				<div class="space-y-2 rounded-lg border p-4 shadow">
					<Block
						name={house.name}
						capacity={house.capacity}
						description={house.description}
						createdAt={house.createdAt}
						updatedAt={house.updatedAt}
						flocks={house.flocks}
					/>
					<a
						href={`/dashboard/house`}
						class="block w-full rounded bg-blue-500 px-4 py-2 text-center hover:bg-blue-600"
					>
						View Details
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>

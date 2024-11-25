<script lang="ts">
	export let selections = [
		{ name: 'Chicks', dropdown: ['Item 1', 'Item 2'] },
		{ name: 'Profile', dropdown: ['Edit', 'Settings'] },
		{ name: 'Analytics', dropdown: ['Report 1', 'Report 2'] }
	];
	export let profile = { name: 'John Doe', role: 'Admin' };
</script>

<div class="flex h-screen w-64 flex-col justify-between bg-gray-800 text-white">
	<div>
		<h1 class="p-4 text-3xl font-bold">JIMDAKS</h1>
		<ul class="p-4">
			{#each selections as selection}
				<li class="mb-4">
					<details>
						<summary class="cursor-pointer">{selection.name}</summary>
						<ul class="mt-2 pl-4">
							{#each selection.dropdown as item}
								<li class="text-sm">{item}</li>
							{/each}
						</ul>
					</details>
				</li>
			{/each}
		</ul>
	</div>
	<div class="p-4">
		<img src="/placeholder-profile.png" alt="Profile" class="mx-auto mb-2 h-16 w-16 rounded-full" />
		<p class="text-center font-semibold">{profile.name}</p>
		<p class="text-center text-sm">{profile.role}</p>
	</div>
</div>

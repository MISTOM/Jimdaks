<script lang="ts">
	import { selections } from '$lib/utils/selections';

	export let profile = { name: 'John Doe', role: 'Admin' };
	let isImageExpanded = false;
	const toggleImageSize = () => {
		isImageExpanded = !isImageExpanded;
	};
</script>

<div class="flex h-screen w-64 flex-col justify-between bg-gray-800 text-white">
	<!-- Sidebar Header -->
	<div>
		<h1 class="p-4 text-3xl font-bold">JIMDAKS</h1>

		<!-- Navigation Menu -->
		<ul class="p-4">
			{#each selections as selection}
				<li class="mb-4">
					<details>
						<summary class="flex cursor-pointer items-center">
							<span class="mr-2">{@html selection.icon}</span>
							{selection.name}
						</summary>
						<ul class="mt-2 pl-4">
							{#each selection.dropdown ?? [] as item}
								<li class="text-sm">{item}</li>
							{/each}
						</ul>
					</details>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Profile Section -->
	<div class="flex items-center p-4">
		<button
			class={`cursor-pointer overflow-hidden rounded-full border-2 border-gray-600 transition-all duration-300 ${
				isImageExpanded ? 'h-32 w-32' : 'h-12 w-12'
			}`}
			on:click={toggleImageSize}
		>
			<img src="/chicks.jpg" alt="Profile" class="h-full w-full object-cover" />
		</button>

		<div class="ml-4 text-left">
			<p class="font-semibold">{profile.name}</p>
			<p class="text-sm text-gray-400">{profile.role}</p>
		</div>
	</div>
</div>

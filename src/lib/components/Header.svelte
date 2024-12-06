<script lang="ts">
	import { selections } from '$lib/utils/selections';

	export let profile = { name: 'John Doe', role: 'Admin' };
	let isImageExpanded = false;
	const toggleImageSize = () => {
		isImageExpanded = !isImageExpanded;
	};
</script>

<header class="flex items-center justify-between bg-white p-4 shadow-md">
	<!-- Profile Section (Left side) -->
	<div class="flex items-center">
		<button
			class="cursor-pointer overflow-hidden rounded-full border-2 border-green-500 transition-all duration-300"
			onclick={toggleImageSize}
		>
			<img
				src="/chicks.jpg"
				alt="Profile"
				class={`h-12 w-12 object-cover ${isImageExpanded ? 'h-32 w-32' : ''}`}
			/>
		</button>

		<div class="ml-4 text-left">
			<p class="font-semibold text-green-600">{profile.name}</p>
			<p class="text-sm text-gray-400">{profile.role}</p>
		</div>
	</div>

	<div>
		<a href="#" class="text-lg font-medium text-green-500 hover:text-green-700">Logout</a>
	</div>
</header>

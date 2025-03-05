<script lang="ts">
	const { user } = $props();

	let isImageExpanded = $state(false);
	const toggleImageSize = () => {
		isImageExpanded = !isImageExpanded;
	};
</script>

<div class="w-50 flex min-h-screen flex-col bg-green-800 text-white">
	<!-- Sidebar Header -->
	<div class="p-4">
		<h1 class="text-3xl font-bold"><a href="/dashboard/">JIMDAKS</a></h1>
	</div>

	<!-- Navigation Menu -->
	<ul class="flex-1 space-y-4 overflow-auto p-4">
		<li class="mb-4">
			<a
				href="/dashboard/house"
				class="flex w-full cursor-pointer items-center rounded-sm p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-home"></i></span>
				House
			</a>
		</li>

		<li class="mb-4">
			<a
				href="/dashboard/flock"
				class="flex w-full cursor-pointer items-center rounded-sm p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-dove"></i></span>
				Flock
			</a>
		</li>
		<li class="mb-4">
			<a
				href="/dashboard/inventory"
				class="flex w-full cursor-pointer items-center rounded-sm p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-boxes"></i></span>
				Inventory
			</a>
		</li>
		<li class="mb-4">
			<a
				href="/dashboard/mortality"
				class="flex w-full cursor-pointer items-center rounded-sm p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-skull-crossbones"></i></span>
				Mortality
			</a>
		</li>

		<li class="mb-4">
			<a
				href="/dashboard/vaccine"
				class="hover:bg-opacity-50x flex w-full cursor-pointer items-center rounded-sm p-2 hover:bg-gray-50 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-syringe"></i></span>
				Vaccination
			</a>
		</li>
	</ul>

	<div class="border-t border-gray-400"></div>
	<!-- Profile Section at the bottom -->
	<div class="mt-auto flex items-center p-4">
		<button
			class={`cursor-pointer overflow-hidden rounded-full border-2 border-gray-600 transition-all duration-300 ${
				isImageExpanded ? 'h-32 w-32' : 'h-12 w-12'
			}`}
			onclick={toggleImageSize}
		>
			<img src="/chicks.jpg" alt="Profile" class="h-full w-full object-cover" />
		</button>

		<div class="ml-4 text-left">
			<p class="text-sm font-normal">{user.name}</p>
			<p class="text-sm font-normal">{user.email}</p>
		</div>
	</div>
</div>

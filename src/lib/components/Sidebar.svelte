<script lang="ts">
	const { user } = $props();

	let isImageExpanded = false;
	let isSidebarVisible = true;

	const toggleImageSize = () => {
		isImageExpanded = !isImageExpanded;
	};

	const toggleSidebar = () => {
		isSidebarVisible = !isSidebarVisible;
	};
</script>

<div class="flex min-h-screen w-full flex-col bg-green-800 text-white md:w-48">
	<!-- Sidebar Header -->
	<div class="flex items-center justify-between p-4">
		<h1 class="text-3xl font-bold"><a href="/dashboard/">JIMDAKS</a></h1>
		<button class="text-white md:hidden" onclick={toggleSidebar} aria-label="Toggle Sidebar">
			<i class="fas fa-bars"></i>
		</button>
	</div>

	<!-- Navigation Menu -->
	<ul class="flex-1 space-y-4 overflow-auto p-4">
		<li>
			<a
				href="/dashboard/flock"
				class="flex w-full items-center rounded p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-dove"></i></span>
				Flock
			</a>
		</li>
		<li>
			<a
				href="/dashboard/house"
				class="flex w-full items-center rounded p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-home"></i></span>
				House
			</a>
		</li>
		<li>
			<a
				href="/dashboard/inventory"
				class="flex w-full items-center rounded p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-boxes"></i></span>
				Inventory
			</a>
		</li>
		<li>
			<a
				href="/dashboard/mortality"
				class="flex w-full items-center rounded p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-skull-crossbones"></i></span>
				Mortality
			</a>
		</li>
		<li>
			<a
				href="/dashboard/users"
				class="flex w-full items-center rounded p-2 hover:bg-gray-200 hover:bg-opacity-50"
			>
				<span class="mr-2"><i class="fas fa-users"></i></span>
				Users
			</a>
		</li>
	</ul>

	<div class="border-t border-gray-400"></div>

	<!-- Profile Section -->
	<div class="mt-4 flex items-center p-4">
		<button
			class={`cursor-pointer overflow-hidden rounded-full border-2 border-gray-600 transition-all duration-300 ${
				isImageExpanded ? 'h-32 w-32' : 'h-12 w-12'
			}`}
			onclick={toggleImageSize}
		>
			<img src="/chicks.jpg" alt="Profile" class="h-full w-full object-cover" />
		</button>

		<div class="ml-4 text-left">
			<p class="font-semibold">{user?.name}</p>
		</div>
	</div>
</div>

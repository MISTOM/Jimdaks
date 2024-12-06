<script lang="ts">
	const { user } = $props();

	let isImageExpanded = $state(false);
	const toggleImageSize = () => {
		isImageExpanded = !isImageExpanded;
	};
</script>

<div class="flex min-h-screen w-64 flex-col bg-gray-800 text-white">
	<!-- Sidebar Header -->
	<div class="p-4">
		<h1 class="text-3xl font-bold"><a href="/dashboard/">JIMDAKS</a></h1>
	</div>

	<!-- Navigation Menu -->
	<ul class="flex-1 space-y-4 overflow-auto p-4">
		<li class="mb-4">
			<details>
				<summary class="flex cursor-pointer items-center">
					<span class="mr-2"></span>
					<a href="/dashboard/flock">Flock</a>
				</summary>
				<ul class="mt-2 pl-4"></ul>
			</details>
			<details>
				<summary class="flex cursor-pointer items-center">
					<span class="mr-2"></span>
					<a href="/dashboard/house">House</a>
				</summary>
				<ul class="mt-2 pl-4"></ul>
			</details>
			<details>
				<summary class="flex cursor-pointer items-center">
					<span class="mr-2"></span>
					<a href="/dashboard/inventory">Inventory</a>
				</summary>
				<ul class="mt-2 pl-4"></ul>
			</details>
			<details>
				<summary class="flex cursor-pointer items-center">
					<span class="mr-2"></span>
					<a href="/dashboard/users">Users</a>
				</summary>
				<ul class="mt-2 pl-4"></ul>
			</details>
		</li>
	</ul>

	<!-- Profile Section at the bottom -->
	<div class="mt-auto flex items-center p-4">
		<button
			class={`cursor-pointer overflow-hidden rounded-full border-2 border-gray-600 transition-all duration-300 ${
				isImageExpanded ? 'h-32 w-32' : 'h-12 w-12'
			}`}
			on:click={toggleImageSize}
		>
			<img src="/chicks.jpg" alt="Profile" class="h-full w-full object-cover" />
		</button>

		<div class="ml-4 text-left">
			<p class="font-semibold">{user.name}</p>
			<p class="text-sm text-gray-400">{user.email}</p>
		</div>
	</div>
</div>

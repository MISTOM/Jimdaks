<script lang="ts">
	const { user } = $props();

	let isImageExpanded = $state(false);
	const toggleImageSize = () => {
		isImageExpanded = !isImageExpanded;
	};
</script>

<div class="flex h-screen w-64 flex-col justify-between bg-gray-800 text-white">
	<!-- Sidebar Header -->
	<div>
		<h1 class="p-4 text-3xl font-bold"><a href="/dashboard/">JIMDAKS</a></h1>

		<!-- Navigation Menu -->
		<ul class="p-4">
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
	</div>

	<!-- Profile Section -->
	<div class="flex items-center p-4">
		<button
			class={`cursor-pointer overflow-hidden rounded-full border-2 border-gray-600 transition-all duration-300 ${
				isImageExpanded ? 'h-32 w-32' : 'h-12 w-12'
			}`}
			onclick={toggleImageSize}
		>
			<img src="/chicks.jpg" alt="Profile" class="h-full w-full object-cover" />
		</button>

		<div class="ml-4 text-left">
			<p class="font-semibold">{user.name}</p>
			<p class="text-sm text-gray-400">{user.email}</p>
		</div>
	</div>
</div>

<script lang="ts">
	import { goto } from '$app/navigation';

	const { toggleSideBar } = $props();

	const handleLogout = async () => {
		const response = await fetch('/api/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) {
			console.error('Failed to log out');
		}

		console.log(await response.json());
		await goto('/', { invalidateAll: true });
	};
</script>

<header class="flex items-center justify-between bg-white p-4 shadow-md">
	<!-- Left Section -->
	<div class="flex items-center">
		<!-- Toggle Button for Mobile -->
		<button
			class="mr-4 text-green-800 md:hidden"
			onclick={toggleSideBar}
			aria-label="Toggle Sidebar"
		>
			<i class="fas fa-bars"></i>
		</button>
		<a
			href="/dashboard"
			class="flex items-center text-lg font-medium text-gray-500 hover:text-gray-700"
		>
			<i class="fas fa-home mr-2 text-green-700"></i> Dashboard
		</a>
	</div>

	<!-- Right Section -->
	<div>
		<button
			onclick={handleLogout}
			class="flex items-center text-lg font-medium text-gray-500 hover:text-gray-700"
		>
			<i class="fas fa-sign-out-alt mr-2 text-green-700"></i> Logout
		</button>
	</div>
</header>

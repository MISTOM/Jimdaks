<script lang="ts">
	import { goto } from '$app/navigation';

	let isMobile = false;

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
	<!-- Left Section (Home Button) -->
	<div class="flex items-center">
		<a href="/" class="flex items-center text-lg font-medium text-gray-500 hover:text-gray-700">
			<i class="fas fa-home mr-2 text-green-700"></i> Home
		</a>
	</div>

	<!-- Right Section (Logout and Dashboard) -->
	<div class="flex items-center space-x-4">
		<!-- Logout Button -->
		<button
			onclick={handleLogout}
			class="flex items-center text-lg font-medium text-gray-500 hover:text-gray-700 md:ml-auto"
		>
			<i class="fas fa-sign-out-alt mr-2 text-green-700"></i> Logout
		</button>

		<!-- Dashboard Button (Visible only on mobile) -->
		<button
			class="text-green-800 md:hidden"
			onclick={() => console.log('Dashboard toggled')}
			aria-label="Toggle Sidebar"
		>
			<i class="fas fa-bars"></i>
		</button>
	</div>
</header>

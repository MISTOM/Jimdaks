<script lang="ts">
	import { goto } from '$app/navigation';

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
	<!-- Profile Section (Left side) -->

	<div>
		<a href="/" class="flex items-center text-lg font-medium text-gray-500 hover:text-gray-700">
			<i class="fas fa-home mr-2 text-green-700"></i> Home
		</a>
	</div>
	<div>
		<!-- Profile Section (Right side) -->

		<button
			onclick={handleLogout}
			class="flex items-center text-lg font-medium text-gray-500 hover:text-gray-700"
		>
			<i class="fas fa-sign-out-alt mr-2 text-green-700"></i> Logout
		</button>
	</div>
</header>

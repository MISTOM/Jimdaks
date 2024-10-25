<script lang="ts">
	import { enhance } from '$app/forms';

	let email = $state('');
	let password = $state('');
</script>

<div class="grid grid-cols-2 sm:grid-cols-1">
	<img src="/chicksSunset.jpg" alt="Chicks cover" class="object-cover" />
	<div class="my-auto p-4 sm:mx-auto">
		<form method="post" use:enhance>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					name="password"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div class="mb-4">
				<button
					type="submit"
					class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Login</button
				>
			</div>
		</form>
	</div>
</div>

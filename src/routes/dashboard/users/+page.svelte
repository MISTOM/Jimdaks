<script lang="ts">
	import { getToastState } from '$lib/Toast.svelte';

	const { data, form } = $props();

	const toast = getToastState();

	// Derived data
	const user = $derived(data.user || {});
	const flocks = $derived(data.flocks || []);
	const feedUsage = $derived(data.feedUsage || []);
</script>

<!-- Page Content -->
<div class="p-6">
	<h1 class="text-2xl font-light text-gray-800 transition duration-300 hover:text-black">
		User Profile
	</h1>

	<!-- User Details -->
	<div class="mt-4 space-y-4 rounded-lg p-4 shadow-md">
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold text-gray-800">{user.name}'s Profile</h2>
			<p class="text-gray-600"><strong>Email:</strong> {user.email}</p>
			<p class="text-gray-600"><strong>Role:</strong> {user.role.name}</p>
			<p class="text-gray-600">
				<strong>Joined:</strong>
				{new Date(user.createdAt).toLocaleDateString()}
			</p>
		</div>

		<!-- Flocks Section -->
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h3 class="mb-4 text-lg font-semibold text-gray-800">Flocks</h3>
			{#if flocks.length > 0}
				<ul class="list-inside list-disc text-gray-700">
					{#each flocks as flock}
						<li>
							<strong>{flock.name}:</strong>
							{flock.birdType} - {flock.numberOfBirds} birds started on {new Date(
								flock.startDate
							).toLocaleDateString()}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-gray-600">No flocks associated.</p>
			{/if}
		</div>

		<!-- Feed Usage Section -->
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h3 class="mb-4 text-lg font-semibold text-gray-800">Feed Usage</h3>
			{#if feedUsage.length > 0}
				<table class="w-full border-collapse">
					<thead>
						<tr class="bg-gray-200">
							<th class="border px-4 py-2 text-left text-sm text-gray-600">Date</th>
							<th class="border px-4 py-2 text-left text-sm text-gray-600">Feed Type</th>
							<th class="border px-4 py-2 text-left text-sm text-gray-600">Quantity (kg)</th>
						</tr>
					</thead>
					<tbody>
						{#each feedUsage as usage}
							<tr class="hover:bg-gray-100">
								<td class="border px-4 py-2 text-sm">{new Date(usage.date).toLocaleDateString()}</td
								>
								<td class="border px-4 py-2 text-sm">{usage.feedType}</td>
								<td class="border px-4 py-2 text-sm">{usage.quantity.toFixed(2)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p class="text-gray-600">No recent feed usage logged.</p>
			{/if}
		</div>
	</div>
</div>

<script lang="ts">
	import { getToastState } from '$lib/Toast.svelte';
	import {
		faEnvelope,
		faUser,
		faCalendarAlt,
		faFeatherAlt,
		faSeedling
	} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	// const { data, form } = $props();

	export let data: { user: any };
	const toast = getToastState();

	// Derived data
	const user = data.user;
	const flocks = user.flock || [];
	const feedUsage = user.feedUsage || [];

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(date);
	}
</script>

<!-- Page Content -->
<div class="p-6">
	<h1 class=" text-2xl font-light text-gray-800 transition duration-300 hover:text-black">
		User Profile
	</h1>

	<!-- User Details -->
	<div class="mt-4 space-y-4 rounded-lg p-4 shadow-md">
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 flex items-center space-x-2 text-xl font-semibold text-gray-800">
				<FontAwesomeIcon icon={faUser} class="text-green-600" />
				{user.name}'s Profile
			</h2>

			<div class="space-y-2">
				<p class="flex items-center text-gray-600">
					<FontAwesomeIcon icon={faEnvelope} class="mr-2 text-green-600" />
					<strong>Email:</strong>
					<span class="ml-2">{user.email}</span>
				</p>

				<p class="flex items-center text-gray-600">
					<FontAwesomeIcon icon={faUser} class="mr-2 text-green-600" />
					<strong>Role:</strong>
					<span class="ml-2">{user.role.name}</span>
				</p>
				<p class="flex items-center text-gray-600">
					<FontAwesomeIcon icon={faCalendarAlt} class="mr-2 text-green-600" />
					<strong>Joined:</strong>
					<span class="ml-2">{formatDate(new Date(user.createdAt))}</span>
				</p>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h3 class="mb-4 flex items-center text-lg font-semibold text-gray-800">
				<FontAwesomeIcon icon={faFeatherAlt} class="mr-2 text-green-600" />
				Flocks
			</h3>
			{#if flocks.length > 0}
				<ul class="list-inside list-disc text-gray-700">
					{#each flocks as flock}
						<li>
							<strong>{flock.name}:</strong>
							{flock.birdType} - {flock.numberOfBirds} birds started on {formatDate(
								new Date(flock.startDate)
							)}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-gray-600">No flocks associated.</p>
			{/if}
		</div>

		<!-- Feed Usage Section -->
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h3 class="mb-4 flex items-center text-lg font-semibold text-gray-800">
				<FontAwesomeIcon icon={faSeedling} class="mr-2 text-green-600" />
				Feed Usage
			</h3>
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

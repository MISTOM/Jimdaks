<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	// Example: Adapt based on your project setup

	let userId = 1; // Assume a logged-in user ID
	let user: any = null;
</script>

<Header />

<div class="p-6">
	<div class="profile-container">
		{#if user}
			<!-- Profile Header -->
			<div class="profile-header">
				<img
					src="https://via.placeholder.com/150"
					alt="{user.name}'s Profile Picture"
					class="profile-picture"
				/>
				<div class="profile-details">
					<h2>{user.name}</h2>
					<p><strong>Email:</strong> {user.email}</p>
					<p><strong>Role:</strong> {user.role.name}</p>
					<p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
				</div>
			</div>

			<!-- User Flocks Section -->
			<div class="profile-section">
				<h3>Flocks</h3>
				{#if user.flock.length > 0}
					<ul>
						{#each user.flock as flock}
							<li>
								<strong>{flock.name}:</strong>
								{flock.birdType} - {flock.numberOfBirds} birds started on{' '}
								{new Date(flock.startDate).toLocaleDateString()}
							</li>
						{/each}
					</ul>
				{:else}
					<p>No flocks associated.</p>
				{/if}
			</div>

			<!-- Feed Usage Section -->
			<div class="profile-section">
				<h3>Recent Feed Usage</h3>
				{#if user.feedUsage.length > 0}
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Feed Type</th>
								<th>Quantity (kg)</th>
							</tr>
						</thead>
						<tbody>
							{#each user.feedUsage as usage}
								<tr>
									<td>{new Date(usage.date).toLocaleDateString()}</td>
									<td>{usage.feedType}</td>
									<td>{usage.quantity.toFixed(2)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p>No recent feed usage logged.</p>
				{/if}
			</div>

			<!-- Weight Logs Section -->
			<div class="profile-section">
				<h3>Weight Logs</h3>
				<p>Total Weight Logs Recorded: {user.weightLog.length}</p>
			</div>
		{:else}
			<p>Loading user data...</p>
		{/if}
	</div>
</div>

<style>
	.profile-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	.profile-header {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
	.profile-picture {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		margin-right: 20px;
		border: 2px solid #ddd;
	}
	.profile-details h2 {
		margin: 0;
		color: #333;
	}
	.profile-details p {
		color: #555;
		margin: 5px 0;
	}
	.profile-section {
		margin-top: 20px;
	}
	.profile-section h3 {
		margin-bottom: 10px;
		color: #444;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 10px;
	}
	th,
	td {
		padding: 8px 12px;
		text-align: left;
		border: 1px solid #ddd;
	}
	th {
		background: #f5f5f5;
	}
</style>

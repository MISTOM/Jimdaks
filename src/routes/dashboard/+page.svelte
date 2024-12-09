<script lang="ts">
	import {
		Chart as ChartJS,
		CategoryScale,
		LinearScale,
		BarElement,
		LineElement,
		PointElement,
		Tooltip,
		Legend
	} from 'chart.js';
	// Register Chart.js components
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		LineElement,
		PointElement,
		Tooltip,
		Legend
	);
	// Placeholder summary data
	let summary = {
		totalUsers: 5,
		totalFlocks: 12,
		totalFeedUsed: 1500,
		totalExpenses: 4500,
		totalMortality: 32
	};
</script>

<div class="min-h-screen bg-gray-100 p-8">
	<h1 class="mb-6 text-4xl font-bold">Dashboard</h1>
	<!-- Summary Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div class="card">
			<h2 class="text-xl font-semibold">Active Flocks</h2>
			<p class="text-4xl font-bold text-green-600">{summary.totalFlocks}</p>
		</div>
		<div class="card">
			<h2 class="text-xl font-semibold">Total Feed Used</h2>
			<p class="text-4xl font-bold text-purple-600">{summary.totalFeedUsed} kg</p>
		</div>
		<div class="card">
			<h2 class="text-xl font-semibold">Total Expenses</h2>
			<p class="text-4xl font-bold text-red-600">${summary.totalExpenses.toFixed(2)}</p>
		</div>
		<div class="card">
			<h2 class="text-xl font-semibold">Total Mortality</h2>
			<p class="text-4xl font-bold text-gray-600">{summary.totalMortality} birds</p>
		</div>
	</div>
	<!-- Charts Section -->
	<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Bar Chart: Expenses by Category -->
		<div class="card">
			<canvas id="barChart" height="200"></canvas>
		</div>
		<!-- Line Chart: Monthly Mortality -->
		<div class="card">
			<canvas id="lineChart" height="200"></canvas>
		</div>
	</div>
</div>

<style>
	.card {
		@apply flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg;
	}
</style>

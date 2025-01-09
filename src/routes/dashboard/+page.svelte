<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		Chart as ChartJS,
		CategoryScale,
		LinearScale,
		BarElement,
		LineElement,
		PointElement,
		Tooltip,
		Legend,
		BarController,
		LineController
	} from 'chart.js';

	// Register Chart.js components
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		LineElement,
		PointElement,
		Tooltip,
		Legend,
		BarController,
		LineController
	);

	// Placeholder summary data
	let summary = {
		totalUsers: 5,
		totalFlocks: 12,
		totalFeedUsed: 1500,
		totalExpenses: 4500,
		totalMortality: 32
	};

	// Chart data
	let barChartData = {
		labels: ['Feed', 'Medicine', 'Utilities', 'Labor'],
		datasets: [
			{
				label: 'Expenses ($)',
				data: [1000, 700, 1200, 600],
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1
			}
		]
	};

	let lineChartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Mortality (birds)',
				data: [5, 7, 4, 6, 10, 0],
				borderColor: 'rgba(255, 99, 132, 1)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				borderWidth: 1,
				fill: true
			}
		]
	};

	function renderBarChart() {
		const ctx = document.getElementById('barChart') as HTMLCanvasElement;
		new ChartJS(ctx, {
			type: 'bar',
			data: barChartData,
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: true
					}
				}
			}
		});
	}

	function renderLineChart() {
		const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
		new ChartJS(ctx, {
			type: 'line',
			data: lineChartData,
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: true
					}
				}
			}
		});
	}

	onMount(() => {
		renderBarChart();
		renderLineChart();
	});
</script>

<div class="p-6">
	<h1 class="mb-6 text-3xl font-bold">Overview</h1>
	<!-- Summary Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div
			class="card border-gray-150 rounded-lg border p-4 shadow-sm transition-transform ease-in-out hover:scale-105"
		>
			<h2 class="mb-4 text-sm font-semibold text-gray-600">Active Flocks</h2>
			<p class="text-3xl font-bold text-black">
				{summary.totalFlocks} <span class="text-sm text-red-400">Flocks</span>
			</p>
		</div>
		<div
			class="card border-gray-150 rounded-lg border p-4 shadow-sm transition-transform ease-in-out hover:scale-105"
		>
			<h2 class="text-sm font-semibold text-gray-600">Total Feed Used</h2>
			<p class="text-3xl font-bold text-black">
				{summary.totalFeedUsed} <span class="text-sm text-red-400">Kg</span>
			</p>
		</div>
		<div
			class="card border-gray-150 rounded-lg border p-4 shadow-sm transition-transform ease-in-out hover:scale-105"
		>
			<h2 class="text-sm font-semibold text-gray-600">Total Expenses</h2>
			<p class="text-3xl font-bold text-black">
				{summary.totalExpenses.toFixed(2)} <span class="text-sm text-red-400">$</span>
			</p>
		</div>
		<div
			class="card border-gray-150 rounded-lg border p-4 shadow-sm transition-transform ease-in-out hover:scale-105"
		>
			<h2 class="text-sm font-semibold text-gray-600">Total Mortality</h2>
			<p class="text-3xl font-bold text-black">
				{summary.totalMortality} <span class="text-sm text-red-400">Birds</span>
			</p>
		</div>
	</div>

	<!-- Charts Section -->
	<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Bar Chart: Expenses by Category -->
		<div
			class="card border-gray-150 rounded-lg border p-4 shadow-sm transition-transform ease-in-out hover:scale-105"
		>
			<canvas id="barChart" height="200"></canvas>
		</div>
		<!-- Line Chart: Monthly Mortality -->
		<div
			class="card border-gray-150 rounded-lg border p-4 shadow-sm transition-transform ease-in-out hover:scale-105"
		>
			<canvas id="lineChart" height="200"></canvas>
		</div>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 0.5rem;
		background-color: white;
		padding: 1.5rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>

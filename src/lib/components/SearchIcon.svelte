<script lang="ts">
	const { size = 5 } = $props();
</script>

<svg
	class="absolute left-3 h-{size} w-{size} text-gray-500"
	fill="currentColor"
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
		clip-rule="evenodd"
	></path>
</svg>

<!-- <svg
	xmlns="http://www.w3.org/2000/svg"
	class="h-{size} w-{size} absolute align-middle"
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
	/>
</svg> -->

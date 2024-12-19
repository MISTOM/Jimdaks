<script lang="ts">
	import { fade } from 'svelte/transition';

	let { show = $bindable(), title, children } = $props();

	const close = () => (show = false);
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && close()} />

{#if show}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
		aria-modal="true"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
	>
		<div
			class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-all"
			aria-hidden="true"
			onclick={close}
		></div>

		<div
			class="relative z-50 w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-semibold">{title}</h2>
				<button class="text-gray-400 hover:text-gray-500" aria-label="Close Button" onclick={close}>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="mt-2">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

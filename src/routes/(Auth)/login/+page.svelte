<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	import { fade } from 'svelte/transition';

	const { form } = $props();

	let formErrors = $state();
	let email = $state(form?.data?.email);
	let password = $state('');
	let passwordVisible = $state(false);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex min-h-screen">
	<div class="h-screen w-1/2" style="background-color: #f0f0f0; overflow: hidden;">
		<img src="/chicks.jpg" alt="Chicks" class="h-full w-full object-cover" />
	</div>

	<div class="flex w-1/2 items-center justify-center bg-gray-100 lg:bg-contain">
		<div class="w-2/3 min-w-72 rounded-md bg-white p-8 shadow-lg">
			<h2 class="text-center text-2xl font-bold">Login</h2>
			<form
				class="mt-4"
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						console.log('form result ->  ', result);
						if (result.type === 'redirect') {
							await goto(result.location, { invalidateAll: true });
						} else if (result.type === 'failure') {
							password = '';
							formErrors = result?.data?.errors ? result.data.errors : 'Error logging in';
						}
					};
				}}
			>
				{#if formErrors}
					<span class="text-sm text-red-600" in:fade={{ duration: 150 }}> {formErrors}</span>
				{/if}
				<div class="mb-4">
					<label for="email" class="block text-sm font-semibold">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						class="w-full rounded-md border p-2"
						bind:value={email}
						oninput={() => (formErrors ? (formErrors = '') : null)}
						required
					/>
				</div>
				<div class="group relative mb-4">
					<label for="password" class="block text-sm font-semibold">Password</label>
					<input
						type={passwordVisible ? 'text' : 'password'}
						id="password"
						name="password"
						class="w-full rounded-md border p-2"
						bind:value={password}
						oninput={() => (formErrors ? (formErrors = '') : null)}
						required
					/>
					<button
						type="button"
						class="absolute top-8 right-3 hidden text-xs text-gray-400 group-hover:flex"
						onmousedown={() => (passwordVisible = true)}
						onmouseup={() => (passwordVisible = false)}
						onmouseleave={() => (passwordVisible = false)}
						tabindex="-1"
					>
						{passwordVisible ? 'Hide' : 'Show'}
					</button>
				</div>
				<button
					type="submit"
					class="w-full rounded-md border bg-green-700 p-2 text-white transition-colors hover:bg-green-500"
					>Login</button
				>
				<div class="mt-3 flex justify-between">
					<a href="/register" class="hover:text-secondary text-xs transition-colors">Sign Up</a>
					<a href="/forgotPassword" class="text-xs transition-colors hover:underline"
						>Forgot Password?</a
					>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
</style>

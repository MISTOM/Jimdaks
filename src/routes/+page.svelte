<script>
	const { data } = $props();
</script>

<svelte:head>
	<title>Home</title>
	<link rel="preload" href="/layerChicken.jpg" as="image" />
</svelte:head>

<main class="dark font-sans text-gray-800">
	<header class="sticky top-0 bg-black p-4 font-extralight text-white shadow-sm">
		<nav class="container sticky mx-auto grid grid-cols-2">
			<ul class="flex space-x-4">
				<li><a href="/poultry" class="transition-colors hover:text-green-700">Poultry</a></li>
				<li><a href="#financial-services" class="hover:underline">Financial Services</a></li>
				<li><a href="#e-services" class="hover:underline">E-services</a></li>
				<li><a href="#cafe" class="transition-all hover:underline">Café</a></li>
				<li><a href="#general-shop" class="hover:underline">General Shop</a></li>
			</ul>
			<!-- <Button variant="outline" on:click={toggleMode}>Toggle Theme</Button> -->

			{#if data.user}
				<div class="text-right"><a href="/dashboard" class="hover:underline">Dashboard</a></div>
			{:else}
				<div class="text-right font-thin">
					<a href="/login">Login</a>
				</div>
			{/if}
		</nav>
	</header>

	<section
		id="hero"
		class="h-screen bg-cover bg-center text-center text-white"
		style="background-image: url('/layerChicken.jpg');"
	>
		<div class="flex h-full flex-col items-center justify-center bg-opacity-50">
			<h1
				class="duration-400 mb-4 text-6xl font-bold text-green-950 opacity-70 transition-opacity hover:opacity-100"
			>
				Jimdaks Farm Fresh
			</h1>
			<p class="mb-3 text-2xl">From farm to fork</p>
			<div>
				<button class="rounded-md bg-black px-3 py-2 text-white"> Shop now </button>
			</div>
		</div>
	</section>

	<section id="quick-links" class="py-16 text-center">
		<h2 class="mb-8 text-3xl font-bold">Our Services</h2>
		<div class="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
			<div class="service">
				<img src="" alt="Poultry" class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover" />
				<a href="#poultry" class="text-xl font-semibold text-green-900">Poultry</a>
				<p>
					We're focused on delivering high quality chicken meat. With over <strong>2 Decades</strong
					> of rearing, farming and supplying chicken meat to butcheries, hotels, hospitals and locals
					with high customer satisfaction.
				</p>
			</div>
			<div class="service">
				<img
					src=""
					alt="Financial Services"
					class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover"
				/>
				<a href="#financial-services" class="text-xl font-semibold text-green-900"
					>Financial Services</a
				>
				<p>
					Visit out outlet to access various financial services and back agents: M-pesa, KCB Mtaani,
					National Bank, Equity, Pesa Pap, Family Bank
				</p>
			</div>
			<div class="service">
				<img src="" alt="E-services" class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover" />
				<a href="#e-services" class="text-xl font-semibold text-green-900">E-services</a>
				<p>
					In addition to photocopy/printing/scanning services, we also offer digital services, kra
					filing, and website design and development
				</p>
			</div>
			<div class="service">
				<img src="" alt="Café" class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover" />
				<a href="#cafe" class="text-xl font-semibold text-green-900">Café</a>
				<p>Our cafe is a place where you can enjoy our delicious beverages and drinks,</p>
			</div>
			<div class="service">
				<img src="" alt="General Shop" class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover" />
				<a href="#general-shop" class="text-xl font-semibold text-green-900">General Shop</a>
				<p>Visit our outlet to shop for your daily need or a tasty chicken.</p>
			</div>
		</div>
	</section>

	<section id="featured-products" class="bg-gray-100 py-16">
		<h2 class="mb-8 text-center text-3xl font-bold">Featured Products</h2>
		<div class="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
			<div class="product text-center">
				<img
					src=""
					alt="Chicken Product 1"
					class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover"
				/>
				<p class="text-xl font-semibold">High-quality broiler chicken meat</p>
				<p class="text-lg text-gray-600">Price: Ksh 600</p>
			</div>
			<div class="product text-center">
				<img
					src=""
					alt="Chicken Product 2"
					class="mx-auto mb-4 h-48 w-48 rounded-lg object-cover"
				/>
				<p class="text-xl font-semibold">High-quality Kienyeji chicken meat</p>
				<p class="text-lg text-gray-600">Price: Ksh 1200</p>
			</div>
		</div>
	</section>

	<section id="about-us" class="py-16">
		<h2 class="mb-8 text-center text-3xl font-bold">About Us</h2>
		<p class="mx-auto mb-4 max-w-2xl text-center">
			Jimdaks Farm Fresh is a well-established farm and company based in Kenya...
		</p>
		<div class="text-center">
			<a href="/about-us" class="rounded bg-yellow-300 px-6 py-2 text-green-900">Learn more</a>
		</div>
	</section>

	<section id="testimonials" class="bg-gray-100 py-16">
		<h2 class="mb-8 text-center text-3xl font-bold">Testimonials</h2>
		<div class="mx-auto max-w-2xl text-center">
			<p class="mb-4 text-lg italic">"Great quality and service!" - Jane Doe</p>
			<p class="text-lg italic">"Trusted supplier for years." - John Smith</p>
		</div>
	</section>

	<footer class="bg-green-900 py-6 text-white">
		<div class="container mx-auto text-center">
			<p>&copy; 2024 Jimdaks Farm Fresh</p>
			<div class="my-4">
				<a href="https://www.facebook.com/jimdaksfarm" class="mx-2 text-yellow-300">Facebook</a>
				<a href="https://www.twitter.com/jimdaksfarm" class="mx-2 text-yellow-300">Twitter</a>
				<a href="https://www.instagram.com/jimdaksfarm" class="mx-2 text-yellow-300">Instagram</a>
			</div>
			<form class="inline-block">
				<label for="newsletter" class="mb-2 block">Sign up for our newsletter:</label>
				<input
					type="email"
					id="newsletter"
					name="newsletter"
					class="rounded border border-gray-300 p-2"
					placeholder="Email"
				/>
				<button type="submit" class="ml-2 rounded bg-yellow-300 px-4 py-2 text-green-900"
					>Subscribe</button
				>
			</form>
		</div>
	</footer>
</main>

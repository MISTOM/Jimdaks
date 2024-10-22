<script>
	import Button from '$lib/components/ui/button/button.svelte';
	//import { toggleMode } from 'mode-watcher';
</script>

<main class="font-sans text-gray-800 dark">
	<header class="bg-green-900 text-white py-4">
		<nav class="container mx-auto grid grid-cols-2 sticky">
			<ul class="flex space-x-4">
				<li><a href="/poultry" class="hover:underline">Poultry</a></li>
				<li><a href="#financial-services" class="hover:underline">Financial Services</a></li>
				<li><a href="#e-services" class="hover:underline">E-services</a></li>
				<li><a href="#cafe" class="hover:underline transition-all">Café</a></li>
				<li><a href="#general-shop" class="hover:underline">General Shop</a></li>
			</ul>
			<!-- <Button variant="outline" on:click={toggleMode}>Toggle Theme</Button> -->
		</nav>
	</header>

	<section
		id="hero"
		class="bg-cover bg-center h-screen text-center text-white"
		style="background-image: url('/chicken.webp');"
	>
		<div class="flex flex-col items-center justify-center h-full bg-opacity-50">
			<h1 class="text-5xl font-bold mb-4">JTF</h1>
			<p class="text-2xl mb-3">From farm to fork</p>
			<div>
				<Button variant="outline" href="/">Shop Now</Button>
				<Button variant="outline">Learn More</Button>
			</div>
		</div>
	</section>

	<section id="quick-links" class="py-16 text-center">
		<h2 class="text-3xl font-bold mb-8">Our Services</h2>
		<div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			<div class="service">
				<img
					src="/chicken.webp"
					alt="Poultry"
					class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg"
				/>
				<a href="#poultry" class="text-xl font-semibold text-green-900">Poultry</a>
				<p>
					We're focused on delivering high quality chicken meat. With over <strong>2 Decades</strong
					> of rearing, farming and supplying chicken meat to butcheries, hotels, hospitals and locals
					with high customer satisfaction.
				</p>
			</div>
			<div class="service">
				<img
					src="financial-services.jpg"
					alt="Financial Services"
					class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg"
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
				<img
					src="e-services.jpg"
					alt="E-services"
					class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg"
				/>
				<a href="#e-services" class="text-xl font-semibold text-green-900">E-services</a>
				<p>
					In addition to photocopy/printing/scanning services, we also offer digital services, kra
					filing, and website design and development
				</p>
			</div>
			<div class="service">
				<img src="cafe.jpg" alt="Café" class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg" />
				<a href="#cafe" class="text-xl font-semibold text-green-900">Café</a>
				<p>Our cafe is a place where you can enjoy our delicious beverages and drinks,</p>
			</div>
			<div class="service">
				<img
					src="general-shop.jpg"
					alt="General Shop"
					class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg"
				/>
				<a href="#general-shop" class="text-xl font-semibold text-green-900">General Shop</a>
				<p>Visit our outlet to shop for your daily need or a tasty chicken.</p>
			</div>
		</div>
	</section>

	<section id="featured-products" class="py-16 bg-gray-100">
		<h2 class="text-3xl font-bold text-center mb-8">Featured Products</h2>
		<div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			<div class="product text-center">
				<img
					src="chicken1.jpg"
					alt="Chicken Product 1"
					class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg"
				/>
				<p class="text-xl font-semibold">High-quality broiler chicken meat</p>
				<p class="text-lg text-gray-600">Price: Ksh 600</p>
			</div>
			<div class="product text-center">
				<img
					src="chicken2.jpg"
					alt="Chicken Product 2"
					class="mx-auto mb-4 w-48 h-48 object-cover rounded-lg"
				/>
				<p class="text-xl font-semibold">High-quality Kienyeji chicken meat</p>
				<p class="text-lg text-gray-600">Price: Ksh 1200</p>
			</div>
		</div>
	</section>

	<section id="about-us" class="py-16">
		<h2 class="text-3xl font-bold text-center mb-8">About Us</h2>
		<p class="text-center max-w-2xl mx-auto mb-4">
			Jimdaks Farm Fresh is a well-established farm and company based in Kenya...
		</p>
		<div class="text-center">
			<a href="/about-us" class="bg-yellow-300 text-green-900 py-2 px-6 rounded">Learn more</a>
		</div>
	</section>

	<section id="testimonials" class="py-16 bg-gray-100">
		<h2 class="text-3xl font-bold text-center mb-8">Testimonials</h2>
		<div class="text-center max-w-2xl mx-auto">
			<p class="text-lg italic mb-4">"Great quality and service!" - Jane Doe</p>
			<p class="text-lg italic">"Trusted supplier for years." - John Smith</p>
		</div>
	</section>

	<footer class="bg-green-900 text-white py-6">
		<div class="container mx-auto text-center">
			<p>&copy; 2024 Jimdaks Farm Fresh</p>
			<div class="my-4">
				<a href="https://www.facebook.com/jimdaksfarm" class="text-yellow-300 mx-2">Facebook</a>
				<a href="https://www.twitter.com/jimdaksfarm" class="text-yellow-300 mx-2">Twitter</a>
				<a href="https://www.instagram.com/jimdaksfarm" class="text-yellow-300 mx-2">Instagram</a>
			</div>
			<form class="inline-block">
				<label for="newsletter" class="block mb-2">Sign up for our newsletter:</label>
				<input
					type="email"
					id="newsletter"
					name="newsletter"
					class="p-2 rounded border border-gray-300"
					placeholder="Email"
				/>
				<button type="submit" class="bg-yellow-300 text-green-900 py-2 px-4 rounded ml-2"
					>Subscribe</button
				>
			</form>
		</div>
	</footer>
</main>

<script>
   // add variables here 

//How it works
    let currentImage = 0;
  
    const images = [
      '/iphone-step-1.png',
      '/iphone-step-2.png',
      '/iphone-step-3.png'
    ];
  
    function next() {
      currentImage = (currentImage + 1) % images.length;
    }
  
    function prev() {
      currentImage = (currentImage - 1 + images.length) % images.length;
    }

    let currentStep = 0;


	const steps = [
		{
			title: 'Choose your role',
			description:
				'Start by selecting whether you’re a tenant or a landlord — Rentrr is built for both.',
			image: '/iphone-step-1.png'
		},
		{
			title: 'Create your profile or listing',
			description:
				'Tenants build verified profiles. Landlords list their properties. Our platform starts matching right away.',
			image: '/iphone-step-2.png'
		},
		{
			title: 'Get matched and book a viewing',
			description:
				'Review your top matches and schedule a viewing directly through the app — simple, fast, and fair.',
			image: '/iphone-step-3.png'
		}
	];
    
// FAQ Section
    let faqs = [
		{
			question: 'Is Rentrr free to use?',
			answer:
				'Yes! Rentrr is free for tenants to create a profile and browse listings. Landlords can list properties and access basic matching features for free, with optional upgrades for advanced insights or priority visibility.',
			open: true
		},
		{
			question: 'How is Rentrr different from platforms like OpenRent or SpareRoom?',
			answer:
				'Most rental platforms are heavily landlord-focused, which results in landlords receiving too many inquiries from unsuitable tenants. Rentrr is tenant-verified, offers profile-driven visibility, and gives landlords smart matching — reducing noise and improving fit for both sides.',
			open: true
		},
		{
			question: 'How does the smart-matching algorithm work?',
			answer:
				'Rentrr uses AI to analyze tenant and landlord preferences, lifestyle compatibility, and location to generate a match score and surface the most relevant connections.',
			open: false
		},
		{
			question: 'What do tenants need to include in their profiles?',
			answer:
				'Employment details, rental history, lifestyle preferences, references, and a short personal bio — verified for landlords to trust.',
			open: false
		},
		{
			question: 'What are the benefits of tenants creating profiles?',
			answer:
				'They stand out in searches, get matched more quickly, and build trust with landlords through verified information.',
			open: false
		},
		{
			question: 'Is Rentrr available in my city/area?',
			answer:
				'We’re launching in major UK cities first, starting with London, and expanding soon!',
			open: false
		}
	];

	const toggle = (index) => {
	faqs = faqs.map((faq, i) => {
		if (i === index) {
			faq.open = !faq.open; // Toggle just this one
		}
		return faq;
	});
};
</script>

<main>

<!--- Hero Section -->
<section class="hero-section text-center py-24 px-6">
    <h1 class="text-[80px] md:text-[64px] font-bold">
        Standout Profiles <br />
        Verified Tenants
    </h1>

    <p class="text-[16px] md:text-[16px] mt-4">
        A two-way rental marketplace where tenants build trusted profiles and landlords list quality properties.
    </p>

    <a href="#waitlist">
        <button
            class="bg-[#FF5A3D] text-white px-20 py-3 rounded-full border-2 border-transparent 
                hover:bg-transparent hover:text-[#FF5A3D] hover:border-[#FF5A3D] transition duration-300">
            Join Waitlist
        </button>
    </a>

    <img
        src="/images/hero-iphone.png"
        alt="iPhone displaying tenant profiles"
        class="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow-lg">
</section>

<!-- Feature section-->
    <section class="bg-[FEF8EE] px-6 py-20 mt-12">
        <!-- Headline-->
        <h2 class="text-4xl text-left font-bold">Smarter tools, <br /> Better renting</h2>
        <p class="text-2xl text-right max-w-xl mx-auto mb-12">
            Rentrr helps landlords list with confidence and gives tenants the tools to stand out — for better matches on both sides.
        </p>
        
        <!-- FEATURE GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-6xl mx-auto">
            
        <!-- CARD 1 -->
        <div class="lg:w-[534px]
                    md:w-[358.5px] 
                    max-w-[351px]
                    w-full
                    h-auto
                    rounded-2xl 
                    bg-gradient-to-b from-[#FEE4CB] to-[#FDA546] 
                    p-6 text-left">
            <img src="/feature-listing.png" alt="Listings" class="mb-4 rounded-lg" />
            <h3 class="text-[20px] text-left font-bold mb-2">Find local listings</h3>
            <p class="text-[16px] text-left mb-4">
            Search and match with rental properties in your preferred area — based on your lifestyle, budget, and move-in needs.
            </p>
        </div>
        
        <!-- CARD 2 -->
        <div class="lg:w-[534px]
                    md:w-[358.5px] 
                    max-w-[351px]
                    w-full
                    h-auto
                    rounded-2xl 
                    bg-gradient-to-b from-[#FEE4CB] to-[#FDA546] 
                    p-6 text-left">
            <img src="/feature-community.png" alt="Community" class="mb-4 rounded-lg" />
            <h3 class="text-[20px] text-left font-bold mb-2">Rental community</h3>
            <p class="text-[16px] text-left mb-4">
            Join a community where both landlords and tenants are supported. Tenants have greater visibility and landlords have access to higher-quality matches.
            </p>
        </div>
        
        <!-- CARD 3 -->
        <div class="lg:w-[534px]
                    md:w-[358.5px] 
                    max-w-[351px]
                    w-full
                    h-auto
                    rounded-2xl 
                    bg-gradient-to-b from-[#FEE4CB] to-[#FDA546] 
                    p-6 text-left">
            <img src="/feature-algorithm.png" alt="Matching algorithm" class="mb-4 rounded-lg" />
            <h3 class="text-[20px] text-left font-bold mb-2">Smart-matching algorithm</h3>
            <p class="text-[16px] text-left mb-4">
            Our AI-powered algorithm matches landlords and tenants faster, using data like location, lifestyle preferences, and amenities to generate real-time match scores.
            </p>
        </div>
        
        <!-- CARD 4 -->
        <div class="lg:w-[534px]
                    md:w-[358.5px] 
                    max-w-[351px]
                    w-full
                    h-auto
                    rounded-2xl 
                    bg-gradient-to-b from-[#FEE4CB] to-[#FDA546] 
                    p-6 text-left">
            <img src="/feature-iphone.png" alt="iPhone App" class="mb-4 rounded-lg" />
            <h3 class="text-[20px] text-left font-bold mb-2">Landlords listing with viewing analytics</h3>
            <p class="text-[16px] text-left mb-4">
            Landlords can easily list their properties and are provided with real-time insights to understand what’s working and attract more interest.
            </p>
        </div>

    </div>
</section>

<!--How it works section -->

<section class="bg-gradient-to-b from-[#FF715B] to-[#FFF8F1] px-6 py-24">
	<!-- Section Heading -->
	<div class="max-w-7xl mx-auto mb-12 text-left">
		<h2 class="text-4xl font-bold text-[#3D0000]">How it works</h2>
	</div>

	<!-- Main Layout: Steps left, images right -->
	<div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
		<!-- LEFT: Steps List -->
		<div class="w-full flex flex-col gap-6">
			{#each steps as step, i}
				<div
					on:click={() => (currentStep = i)}
					class="cursor-pointer w-full max-w-full sm:max-w-[90%] md:max-w-[550px] mx-auto rounded-xl p-6 transition
						{currentStep === i
							? 'bg-[#FFF0DD] shadow-lg'
							: 'bg-white shadow-sm hover:shadow-md'}">
					<h3 class="font-semibold text-[#3D0000] text-lg mb-1">{step.title}</h3>
					<p class="text-sm text-[#5a2c2c] leading-snug">{step.description}</p>
				</div>
			{/each}
		</div>

		<!-- RIGHT: Angled iPhone Stack -->
		<div class="w-full flex justify-center min-h-[480px] relative">
			<!-- Step 1 Image (visible on step 0 only) -->
			{#if currentStep <= 0}
				<img
					src="/iphone-step-1.png"
					alt="Step 1"
					class="absolute w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] z-30 rotate-[-5deg] -translate-x-8 transition-opacity duration-500 opacity-100"
				/>
			{/if}

			<!-- Step 2 Image (visible on step 0 and 1) -->
			{#if currentStep <= 1}
				<img
					src="/iphone-step-2.png"
					alt="Step 2"
					class="absolute w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] z-20 rotate-[-2deg] -translate-x-2 transition-opacity duration-500 opacity-100"
				/>
			{/if}

			<!-- Step 3 Image (always shown) -->
			<img
				src="/iphone-step-3.png"
				alt="Step 3"
				class="absolute w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%] z-10 rotate-[3deg] translate-x-2 transition-opacity duration-500 opacity-100"
			/>
		</div>
	</div>
</section>


  

<!-- FAQ-->
 <section class="text-center">
  <h1 class="leading-[48px] text-[80px] md:text-[64px] font-bold py-24 px-6">
    Frequently Asked Questions <br />
    If you can't find what you are looking for don't hesitate to contact us.
  </h1>

  {#each faqs as faq, i}
		<div class="border-t border-red-200 py-6">
			<div
				class="flex justify-between items-start cursor-pointer"
				on:click={() => toggle(i)}
			>
				<h3 class="text-lg font-semibold text-[#3D0000] max-w-md">{faq.question}</h3>
				<span class="text-xl text-red-500">
					{faq.open ? '−' : '+'}
				</span>
			</div>

			{#if faq.open}
				<p class="text-sm text-gray-700 mt-4 transition-opacity duration-300">
					{faq.answer}
				</p>
			{/if}
		</div>
	{/each}
 </section>

 <!-- Waitlist button-->
<section id="waitlist" class="flex items-center justify-center px-4">
  <form class="flex flex-col md:flex-row items-center gap-4">
    <input
      type="email"
      placeholder="name@email.com"
      class="px-5 py-3 rounded-full bg-[#FEE4CB] placeholder-gray-500 text-gray-700 w-72 md:w-96"
    />
    <button
      type="submit"
      class="bg-[#FD5A46] text-white px-5 py-3 rounded-full hover:bg-[#e24c31] transition w-30 md:w-40">
      Join Waitlist
    </button>
  </form>
</section>







</main>

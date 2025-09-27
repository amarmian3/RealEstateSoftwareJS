<script lang="ts">
  type Listing = {
    id: string;
    title: string;
    price: string;
    address: string;
    beds: number;
    baths: number;
    area?: string;
    imageUrl: string;
    badges?: string[];
    match?: string;
  };

  let query = '';
  let showMap = true;
  let pageSize = 12;
  let totalResults = 128;
  
  // Dynamic grid layouts
  $: gridCols = showMap ? 'lg:grid-cols-[1fr_420px]' : '';
  $: cardsCols = showMap 
    ? 'grid-cols-1 sm:grid-cols-2' 
    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4';
  $: pageSize = showMap ? 12 : 24;

  const listings: Listing[] = [
    {
      id: '1',
      title: 'Modern 1BR Apartment',
      price: '£1,950/mo',
      address: 'Shoreditch, London',
      beds: 1,
      baths: 1,
      area: '46 m²',
      imageUrl: '/images/sample-1.jpg',
      badges: ['Verified', 'New']
    },
    {
      id: '2',
      title: 'Spacious 2BR with Balcony',
      price: '£2,650/mo',
      address: 'Canary Wharf, London',
      beds: 2,
      baths: 2,
      area: '72 m²',
      imageUrl: '/images/sample-2.jpg',
      badges: ['Verified']
    },
    {
      id: '3',
      title: 'Modern 3BR Apartment',
      price: '£2,200/mo',
      address: 'Shoreditch, London',
      beds: 3,
      baths: 2,
      area: '81 m²',
      imageUrl: '/images/sample-3.jpg',
      badges: ['Verified', 'New']
    },
    {
      id: '4',
      title: 'Modern 4BR Apartment',
      price: '£2,700/mo',
      address: 'Clapham, London',
      beds: 4,
      baths: 2,
      area: '112 m²',
      imageUrl: '/images/sample-4.jpg',
      badges: ['Pet friendly', 'New']
    }
  ];
</script>

<div class="ml-64 min-h-screen bg-white">
  <!-- Page Header -->
  <div class="max-w-[1600px] mx-auto px-6 pt-[60px]">
    <h1 class="text-3xl font-bold text-gray-900">Explore Properties</h1>
  </div>

  <!-- Main Content Grid -->
  <div class="max-w-[1600px] mx-auto px-6 pt-2 pb-10 grid gap-6 {gridCols}">
    
    <!-- Left Column: Search & Listings -->
    <section class="min-w-0">
      <!-- Search Bar & Filters -->
      <header class="sticky top-[60px] z-30 bg-white/95 backdrop-blur rounded-2xl mb-3">
        <!-- Search Input -->
        <div class="relative">
          <input
            bind:value={query}
            type="text"
            placeholder="Ask Rentrr..."
            class="w-full h-12 pl-4 pr-24 rounded-full bg-gray-100 border border-gray-200 
                   text-base text-gray-900 placeholder-gray-500 outline-none 
                   focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
          />
          
          <!-- Filter Button -->
          <button
            type="button"
            class="absolute right-1.5 top-1.5 h-9 px-4 rounded-full border border-gray-300 
                   bg-white inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <svg class="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M6 12h12M10 18h4" stroke-linecap="round"/>
            </svg>
            <span class="text-sm text-gray-600">Filters</span>
          </button>
        </div>

        <!-- Filter Chips -->
        <div class="flex flex-wrap items-center gap-2 pt-3 pb-3">
          <span class="h-8 px-3 inline-flex items-center rounded-full bg-gray-100 text-sm text-gray-800">Under £2000</span>
          <span class="h-8 px-3 inline-flex items-center rounded-full bg-gray-100 text-sm text-gray-800">Furnished</span>
          <span class="h-8 px-3 inline-flex items-center rounded-full bg-gray-100 text-sm text-gray-800">Pets Allowed</span>
          <button class="h-8 w-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <span class="text-lg">+</span>
          </button>
        </div>
      </header>

      <!-- Results Bar -->
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-gray-600">{totalResults}+ results found</p>
        <button
          on:click={() => showMap = !showMap}
          class="h-9 px-4 rounded-full border border-gray-300 bg-white text-sm 
                 hover:bg-gray-50 transition-colors"
        >
          {showMap ? 'Hide map' : 'Show map'}
        </button>
      </div>

      <!-- Property Cards Grid -->
      {#if listings.length > 0}
        <div class="grid {cardsCols} gap-6">
          {#each listings as card (card.id)}
            <article class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <!-- Image -->
              <div class="relative aspect-[4/3]">
                <img src={card.imageUrl} alt={card.title} class="h-full w-full object-cover" loading="lazy" />
                
                <!-- Save Button -->
                <button 
                  class="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 backdrop-blur 
                         grid place-items-center hover:bg-black/70 transition-colors"
                  aria-label="Save listing"
                >
                  <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z"/>
                  </svg>
                </button>
                
                <!-- Match Badge (if applicable) -->
                {#if card.match}
                  <div class="absolute left-3 bottom-3 px-2.5 py-1 rounded-full bg-green-100">
                    <span class="text-xs font-semibold text-green-700">{card.match}</span>
                  </div>
                {/if}
              </div>

              <!-- Content -->
              <div class="p-4">
                <h3 class="font-medium text-gray-900 truncate">{card.title}</h3>
                <p class="mt-1 text-sm text-gray-600 truncate">{card.address}</p>
                <p class="mt-1 font-semibold text-gray-900">{card.price}</p>

                <!-- Property Details -->
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span class="px-2 py-0.5 rounded-full bg-gray-100 text-xs">{card.beds} Bed{card.beds > 1 ? 's' : ''}</span>
                  <span class="px-2 py-0.5 rounded-full bg-gray-100 text-xs">{card.baths} Bath{card.baths > 1 ? 's' : ''}</span>
                  {#if card.area}
                    <span class="px-2 py-0.5 rounded-full bg-gray-100 text-xs">{card.area}</span>
                  {/if}
                  {#each card.badges || [] as badge}
                    <span class="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs">{badge}</span>
                  {/each}
                </div>

                <button class="mt-3 w-full py-2 rounded-lg border border-gray-300 bg-white text-sm 
                               hover:bg-gray-50 transition-colors">
                  View details
                </button>
              </div>
            </article>
          {/each}
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex items-center justify-center gap-3">
          <button class="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button class="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black transition-colors">
            Load more
          </button>
        </div>
      {:else}
        <!-- Empty State -->
        <div class="py-20 text-center">
          <p class="text-lg font-medium text-gray-900">No results found</p>
          <p class="mt-1 text-gray-600">Try adjusting filters or clearing the search.</p>
        </div>
      {/if}
    </section>

    <!-- Right Column: Map -->
    {#if showMap}
      <aside class="hidden lg:block">
        <div class="sticky top-[60px] h-[calc(100vh-80px)] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div id="map" class="h-full w-full bg-gray-200 bg-[url('/images/map-placeholder.png')] bg-cover bg-center"></div>
        </div>
      </aside>
    {/if}
  </div>
</div>
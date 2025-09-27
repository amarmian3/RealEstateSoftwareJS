<script lang="ts">
  // STATE
  let query: string = '';
  let showMap = true;

  // NEW: selection state
  let selectedId: string | null = null;

  // Grid template changes with toggle
  $: gridCols = ( showMap || selectedId )
    ? 'lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)_25px]'
    : 'lg:grid-cols-1';

  // Card columns densify when map is hidden
  $: cardsCols = ( showMap || selectedId ) 
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4';

  // Optional: change page size when map hidden
  $: pageSize = showMap ? 12 : 24;

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
    // optional extra fields the detail panel may show:
    description?: string;
    gallery?: string[];
    amenities?: string[];
  };

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
      badges: ['Verified', 'New'],
      description:
        'Bright south-facing 1BR close to Overground. Floor-to-ceiling windows, modern kitchen, and great cafés nearby.',
      gallery: ['/images/sample-1.jpg', '/images/sample-2.jpg', '/images/sample-3.jpg'],
      amenities: ['Balcony', 'Dishwasher', 'Pet friendly', 'Near Overground']
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
      badges: ['Verified'],
      description: 'Riverside 2BR with concierge, gym, and private balcony. 6 min to Jubilee line.',
      gallery: ['/images/sample-2.jpg', '/images/sample-4.jpg'],
      amenities: ['Gym', 'Concierge', 'Balcony', 'River view']
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
      badges: ['Verified', 'New'],
      description: 'Light-filled 3BR with high ceilings and period features.',
      gallery: ['/images/sample-3.jpg'],
      amenities: ['High ceilings', 'Near cafés', 'Good light']
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
      badges: ['Pet friendly', 'New'],
      description: 'Family-sized 4BR near Clapham Common with garden access.',
      gallery: ['/images/sample-4.jpg'],
      amenities: ['Garden access', 'Pet friendly', 'Parks nearby']
    }
  ];

  let totalResults = 128;

  // Derived currently selected listing
  $: selected = listings.find(l => l.id === selectedId) ?? null;

  // Handlers
  function openDetails(id: string) {
    selectedId = id;
    showMap = false; // keep map hidden so the right-rail "Open map" button appears
    // Optionally: sync to URL (deep link):
    // goto(`?p=${encodeURIComponent(id)}`, { replaceState: false, keepfocus: true, noScroll: true });
  }

  function closeDetails() {
    selectedId = null;
    // If you synced to URL, also clear it here.
  }
</script>

<!-- MAIN CONTENT WRAPPER -->
<div class="ml-15 min-h-screen bg-white">
  <!-- Page title row -->

  <!-- Split layout -->
  <div class="max-w-[1600px] mx-auto px-6 pb-10 grid gap-6 transition-all duration-300 relative min-h-0"
    class:lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)_25px]={showMap || selectedId}
    class:lg:grid-cols-[minmax(0,1fr)_25px]={!showMap && !selectedId}>
    <!-- LEFT: search, chips, list -->
    <section class="min-w-0 pt-[60px]">
      <!-- left column scroll container-->
      <div class="h-[calc(100vh-80px)] overflow-y-auto overscroll-contain pr-2">
        <!-- Search / filters strip -->
        <header
          class="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl mb-3"
        >
          <div class="relative">
            <div class="h-12 w-full rounded-full bg-[#F3F4F6] border border-[#E5E7EB]"></div>
            <input
              bind:value={query}
              type="text"
              placeholder="Ask Rentrr..."
              class="absolute left-2 right-[220px] top-1/2 -translate-y-1/2 bg-transparent border-0 ring-0 outline-none
                    font-[Inter] text-[16px] leading-6 text-[#111827] placeholder-[#9CA3AF]"
              aria-label="Search properties"
              on:keydown={(e) => {
                if (e.key === 'Enter') {
                  /* fetch(`/api/listings?pageSize=${pageSize}&query=${encodeURIComponent(query)}`) */
                }
              }}
            />

            <!-- Filters button -->
            <div class="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                class="absolute right-1.5 top-1/2 -translate-y-1/2 h-[42px] px-4 rounded-full border border-[#D1D5DB] bg-white
                      inline-flex items-center gap-2 hover:bg-gray-50"
                aria-label="Open filters"
                on:click={() => {
                  /* open filters drawer */
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-[#374151]" aria-hidden="true">
                  <path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
                <span class="font-[Inter] text-[14px] text-[#374151]">Filters</span>
              </button>
            </div>
          </div>

          <!-- Chips -->
          <div class="flex flex-wrap items-center gap-2 pb-3 mt-3">
            <span class="inline-flex h-8 items-center rounded-full bg-[#F3F4F6] px-3 text-[13px] text-[#1F2937]"
              >Under £2000</span
            >
            <span class="inline-flex h-8 items-center rounded-full bg-[#F3F4F6] px-3 text-[13px] text-[#1F2937]"
              >Furnished</span
            >
            <span class="inline-flex h-8 items-center rounded-full bg-[#F3F4F6] px-3 text-[13px] text-[#1F2937]"
              >Pets Allowed</span
            >
            <button
              class="inline-flex h-8 w-9 items-center justify-center rounded-full bg-[#F3F4F6]"
              aria-label="Add filter"
            >
              <span class="text-[18px] text-[#6B7280]">+</span>
            </button>
          </div>
        </header>

        <!-- No. of results TODO: Link to backend -->
        <div class="w-full mt-3 flex items-center justify-between">
          <div class="text-[14px] leading-[22px] text-[#6B7280] mt-1">{totalResults}+ results found
          </div>
        </div>

        <!-- Cards -->
        <div class="mt-4 grid {cardsCols} gap-6">
          {#each listings as card}
            <article class="group bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
              <!-- Image -->
              <div class="relative aspect-[4/3]">
                <img src={card.imageUrl} alt={card.title} class="h-full w-full object-cover" loading="lazy" />
                <!-- Save -->
                <button
                  class="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-black/50 text-white"
                  aria-label="Save listing"
                  on:click={() => {
                    /* POST /favorites */
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
                    <path
                      d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                {#if card.match}
                  <div class="absolute left-3 bottom-3 rounded-full bg-[#DCFCE7] px-2.5 py-1">
                    <span class="font-[Inter] font-semibold text-[12px] text-[#047857]">{card.match}</span>
                  </div>
                {/if}
              </div>

              <!-- Body -->
              <div class="p-4">
                <h3 class="font-[Inter] font-medium text-[15px] text-[#111827] truncate">{card.title}</h3>
                <div class="mt-1 text-[13px] text-[#6B7280] truncate">{card.address}</div>
                <div class="mt-1 font-[Inter] font-semibold text-[14px] text-[#111827]">{card.price}</div>

                <!-- Small chips -->
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[12px]"
                    >{card.beds} Bed{card.beds > 1 ? 's' : ''}</span
                  >
                  <span class="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[12px]"
                    >{card.baths} Bath{card.baths > 1 ? 's' : ''}</span
                  >
                  {#if card.area}
                    <span class="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[12px]"
                      >{card.area}</span
                    >
                  {/if}
                  {#if card.badges}
                    {#each card.badges as b}
                      <span
                        class="inline-flex items-center rounded-full bg-[#EEF2FF] text-[#4338CA] px-2 py-0.5 text-[12px]"
                        >{b}</span
                      >
                    {/each}
                  {/if}
                </div>

                <button
                  class="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                  on:click={() => openDetails(card.id)}
                  aria-label={`View details for ${card.title}`}
                >
                  View details
                </button>
              </div>
            </article>
          {/each}
        </div>

        <!-- Pagination -->
        <div class="mt-6 flex items-center justify-center gap-3">
          <button
            class="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm"
            aria-label="Previous page"
            on:click={() => {
              /* fetch prev page */
            }}
          >
            Previous
          </button>
          <button
            class="px-4 py-2 rounded-lg bg-[#111827] text-white hover:bg-black text-sm"
            aria-label="Next page"
            on:click={() => {
              /* fetch next page */
            }}
          >
            Load more
          </button>
        </div>
      

        {#if listings.length === 0}
          <div class="py-20 text-center text-gray-600">
            <p class="text-lg font-medium">No results found</p>
            <p class="mt-1">Try adjusting filters or clearing the search.</p>
          </div>
        {/if}
      </div>
    </section>

    <!-- RIGHT: when map is shown, the RHS column either shows the MAP or the DETAILS PANEL -->
    {#if showMap || selectedId}
      <aside class="hidden lg:block">
        <div class="sticky top-0 h-screen min-h-0 rounded-2xl overflow-hidden border border-black/5 bg-white">
          {#if showMap}
          <!-- MAP (default RHS content when nothing selected) -->
            <div class="relative h-full w-full">
              <!-- Close map (top-right) -->
              <button
                class="absolute top-3 left-3 z-10 h-9 px-3 rounded-full border border-gray-300 bg-white/95 backdrop-blur
                      text-sm hover:bg-gray-50"
                on:click={() => { showMap = false; selectedId = null; }}
                aria-label="Close map">
                <!-- Icon: collapse arrow →| -->
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-black" fill="none" aria-hidden="true">
                  <!-- arrow shaft -->
                  <path d="M4 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <!-- arrow head -->
                  <path d="M12 8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- vertical bar -->
                  <path d="M20 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <!-- Map canvas -->
              <div
                id="map"
                class="h-full w-full bg-[url('/images/map-placeholder.png')] bg-cover bg-center rounded-2xl"
                aria-label="Map">
                <!-- initialise real map + plot markers -->
              </div>
            </div>

          {:else if selectedId}
            <!-- DETAILS PANEL (replaces map when selectedId is set) -->
            <div class="h-full w-full flex flex-col min-h-0">
              <!-- Header -->
              <div class="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b">
                <div class="min-w-0 pr-3">
                  <h3 class="font-[Inter] font-semibold text-[16px] truncate">{selected.title}</h3>
                  <p class="text-[13px] text-[#6B7280] truncate">{selected.address}</p>
                </div>
                <button
                  class="h-9 w-9 grid place-items-center rounded-full border border-gray-300 hover:bg-gray-50"
                  on:click={closeDetails}
                  aria-label="Close details"
                >
                  ✕
                </button>
              </div>

              <!-- Content (scrollable) -->
              {#if selected}
                <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                  <!-- Gallery -->
                  <div class="grid grid-cols-3 gap-1 p-3">
                    
                      {#if selected.gallery && selected.gallery.length > 0}
                        {#each selected.gallery.slice(0, 6) as img}
                          <img src={img} alt="Property photo" class="aspect-square object-cover rounded" loading="lazy" />
                        {/each}
                      {:else}
                        <img src={selected.imageUrl} alt="Property photo" class="aspect-video object-cover" />
                      {/if}
                  </div>

                  <!-- Summary -->
                  <div class="px-4 pb-4">
                    <div class="flex items-center justify-between">
                      <div class="font-[Inter] font-semibold">{selected.price}</div>
                      <div class="text-sm text-gray-600">
                        {selected.beds} bed · {selected.baths} bath{selected.area ? ` · ${selected.area}` : ''}
                      </div>
                    </div>
                    {#if selected.description}
                      <p class="mt-2 text-[14px] text-[#374151]">{selected.description}</p>
                    {/if}

                    {#if selected.amenities && selected.amenities.length}
                      <div class="mt-3 flex flex-wrap gap-2">
                        {#each selected.amenities as a}
                          <span class="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-1 text-[12px]">{a}</span>
                        {/each}
                      </div>
                    {/if}

                    <div class="mt-4 grid grid-cols-2 gap-2">
                      <button class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                        Message landlord
                      </button>
                      <button class="rounded-lg bg-[#111827] text-white px-3 py-2 text-sm hover:bg-black">
                        Book a viewing
                      </button>
                    </div>
                  </div> 
                </div>
              {/if}  
            </div>
          {/if}
        </div>
      </aside>
    {/if}
    <!-- RIGHT RAIL: shows an opener when map is closed -->
    {#if !showMap} 
      <aside class="hidden lg:block border-l border-gray-200 ">
        <div class="fixed top-0 right-0 z-50 h-screen px-3">
          <button
            class="mt-3 grid place-items-center h-10 w-10 rounded-full bg-white shadow ring-1 ring-black/5
                  hover:bg-white/95 hover:shadow-md"
            on:click={() => { showMap = true; }}
            aria-label="Open map">
            <!-- Expand map icon -->
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-black" fill="none" aria-hidden="true">
              <path d="M4 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M20 12H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 8l-4 4 4 4" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>
    {/if}
  </div>
</div>

<style>
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0.6;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
</style>

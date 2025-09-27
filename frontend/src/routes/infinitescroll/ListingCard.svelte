<!-- Tenant view-->
<!-- NOTE: This code can be put into src/lib if the card components will be reused-->
<!--This page is to bring in all the components from the backend whcih is iterated in page.svelte so there are multiple cards on the page all personalised for user-->
<script lang="ts">
    // Props — these will be filled from backend later
    export let id: string = '';                 // NOTE[backend]: listing.id
    export let image: string = '';              // NOTE[backend]: listing.image or listing.images[0]
    export let title: string = '';              // NOTE[backend]: listing.title
    export let address: string = '';            // NOTE[backend]: listing.address
    export let distance: string = '';           // NOTE[backend]: listing.distanceFromSearch
    export let priceMonthly: number = 0;        // NOTE[backend]: listing.price.month
    export let priceWeekly: number = 0;         // NOTE[backend]: listing.price.week
    export let features: string[] = [];         // NOTE[backend]: listing.features[]
    export let match: number = 0;               // NOTE[backend]: listing.matchScore
  
    // Format prices nicely
    const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
    $: monthlyLabel = gbp.format(priceMonthly);
    $: weeklyLabel  = gbp.format(priceWeekly);
  </script>
  
  <article
    class="max-w-3xl mx-auto bg-white rounded-xl border shadow-sm p-4 md:p-5 flex gap-4 md:gap-5 items-start">
    
    <!-- Image -->
    <img
      src={image}
      alt={`Main photo of ${title}`}
      class="w-36 h-28 md:w-44 md:h-32 object-cover rounded-lg flex-shrink-0" />
  
    <!-- Main text -->
    <div class="flex-1 min-w-0">
      <div class="text-sm text-gray-600">
        {monthlyLabel}/month ({weeklyLabel}/week)
      </div>
      <h3 class="mt-1 font-semibold text-gray-900 truncate">{title}</h3>
      <div class="text-sm text-gray-500">{address} · {distance}</div>
  
      <!-- Feature chips -->
      <div class="mt-3 flex flex-wrap gap-2">
        {#each features as f}
          <span class="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700 border border-gray-200">
            {f}
          </span>
        {/each}
      </div>
    </div>
  
    <!-- Actions -->
    <div class="flex flex-col gap-2 items-end">
      <span class="px-3 py-1.5 rounded-md text-white bg-blue-600 text-sm font-medium">
        {match}% Match
      </span>
      <!-- NOTE[backend]: /listing/[id] route -->
      <a
        href={`/listing/${id}`}
        class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 border border-gray-200">
        View Details
      </a>
    </div>
  </article>
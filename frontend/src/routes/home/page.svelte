<script lang="ts">
    import ListingCard from '$lib/ListingCard.svelte';
  
    // TEMP MOCK DATA for frontend-only phase
    // NOTE[backend]: replace this entire array with data from +page.server.ts (data.listings) later
    const listings = [
      {
        id: 'balham-2bed',
        image: '/images/sample-balham.jpg',
        title: 'Charming 2‑Bed in Balham',
        address: '325 Elm Street, London',
        distance: '0.5 miles',
        priceMonthly: 1800,
        priceWeekly: 415,
        features: ['Furnished', 'Near Tube', 'Bills Included'],
        match: 95
      },
    ]
    // OPTIONAL: When backend is ready, this page should accept:
    // export let data: { listings: any[] }; // NOTE[backend]: from +page.server.ts
    // and then use: const listings = data.listings;
  </script>
  
  <main class="max-w-6xl mx-auto p-4 md:p-8 grid gap-4 md:gap-6 lg:grid-cols-2">
    {#each listings as l (l.id)}
      <ListingCard {...l} />
    {/each}
  </main>
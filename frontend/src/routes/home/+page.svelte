//Tenant view 
//card elements are brought in from ListingCard and then for loop for multiple cards

<script lang="ts">
  import ListingCard from './ListingCard.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { intersect } from '$lib/intersectobserver'; // <-- back
  import type { Listing, ListingsResponse } from '$lib/types';

  let listings: Listing[] = [];
  let cursor: string | null = null;
  const pageSize = 10;

  let loading = false;
  let done = false;
  let errorMsg: string | null = null;

  let currentAbort: AbortController | null = null;

  function dedupeById(items: Listing[]): Listing[] {
    const seen = new Set<string | number>();
    const out: Listing[] = [];
    for (const it of items) {
      if (seen.has(it.id)) continue;
      seen.add(it.id);
      out.push(it);
    }
    return out;
  }

  async function loadMore() {
    if (loading || done) return;
    loading = true;
    errorMsg = null;

    const params = new URLSearchParams({ limit: String(pageSize) });
    if (cursor) params.set('cursor', cursor);
    const url = `/api/listings?${params.toString()}`;

    // cancel any in-flight request, if user scrolls too fast (we can take this out?)
    currentAbort?.abort();
    currentAbort = new AbortController();

    try {
      const res = await fetch(url, { signal: currentAbort.signal }); //replace url with real url backend later
      if (!res.ok) throw new Error(`Failed to fetch listings (${res.status})`);
      const data: ListingsResponse = await res.json();

      const newItems = (data.items ?? []).map((it: any) => ({
        ...it,
        features: it.features ?? it.badges ?? [] //can remove badges as we are using features now
      }));

      listings = dedupeById([...listings, ...newItems]);
      cursor = (data as any).nextCursor ?? null;
      done = !data.hasMore || cursor === null || newItems.length === 0;
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        console.error(e);
        errorMsg = e?.message ?? 'Something went wrong.';
      }
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadMore(); // initial batch
  });

  onDestroy(() => {
    currentAbort?.abort();
  });
</script>

<svelte:head>
  <title>Home — Rentrr</title>
  <meta name="description" content="Discover rental listings curated to your profile, with smart matching and verified profiles." />
</svelte:head>

<section class="max-w-4xl mx-auto px-4 py-6 pb-28 space-y-4">
  {#each listings as l (l.id)}
    <ListingCard {...l} />
  {/each}

  <!-- Skeletons when first loading -->
  {#if loading && !listings.length}
    {#each Array(6) as _}
      <div class="animate-pulse rounded-xl bg-gray-100 h-40 w-full"></div>
    {/each}
  {/if}

  <!-- Status / retry -->
  <div class="flex flex-col items-center gap-2 py-6 text-sm">
    {#if errorMsg}
      <div class="text-red-600">{errorMsg}</div>
      <button class="px-4 py-2 rounded-md bg-black text-white" on:click={loadMore}>
        Try again
      </button>
    {:else if loading && listings.length}
      <span class="text-gray-500">Loading more…</span>
    {:else if done}
      <span class="text-gray-400">You’re all caught up ✨</span>
    {/if}
  </div>

  <!-- IntersectionObserver via action -->
  <div> 
    use:intersect={{ onEnter: loadMore, rootMargin: '300px 0px' }} aria-hidden="true" 
  </div>

  <!-- No-JS fallback -->
  <noscript>
    <div class="text-center">
      <form method="get" action="?limit={pageSize}">
        <button class="px-4 py-2 rounded-md bg-gray-200">Load more</button>
      </form>
    </div>
  </noscript>
</section>

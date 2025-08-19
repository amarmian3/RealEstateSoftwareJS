import type { RequestHandler } from './$types';
import type { Listing } from '$lib/types';

const ALL: Listing[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  title: `Listing ${i + 1}`,
  address: `Address ${i + 1}`,
  image: `/img/${(i % 5) + 1}.jpg`,
  distance: Math.round(Math.random() * 5) + ' km',
  priceMonthly: 1200 + i,
  priceWeekly: 275 + Math.floor(i / 4),
  badges: ['New'],
  match: Math.floor(Math.random() * 100)
}));

export const GET: RequestHandler = ({ url }) => {
  const limit = Number(url.searchParams.get('limit') ?? 10);
  const cursorParam = url.searchParams.get('cursor'); // string | null
  const start = cursorParam ? Number(cursorParam) : 0;

  const items = ALL.slice(start, start + limit);
  const nextStart = start + items.length;
  const hasMore = nextStart < ALL.length;
  const nextCursor = hasMore ? String(nextStart) : null;

  return new Response(JSON.stringify({ items, hasMore, nextCursor }), {
    headers: { 'content-type': 'application/json' }
  });
};
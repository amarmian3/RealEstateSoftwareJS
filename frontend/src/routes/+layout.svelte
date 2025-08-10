<script lang="ts">
	//Optional: you can add layout-specific JS here
	import '../app.css';
	let { children } = $props();
</script>

<main>
{@render children()}   // This is where the content of the 'child' pages will be rendered
</main>

<!--Header -->







<!--Footer for Landlord -->
<nav class="fixed bottom 0 left 0 right 0 z-50">
	<ul class="flex justify-between items-center">
		<li class="flex flex-col items-center flex-1">
			<a href="/" class="flex flex-col items-center">
				<span>🏠</span>
        		<span>Home</span>
      		</a>
		</li>
		<li class="flex flex-col items-center flex-1">
			<a href="/iphone_search" class="flex flex-col items-center">
				<span>🔍</span>
        		<span>Search</span>
      		</a>
		</li>
		<li class="flex flex-col items-center flex-1">
			<a href="/list" class="flex flex-col items-center">
				<span>➕</span>
        		<span class="font-bold text-bold">List</span>
      		</a>
		</li>

		<li class="flex flex-col items-center flex-1">
			<a href="/inbox" class="flex flex-col items-center">
				<span>📩</span>
        		<span>Inbox</span>
      		</a>
		</li>

		<li class="flex flex-col items-center flex-1">
			<a href="/profile" class="flex flex-col items-center">
				<span>👤</span>
        		<span>Profile</span>
      		</a>
		</li>

	</ul>
</nav>


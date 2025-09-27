<script lang="ts">
	//Optional: you can add layout-specific JS here
	import '../app.css';
	const { children } = $props();
</script>

<main class="pb-24">
{@render children()}   // This is where the content of the 'child' pages will be rendered
</main>

<!--Header -->







<!--Footer for Landlord -->
<nav class="fixed w-[72px] top-0 left-0 z-50 h-screen bg-white border-r border-gray-200">
	<ul class="mt-4 flex flex-col space-y-4 items-center">
		<li class="flex flex-col items-center flex-1">
			<a href="/" class="flex flex-col items-center">
				<span>🏠</span> <!---main +page.svelte---->
        		<span>Home</span>
      		</a>
		</li>
		<li class="flex flex-col items-center flex-1">
			<a href="/chat" class="flex flex-col items-center">
				<span>💬</span> <!---main +page.svelte---->
        		<span>Chats</span>
      		</a>
		</li>
		<li class="flex flex-col items-center flex-1">
			<a href="/infinitescroll" class="flex flex-col items-center">
				<span>🔍</span>
        		<span>Inf Scroll</span>
      		</a>
		</li>
		<li class="flex flex-col items-center flex-1">
			<a href="/Explore" class="flex flex-col items-center">
				<span>➕</span>
        		<span class="font-bold text-bold">Explore</span>
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


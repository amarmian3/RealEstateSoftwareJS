<script lang="ts">
	//Optional: you can add layout-specific JS here
	import '../app.css';
	let { children } = $props();

    // Tenant database You can make the search input reactive later
	let query = '';
    let results =[];
    // Placeholder for tenants data backend
    async function searchTenants() {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
		results = await res.json();
	}
</script>


<main>
    <section class="px-4 pt-6 pb-24">
        <!-- Page title -->
        <h1 class="text-xl font-semibold text-center mb-6">Search</h1>
    
        <!-- Search Bar --> //AMAR NOTE: link to back end database
        <div class="bg-[#f6ebe3] rounded-xl flex items-center px-4 py-3 mb-8 shadow-sm">
            <span class="text-gray-500 mr-2">🔍</span>
            <input
                type="text"
                bind:value={query}
                placeholder="Search by address, city, or ZIP code"
                class="bg-transparent outline-none w-full text-sm placeholder-gray-500"
            />
        </div>
    
        <!-- Suggested Tenants Section --> //AMAR NOTE: link to back end database - tenant suggestions must be able to dynamically change depending on landlord
        <h2 class="text-lg font-semibold mb-4">Suggested Tenants</h2>
    
        <div class="flex gap-6 justify-center">
            <!-- Tenant 1 -->
            <div class="flex flex-col items-center text-center">
                <img
                    //AMAR NOTE: link to back end database
                />
                <p //AMAR NOTE: link to back end database></p>
                <p //AMAR NOTE: link to back end database></p>
            </div>
    
            <!-- Tenant 2 -->
            <div class="flex flex-col items-center text-center">
                <img
                    //AMAR NOTE: link to back end database
                />
                <p //AMAR NOTE: link to back end database></p>
                <p class="text-sm text-gray-600">32, Marketing Manager</p>
            </div>
        </div>
    </section>
</main>
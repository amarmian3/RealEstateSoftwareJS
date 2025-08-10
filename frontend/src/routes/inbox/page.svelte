<script lang="ts">
    // Minimal shape for a message. Extend as you like.
    type Message = {
      id: string;
      text: string;
      from: "me" | "other";
      createdAt: string;
    };
  
    // High-level conversation detail
    let address = "123 Maple Street"; // TODO: Needs to come from backend
  
    // Local state (starts with no messages)
    let messages: Message[] = [];
  
    let draft = "";
    let isSending = false;

    let messagecontainer = HTMLDivElement //reference to message area 
  
    // OPTIONAL: fetch existing messages on mount
    // import { onMount } from "svelte";
    // onMount(async () => {
    //   // TODO: GET conversation messages
    //   // const res = await fetch(`/api/conversations/{conversationId}/messages`);
    //   // messages = await res.json();
    // });
  
    async function send() {
      const text = draft.trim();
      if (!text || isSending) return;
  
      isSending = true;
  
      // Optimistic add
      const tempId = `tmp-${crypto.randomUUID()}`;
      const optimistic: Message = {
        id: tempId,
        text,
        from: "me",
        createdAt: new Date().toISOString()
      };
      messages = [...messages, optimistic];
      draft = "";
  
      // TODO: POST to your backend
      // const res = await fetch(`/api/conversations/{conversationId}/messages`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text })
      // });
      // const saved: Message = await res.json();
      // messages = messages.map(m => (m.id === tempId ? saved : m));
  
      // Demo: confirm optimistic (remove when wired)
      setTimeout(() => {
        messages = messages.map(m => (m.id === tempId ? { ...m, id: crypto.randomUUID() } : m));
        isSending = false;
      }, 250);
    }
  </script>
  
  <!-- Page shell -->
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="mx-auto max-w-3xl px-4 py-6">
      <!-- High-level header: address only -->
      <header class="mb-4">
        <h1 class="text-left text-3xl font-semibold">{address}</h1>
      </header>
  
      <!-- Message list (empty by default) -->
      <section
        class="mb-4 min-h-[40vh] rounded-2xl bg-white shadow-sm p-4 space-y-4 overflow-auto"
        bind:this = {messagecontainer}
        aria-label="Conversation messages"
      >
        {#if messages.length === 0}
          <p class="text-gray-500">No messages yet. Start the conversation below.</p>
        {:else}
          {#each messages as m (m.id)}
            {#if m.from === "me"}
              <div class="flex justify-end">
                <div class="max-w-[75%] rounded-2xl bg-blue-600 text-white p-3">
                  <p class="leading-relaxed">{m.text}</p>
                </div>
              </div>
            {:else}
              <div class="flex justify-start">
                <div class="max-w-[75%] rounded-2xl bg-gray-100 p-3">
                  <p class="leading-relaxed">{m.text}</p>
                </div>
              </div>
            {/if}
          {/each}
        {/if}
      </section>
  
      <!-- Composer -->
      <form
        class="rounded-2xl bg-white shadow-sm border p-2 flex items-center gap-2"
        on:submit|preventDefault={send}
        aria-label="Message composer"
      >
        <!-- TODO: optional file upload -->
        <!-- <input type="file" class="hidden" id="file" on:change={handleUpload} /> -->
  
        <input
          type="text"
          class="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message"
          bind:value={draft}
          aria-label="Type a message"
        />
  
        <button
          type="submit"
          class="rounded-xl bg-blue-600 text-white px-4 py-3 font-medium hover:bg-blue-700 disabled:opacity-60"
          disabled={isSending || !draft.trim()}
        >
          Send
        </button>
      </form>
    </div>
  </div>
  
  <style>
    /* Keep styles minimal—Tailwind handles most of it */
  </style>
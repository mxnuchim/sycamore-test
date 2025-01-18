<template>
  <div class="flex flex-col !h-screen w-screen bg-white -ml-[8%] 2xl:-ml-[18%]">
    <header class="bg-black text-white p-4 text-center">
      <h1 class="text-xl font-semibold">Customer Entry Dashboard</h1>
    </header>
    <main class="p-4 w-full box-border">
      <RouterView />
    </main>
    <footer class="bg-black text-white text-center p-2 mt-4">
      Design Inspiration:
      <a
        href="https://dribbble.com/shots/24565993-Create-account-Untitled-UI"
        class="text-blue-300"
        >Dribble (Click to view)</a
      >
    </footer>
  </div>
</template>

<script lang="ts">
import { RouterView } from "vue-router";

export default {
  components: { RouterView },
};
</script>

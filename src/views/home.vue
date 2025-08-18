<template>
  <aside class="w-full min-h-screen flex flex-col md:flex-row justify-around">
    <div class="w-full md:w-3/4 pt-4 md:pt-16 pb-16 md:w-300">
      <div>
        <right />
      </div>
      <div class="pt-6">
        <Vertical />
      </div>
    </div>
  </aside>
</template>
<script setup>
import Vertical from "@/components/home/Vertical.vue";
import right from "@/components/home/right.vue";
</script>
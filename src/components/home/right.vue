<template>
  <div class="glass flex rounded-2xl p-5 flex-col w-300 h-full">
    <top />
    <router-view />
  </div>
</template>

<script setup>
import top from "./top.vue";
</script>

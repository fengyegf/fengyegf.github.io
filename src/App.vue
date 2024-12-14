<script setup>
import { RouterView } from 'vue-router'
import background from './components/background.vue';
import Topbar from './components/Topbar.vue';
</script>

<template>
  <background />
  <div class="main">
    <Topbar />
  </div>
  <RouterView />
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

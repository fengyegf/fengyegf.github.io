<script setup>
import Top from "./components/Top.vue";
import Bottombar from "./components/Bottombar.vue";
import "@/assets/css/style.css";
</script>

<template>
  <div class="app-container">
    <div class="header">
      <Top />
    </div>
    <div class="main-content">
      <RouterView />
      <Bottombar />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  background-color: var(--base-100);
  min-height: 100vh;
  width: 100%;
}

.header {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
}

.main-content {
  padding-top: 7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

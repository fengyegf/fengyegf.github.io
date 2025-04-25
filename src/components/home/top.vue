<template>
  <nav class="glass rounded-tr-2xl rounded-bl-2xl p-2 md:p-5 fixed right-0 top-0 z-10">
    <!-- 桌面导航 -->
    <ul class="hidden md:flex gap-4 w-120 h-full justify-around">
      <router-link to="/" class="text-xl font-bold">关于我</router-link>
      <router-link to="/time" class="text-xl font-bold">时间轴</router-link>
      <router-link to="/gallery" class="text-xl font-bold">空间</router-link>
      <router-link to="/Blogs" class="text-xl font-bold">博文</router-link>
      <router-link to="/Music" class="text-xl font-bold">音乐</router-link>
    </ul>
    <!-- 移动导航 -->
    <div class="md:hidden">
      <button @click="toggleMenu" class="text-xl p-2">
        <span v-if="!menuOpen">☰</span>
        <span v-else>✕</span>
      </button>
      <!-- 移动菜单 -->
      <div v-if="menuOpen" class="absolute top-full right-0 mt-2 glass rounded-xl p-4 w-36">
        <ul class="flex flex-col gap-3">
          <router-link @click="menuOpen = false" to="/" class="text-lg font-bold">关于我</router-link>
          <router-link @click="menuOpen = false" to="/time" class="text-lg font-bold">时间轴</router-link>
          <router-link @click="menuOpen = false" to="/gallery" class="text-lg font-bold">空间</router-link>
          <router-link @click="menuOpen = false" to="/Blogs" class="text-lg font-bold">博文</router-link>
          <router-link @click="menuOpen = false" to="/Music" class="text-lg font-bold">音乐</router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
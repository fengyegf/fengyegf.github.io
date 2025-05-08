<template>
  <div class="glass rounded-xl p-5 text-center text-xs text-gray-500">
    <div class="flex justify-center items-center">
      <img :src="config.publicSecurity.logo" alt="备案图标" class="h-3 md:h-4 mr-1" />
      <a :href="config.publicSecurity.link" target="_blank" rel="noopener noreferrer"
        class="md:text-xs flex items-center">
        {{ config.publicSecurity.name }}
        {{ config.publicSecurity.number }}
      </a>
      <span class="mx-2">|</span>
      <a :href="config.icp.link" target="_blank" rel="noopener noreferrer" class="md:text-xs flex items-center">
        {{ config.icp.number }}
      </a>
    </div>
  </div>
</template>

<script setup>
import config from '@/config/ipc';
</script>
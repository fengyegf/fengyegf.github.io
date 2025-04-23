<template>
  <div class="glass rounded-xl p-2 md:p-4 text-center text-xs text-gray-500">
    <div class="flex items-center justify-center mb-1 md:mb-2">
      <img :src="config.publicSecurity.logo" alt="备案图标" class="h-3 md:h-4 mr-1" />
      <a :href="config.publicSecurity.link" target="_blank" rel="noopener noreferrer"
        class="hover:text-blue-500 transition-colors text-[10px] md:text-xs">
        {{ config.publicSecurity.number }}
      </a>
    </div>
    <div>
      <a :href="config.icp.link" target="_blank" rel="noopener noreferrer"
        class="hover:text-blue-500 transition-colors text-[10px] md:text-xs">
        {{ config.icp.number }}
      </a>
    </div>
  </div>
</template>

<script setup>
import config from '@/config/ipc';
</script>
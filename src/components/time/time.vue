<template>
  <div class="glass h-15 w-full shadow-sm rounded-xl flex items-center p-5">
    {{ label }}
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

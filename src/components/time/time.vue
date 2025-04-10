<template>
  <div class="glass h-15 w-100 shadow-sm rounded-xl flex items-center p-5">
    {{ label }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

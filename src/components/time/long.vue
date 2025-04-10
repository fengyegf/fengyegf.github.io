<template>
  <div
    class="glass h-15 w-full shadow-sm rounded-xl flex items-center p-5 cursor-pointer hover:shadow-md transition-shadow duration-300"
    @click="$emit('click')"
  >
    <div class="flex-none w-16">{{ day }}</div>
    <div class="ml-5 flex-grow">{{ title }}</div>
    <div class="flex flex-wrap justify-end gap-2 min-w-[150px]">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="badge badge-primary badge-outline"
      >
        #{{ tag }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 定义事件
defineEmits(["click"]);

const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  // 添加path属性用于导航
  path: {
    type: String,
    default: "",
  },
});
</script>

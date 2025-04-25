<template>
  <div
    class="glass h-auto min-h-12 md:h-15 w-full shadow-sm rounded-xl flex flex-col md:flex-row items-start md:items-center p-3 md:p-5 cursor-pointer hover:shadow-md transition-all duration-300 timeline-card"
    @click="$emit('click')">
    <div class="flex-none w-16 text-sm md:text-base mb-1 md:mb-0">{{ day }}</div>
    <div
      class="md:ml-5 flex-grow text-sm md:text-base mb-2 md:mb-0 w-full md:w-auto overflow-hidden text-ellipsis whitespace-nowrap">
      {{ title }}</div>
    <div class="flex flex-wrap gap-1 md:gap-2 w-full md:w-auto md:min-w-[150px] md:justify-end md:flex-shrink-0">
      <div v-for="(tag, index) in tags" :key="index" class="badge badge-primary badge-outline text-xs">
        #{{ tag }}
      </div>
    </div>
  </div>
</template>

<script setup>
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

<style scoped>
.timeline-card {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  transform: translateX(-100%);
  transition: transform 0.4s ease-out;
  z-index: -1;
}

.timeline-card:hover {
  transform: translateY(-3px);
}

.timeline-card:hover::before {
  transform: translateX(0);
}

@media (max-width: 768px) {
  .timeline-card:hover {
    transform: none;
  }
}
</style>

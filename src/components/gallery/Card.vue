<template>
  <div class="w-full sm:w-1/2 md:w-1/3 p-4" @click="$emit('click')">
    <div
      class="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col">
      <div class="p-4 rounded-xl overflow-hidden">
        <!-- 固定高度的图片容器 -->
        <div class="w-full h-48 relative rounded-xl overflow-hidden">
          <img v-if="item.image"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            :src="item.image" :alt="item.title" @error="handleImageError" />
          <div v-else class="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
            <span class="text-gray-400">暂无图片</span>
          </div>
        </div>
      </div>

      <div class="p-4 flex-grow">
        <div class="text-gray-500 text-sm">
          {{ formatDate(item.published) }}
        </div>
        <h3 class="text-lg font-bold mt-1 mb-2 line-clamp-1 overflow-hidden">
          {{ item.title }}
        </h3>
        <p class="text-sm text-gray-600 line-clamp-2 overflow-hidden">
          {{ item.category }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["click"]);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = "";
  event.target.parentElement.innerHTML =
    '<div class="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center"><span class="text-gray-400">图片加载失败</span></div>';
};

// 格式化日期显示
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
};
</script>

<template>
  <div class="w-full sm:w-1/2 md:w-1/3 p-2 md:p-4" @click="$emit('click')">
    <div
      class="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col">
      <div class="p-2 md:p-4 rounded-xl overflow-hidden">
        <!-- 调整手机端图片容器高度，从h-36增加到h-44 -->
        <div class="w-full h-44 md:h-48 relative rounded-xl overflow-hidden">
          <img v-if="item.image"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            :src="item.image" :alt="item.title" @error="handleImageError" />
          <div v-else class="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
            <span class="text-gray-400 text-sm md:text-base">暂无图片</span>
          </div>
        </div>
      </div>

      <div class="p-2 md:p-4 flex-grow">
        <div class="text-gray-500 text-xs md:text-sm">
          {{ formatDate(item.published) }}
        </div>
        <h3 class="text-base md:text-lg font-bold mt-1 mb-1 md:mb-2 line-clamp-1 overflow-hidden">
          {{ item.title }}
        </h3>
        <p class="text-xs md:text-sm text-gray-600 line-clamp-2 overflow-hidden">
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

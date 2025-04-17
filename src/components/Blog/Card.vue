<template>
  <div class="w-full sm:w-1/2 p-2" @click="$emit('click')">
    <div class="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full">
      <div class="relative pb-[56.25%] overflow-hidden rounded-t-xl bg-gray-100">
        <img v-if="article.image" class="absolute top-0 left-0 w-full h-full object-cover" :src="article.image"
          :alt="article.title" @error="handleImageError" loading="lazy" decoding="async" fetchpriority="high" />
        <div v-else class="absolute top-0 left-0 w-full h-full bg-gray-100 flex items-center justify-center">
          <span class="text-gray-400">暂无图片</span>
        </div>
      </div>

      <div class="p-4">
        <div class="text-gray-500 text-sm">
          {{ formatDate(article.published) }}
        </div>
        <h3 class="text-lg font-bold mt-1 mb-2">
          {{ article.title }}
        </h3>
        <p class="text-sm text-gray-600 line-clamp-2">
          {{ article.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineEmits(["click"]);

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const imageError = ref(false);

// 缓存加载过的图片
const imageCache = {};

onMounted(() => {
  // 如果文章有图片，预加载并缓存
  if (props.article.image && !imageCache[props.article.image]) {
    const img = new Image();
    img.src = props.article.image;
    img.onload = () => {
      imageCache[props.article.image] = true;
    };
  }
});

const handleImageError = (event) => {
  imageError.value = true;
  event.target.style.display = 'none';
  event.target.parentElement.innerHTML =
    '<div class="absolute top-0 left-0 w-full h-full bg-gray-100 flex items-center justify-center"><span class="text-gray-400">图片加载失败</span></div>';
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
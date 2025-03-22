<script setup>
import { ref, onMounted, nextTick, defineProps } from "vue";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const props = defineProps({
  specificPath: {
    type: String,
    default: null,
  },
});

const route = useRoute();
const pageData = ref(null);
const mdFiles = import.meta.glob("../../md/**/*.md");

onMounted(async () => {
  try {
    // 优先使用传入的特定路径，否则从路由参数获取
    const path = props.specificPath || route.params.path;
    console.log("Loading path:", path);

    if (!path || !mdFiles[path]) {
      throw new Error("文章不存在: " + path);
    }

    // 加载文章内容
    const mod = await mdFiles[path]();
    pageData.value = {
      title: mod.attributes?.title || "无标题",
      date: mod.attributes?.published,
      category: mod.attributes?.category || "默认分类",
      tags: mod.attributes?.tags || [],
      image: mod.attributes?.image,
      content: mod.html,
    };
  } catch (error) {
    console.error("加载文章失败:", error);
  }

  await nextTick(() => {
    document.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });
  });
});
</script>

<template>
  <div class="container">
    <div v-if="pageData" class="card">
      <figure class="card-figure">
        <img :src="pageData.image" :alt="pageData.title" class="card-image" />
      </figure>
      <div class="card-content">
        <div class="card-header">
          <h2 class="card-title">{{ pageData.title }}</h2>
          <div class="tag-container">
            <div class="tag tag-primary">{{ pageData.category }}</div>
            <div
              v-for="tag in pageData.tags"
              :key="tag"
              class="tag tag-outline"
            >
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="markdown-body" v-html="pageData.content"></div>
      </div>
    </div>
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem 1rem;
}

.card {
  background-color: var(--base-100);
  border-radius: 0.5rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-figure {
  width: 100%;
  aspect-ratio: 16/7;
  margin: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  margin-top: 1.25rem;
  padding: 1.5rem;
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tag-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 1rem;
}

.tag-primary {
  background-color: var(--secondary-color);
  color: white;
}

.tag-outline {
  border: 1px solid var(--base-300);
  background-color: transparent;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem; /* 相当于h-64 */
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid var(--base-300);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

:deep(.markdown-body) {
  background-color: transparent;
}

:deep(.markdown-body img) {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

:deep(.markdown-body .hljs) {
  border-radius: 10px;
}

:deep(.markdown-body a) {
  color: dodgerblue;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.087);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem 0.5rem;
  }

  .card-content {
    padding: 1rem;
  }
}
</style>

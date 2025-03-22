<template>
  <div class="container">
    <div class="card-grid">
      <div v-for="article in displayArticles" :key="article.title" class="card">
        <figure class="card-figure">
          <img
            :src="article.image"
            :alt="article.title"
            class="card-image"
            @error="handleImageError($event, article)"
          />
        </figure>
        <div class="card-content">
          <h2 class="card-title">{{ article.title }}</h2>
          <p class="card-summary">{{ article.summary }}</p>
          <div class="card-actions">
            <a
              href="#"
              class="card-link"
              @click.prevent="handleReadClick(article)"
            >
              阅读全文 →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const articles = ref([]);
const mdFiles = import.meta.glob("../../md/*.md");

// 处理阅读按钮点击
const handleReadClick = (article) => {
  router.push({
    name: "Page",
    params: {
      path: article.path,
      title: article.title,
      image: article.image,
    },
  });
};

// 处理图像加载失败
const handleImageError = (event, article) => {
  article.image = null; // 将图像标记为不存在
};

// 只获取前3篇文章
const displayArticles = computed(() => {
  return articles.value.slice(0, 3);
});

onMounted(async () => {
  for (const path in mdFiles) {
    const mod = await mdFiles[path]();

    articles.value.push({
      title: mod.attributes?.title || "无标题",
      summary: mod.attributes?.description || "",
      image: mod.attributes?.image || "", // 添加默认图片路径
      path: path,
    });
  }
});
</script>

<style scoped>
.container {
  padding: 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 平均分成3列 */
  gap: 2rem; /* 卡片之间的间距 */
}

.card {
  background-color: var(--base-100);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card-figure {
  margin: 0;
  width: 100%;
  aspect-ratio: 16/9;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
}

.card-summary {
  color: var(--base-content);
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-actions {
  margin-top: 1rem;
  text-align: left;
  /* 确保actions容器高度一致 */
  height: 24px;
  display: flex;
  align-items: center;
}

.card-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.card-link:hover {
  color: #2980b9;
  text-decoration: underline;
}
</style>

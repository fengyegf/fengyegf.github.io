<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const articles = ref([]);
const mdFiles = import.meta.glob("../../md/*.md");

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

// 处理图像加载失败，确保不显示失败图标
const handleImageError = (event, article) => {
  article.image = null; // 将图像标记为不存在
};

// 生成随机布局方向
const getRandomLayout = () => {
  return Math.random() > 0.5 ? "image-left" : "image-right";
};

onMounted(async () => {
  for (const path in mdFiles) {
    const mod = await mdFiles[path]();

    articles.value.push({
      title: mod.attributes?.title || "无标题",
      date: mod.attributes?.published,
      category: mod.attributes?.category || "默认分类",
      tags: mod.attributes?.tags || [],
      summary: mod.attributes?.description || "",
      image: mod.attributes?.image,
      link: path.replace("../../md/", "../md/"),
      path: path,
      layout: getRandomLayout(), // 为每篇文章随机分配布局
    });
  }
});
</script>

<template>
  <div class="container">
    <h1 class="section-title">最新文章</h1>
    <div class="article-list">
      <div
        v-for="article in articles"
        :key="article.title"
        class="article-item"
      >
        <div
          class="article-card"
          :class="[{ 'no-image': !article.image }, article.layout]"
        >
          <figure v-if="article.image" class="article-image-container">
            <img
              :src="article.image"
              :alt="article.title"
              class="article-image"
              @error="handleImageError($event, article)"
            />
          </figure>
          <div class="article-content">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-actions">
              <button @click="handleReadClick(article)" class="read-button">
                开始阅读 >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: #333;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-card {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  height: 300px;
  justify-content: space-between;
  align-items: center;
}

/* 图片在左侧布局 */
.article-card.image-left {
  flex-direction: row;
}

/* 图片在右侧布局 */
.article-card.image-right {
  flex-direction: row-reverse;
}

.article-image-container {
  width: 40%;
  min-width: 40%;
  margin: 0;
  overflow: hidden;
  border-radius: 0;
  height: 100%;
}
.article-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.article-content {
  width: 40%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 40%;
}

.article-card.no-image .article-content {
  padding-left: 2rem;
  width: 100%;
}

.section-title {
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.article-summary {
  margin-bottom: 1rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 300;
  color: #666;
  line-height: 1.5;
  -webkit-line-clamp: 3;
}
.article-actions {
  display: flex;
  justify-content: flex-start;
}
.read-button {
  padding: 15px 20px;
  font-size: 1.2rem;
  border-radius: 8px;
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.read-button:hover {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .article-card,
  .article-card.image-left,
  .article-card.image-right {
    flex-direction: column;
    height: auto;
    justify-content: flex-start;
  }

  .article-image-container {
    width: 100%;
    height: 220px;
    border-radius: 8px;
  }

  .article-content {
    width: 100%;
    flex: 1;
    margin-left: 0;
  }

  .article-image {
    border-radius: 8px;
  }
}
</style>

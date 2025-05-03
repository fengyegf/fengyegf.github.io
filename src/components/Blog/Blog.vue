<template>
  <div>
    <h1 class="text-3xl font-bold p-5 mb-0">博客列表</h1>
    <div class="h-1 w-20 bg-blue-500 ml-5 rounded-full"></div>

    <!-- 文章卡片网格 -->
    <div class="flex flex-wrap p-5">
      <Card v-for="article in paginatedArticles" :key="article.path" :article="article"
        @click="navigateToBlog(article.path)" />
    </div>

    <!-- 无文章提示 -->
    <div v-if="articles.length === 0" class="p-10 text-center text-gray-500">
      暂无文章
    </div>
    <div class="flex justify-center mt-5">
      <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, computed } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";
import Pagination from "../Pagination.vue";

const router = useRouter();
const articles = ref([]);
const loaded = ref(false);
const currentPage = ref(1);
const pageSize = 6; // 每页显示6篇文章

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(articles.value.length / pageSize) || 1;
});

// 获取当前页的文章
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return articles.value.slice(start, end);
});

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page;
  // 回到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 加载所有 markdown 文件（包括子文件夹）
const loadArticles = async () => {
  if (loaded.value) return;

  try {
    // 加载根目录和所有子文件夹中的 markdown 文件
    const rootFiles = import.meta.glob("../../md/*.md");
    const subFolderFiles = import.meta.glob("../../md/*/*.md");

    // 合并所有文件路径
    const mdFiles = { ...rootFiles, ...subFolderFiles };

    // 要排除的特定文件路径
    const excludePaths = ["../../md/spec/blog.md"];

    for (const path in mdFiles) {
      // 跳过排除的文件
      if (excludePaths.includes(path)) {
        continue;
      }

      const module = await mdFiles[path]();
      if (module.attributes) {
        const { title, published, image, category, description, draft } =
          module.attributes;

        // 跳过标记为草稿的文章
        if (draft === true) continue;

        articles.value.push({
          title: title || "无标题",
          published: published || "",
          image: image || "",
          category: category || "",
          description: description || "",
          path: path,
        });
      }
    }

    // 按发布日期排序（从新到旧）
    articles.value.sort((a, b) => {
      if (!a.published) return 1;
      if (!b.published) return -1;
      return new Date(b.published) - new Date(a.published);
    });

    loaded.value = true;

    // 预加载所有文章图片
    preloadImages();
  } catch (error) {
    console.error("加载文章失败:", error);
  }
};

// 预加载所有文章图片
const preloadImages = () => {
  articles.value.forEach(article => {
    if (article.image) {
      const img = new Image();
      img.src = article.image;
    }
  });
};

onMounted(loadArticles);
onActivated(loadArticles);

// 文章点击处理
const navigateToBlog = (path) => {
  // 使用相对路径转换，支持子文件夹结构
  const relativePath = path.replace(/^\.\.\/\.\.\/md\//, "").replace(/\.md$/, "");
  router.push({ name: "blog", params: { path: relativePath } });
};
</script>
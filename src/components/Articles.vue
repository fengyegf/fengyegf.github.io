<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold p-3 md:p-5 mb-0">{{ frontmatter.title }}</h1>
    <div class="h-1 w-16 md:w-20 bg-blue-500 ml-3 md:ml-5 rounded-full"></div>
    <div class="p-3 md:p-5 flex flex-wrap items-center text-gray-500 text-xs md:text-sm">
      <span>{{ formatDate(frontmatter.published) }}</span>
      <span v-if="frontmatter.category" class="ml-2 md:ml-4">
        {{ frontmatter.category }}
      </span>
      <div class="w-full md:w-auto md:ml-auto flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-0">
        <span v-for="tag in frontmatter.tags" :key="tag" class="badge badge-outline text-xs">
          #{{ tag }}
        </span>
      </div>
    </div>
    <img v-if="frontmatter.image" class="rounded-xl mt-2 w-full object-cover max-h-60 md:max-h-96"
      :src="frontmatter.image" :alt="frontmatter.title || 'bg'" @error="handleImageError" />
    <article class="prose max-w-none w-full p-3 md:p-5 prose-sm md:prose-base">
      <div v-html="content"></div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { processCustomBlocks } from "./utils/markdown";

const route = useRoute();
const content = ref("");
const frontmatter = ref({
  title: "文章加载中...",
  image: "",
  published: "",
  category: "",
  tags: [],
});

// 格式化日期显示
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// 处理图片加载错误
const handleImageError = () => {
  frontmatter.value.image = "";
};

// 预加载所有可能的 Markdown 文件
const mdFiles = {
  // 博客文章 - 根目录
  ...import.meta.glob("../md/*.md"),
  // 博客文章 - 一级子文件夹
  ...import.meta.glob("../md/*/*.md"),
  // 生活文章
  ...import.meta.glob("../life/*.md"),
  ...import.meta.glob("../life/*/*.md"),
};

// 加载文章内容函数
const loadArticle = async () => {
  try {
    const path = route.params.path;
    const type = route.name; // "blog" 或 "life"

    // 构建完整的文件路径
    let fullPath;
    if (type === "blog") {
      fullPath = `../md/${path}.md`;
    } else if (type === "life") {
      fullPath = `../life/${path}.md`;
    } else {
      throw new Error("未知的文章类型");
    }

    // 检查路径是否存在于预加载的文件中
    if (!mdFiles[fullPath]) {
      throw new Error(`找不到文章: ${path}`);
    }

    // 加载文章
    const module = await mdFiles[fullPath]();

    // 获取 frontmatter 数据
    if (module.attributes) {
      frontmatter.value = {
        title: module.attributes.title || "无标题",
        image: module.attributes.image || "",
        published: module.attributes.published || "",
        category: module.attributes.category || "",
        tags: module.attributes.tags || [],
      };
    }

    // 获取内容 HTML 并处理自定义块
    if (module.html) {
      content.value = processCustomBlocks(module.html);
    }

    // 代码高亮处理
    await nextTick(() => {
      document.querySelectorAll("pre code").forEach((el) => {
        if (window.hljs) {
          window.hljs.highlightElement(el);
        }
      });
    });
  } catch (error) {
    console.error("加载文章失败:", error);
    content.value = `<p class="text-red-500">文章加载失败: ${error.message}</p>`;
  }
};

// 监听路由参数变化，当路径改变时重新加载文章
watch(
  () => route.params.path,
  () => {
    loadArticle();
  }
);

// 首次加载
onMounted(() => {
  loadArticle();
});
</script>

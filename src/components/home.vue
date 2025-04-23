<template>
  <div class="w-full max-w-full">
    <h1 class="text-2xl md:text-3xl font-bold p-3 md:p-5 mb-0">{{ frontmatter.title }}</h1>
    <div class="h-1 w-16 md:w-20 bg-blue-500 ml-3 md:ml-5 rounded-full"></div>
    <img class="rounded-xl mt-3 md:mt-6 w-full object-cover h-48 md:h-96"
      :src="frontmatter.image ? frontmatter.image : ''" :alt="frontmatter.title || 'bg'" />
    <article class="prose max-w-none w-full p-3 md:p-5 prose-sm md:prose-base">
      <div v-html="content"></div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const content = ref("");
const frontmatter = ref({
  title: "博客",
  image: "",
  published: "",
  category: "",
  tags: [],
});

onMounted(async () => {
  try {
    // 使用动态导入加载 markdown 文件
    const blogModule = await import("../md/spec/blog.md");

    // 获取 frontmatter 数据
    if (blogModule.attributes) {
      frontmatter.value = {
        title: blogModule.attributes.title || "博客",
        image: blogModule.attributes.image || "",
        published: blogModule.attributes.published || "",
        category: blogModule.attributes.category || "",
        tags: blogModule.attributes.tags || [],
      };
    }

    // 获取内容 HTML
    if (blogModule.html) {
      content.value = blogModule.html;
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
  }
});
</script>
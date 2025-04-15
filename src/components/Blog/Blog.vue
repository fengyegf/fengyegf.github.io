<template>
  <div>
    <h1 class="text-3xl font-bold p-5 mb-0">博客列表</h1>
    <div class="h-1 w-20 bg-blue-500 ml-5 rounded-full"></div>

    <!-- 文章卡片网格 -->
    <div class="flex flex-wrap p-5">
      <Card v-for="article in articles" :key="article.path" :article="article" @click="navigateToBlog(article.path)" />
    </div>

    <!-- 无文章提示 -->
    <div v-if="articles.length === 0" class="p-10 text-center text-gray-500">
      暂无文章
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";

const router = useRouter();
const articles = ref([]);

// 加载所有 markdown 文件
onMounted(async () => {
  try {
    const mdFiles = import.meta.glob("../../md/*.md");

    for (const path in mdFiles) {
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
  } catch (error) {
    console.error("加载文章失败:", error);
  }
});

// 文章点击处理
const navigateToBlog = (path) => {
  // 使用相对路径转换
  const relativePath = path.replace("../../md/", "").replace(".md", "");
  router.push({ name: "blog", params: { path: relativePath } });
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold p-5 mb-0">时间轴</h1>
    <div class="h-1 w-20 bg-blue-500 ml-5 rounded-full"></div>

    <div class="p-5">
      <!-- 按年份和月份组织文章 -->
      <div v-for="year in sortedYears" :key="year" class="mb-10">
        <!-- 年份 -->
        <time-component :label="`${year}年`" />

        <!-- 每个月份下的文章 -->
        <div v-for="month in sortedMonths(year)" :key="month" class="mt-4">
          <!-- 月份 -->
          <div class="pl-20 mb-4">
            <time-component :label="`${month}月`" />
          </div>

          <!-- 该月的文章 -->
          <div class="pl-40 space-y-4">
            <long
              v-for="article in groupedArticles[year][month]"
              :key="article.title"
              :day="`${article.month}-${article.day}`"
              :title="article.title"
              :tags="article.tags"
              :path="article.path"
              @click="navigateToArticle(article.path)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import timeComponent from "./time.vue";
import long from "./long.vue";

const router = useRouter();
// 存储所有文章
const articles = ref([]);

// 从所有 markdown 文件加载文章信息
onMounted(async () => {
  try {
    // 使用更广泛的匹配模式，包括所有子文件夹
    const mdFiles = import.meta.glob("../../md/**/*.md");

    for (const path in mdFiles) {
      // 排除spec文件夹中的文章
      if (path.includes("/spec/")) continue;

      const module = await mdFiles[path]();
      if (module.attributes) {
        const { title, published, tags, draft } = module.attributes;

        // 跳过标记为草稿的文章
        if (draft === true) continue;

        if (published) {
          const date = new Date(published);
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");

          articles.value.push({
            title: title || "无标题",
            year,
            month,
            day,
            fullDate: published,
            tags: tags || [],
            path: path, // 保存文件路径
          });
        }
      }
    }

    // 按日期排序（从新到旧）
    articles.value.sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));
  } catch (error) {
    console.error("加载文章失败:", error);
  }
});

// 按年份和月份对文章进行分组
const groupedArticles = computed(() => {
  const grouped = {};

  articles.value.forEach((article) => {
    if (!grouped[article.year]) {
      grouped[article.year] = {};
    }

    if (!grouped[article.year][article.month]) {
      grouped[article.year][article.month] = [];
    }

    grouped[article.year][article.month].push(article);
  });

  return grouped;
});

// 获取按降序排列的年份列表（从新到旧）
const sortedYears = computed(() => {
  return Object.keys(groupedArticles.value).sort((a, b) => b - a);
});

// 获取指定年份下按降序排列的月份列表（从新到旧）
const sortedMonths = (year) => {
  return Object.keys(groupedArticles.value[year]).sort((a, b) => b - a);
};

// 添加导航到文章的方法
const navigateToArticle = (path) => {
  // 提取相对路径，保留子文件夹结构
  const relativePath = path
    .replace(/^\.\.\/\.\.\/md\//, "")
    .replace(/\.md$/, "");
  router.push({ name: "blog", params: { path: relativePath } });
};
</script>

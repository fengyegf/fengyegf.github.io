<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold p-3 md:p-5 mb-0">时间轴</h1>
    <div class="h-1 w-16 md:w-20 bg-blue-500 ml-3 md:ml-5 rounded-full"></div>

    <div class="p-2 md:p-5">
      <!-- 按年份和月份组织文章 -->
      <div v-for="year in sortedYears" :key="year" class="mb-5 md:mb-10">
        <!-- 年份 -->
        <div class="animate-on-scroll slide-in-left w-full">
          <time-component :label="`${year}年`" />
        </div>

        <!-- 每个月份下的文章 -->
        <div v-for="month in sortedMonths(year)" :key="month" class="mt-3 md:mt-4">
          <!-- 月份：手机上不缩进，桌面保持缩进 -->
          <div class="md:pl-20 mb-2 md:mb-4 animate-on-scroll slide-in-right">
            <time-component :label="`${month}月`" />
          </div>

          <!-- 该月的文章：手机上不缩进，桌面保持缩进 -->
          <div class="md:pl-40 space-y-2 md:space-y-4">
            <div v-for="article in groupedArticles[year][month]" :key="article.title"
              class="animate-on-scroll fade-in-up">
              <long :day="`${article.month}-${article.day}`" :title="article.title" :tags="article.tags"
                :path="article.path" @click="navigateToArticle(article.path)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import timeComponent from "./time.vue";
import long from "./long.vue";

const router = useRouter();
// 存储所有文章
const articles = ref([]);

// 从所有 markdown 文件加载文章信息，包括二级目录
onMounted(async () => {
  try {
    // 预加载所有可能的 Markdown 文件，包括根目录和一级子文件夹
    const mdFiles = {
      // 博客文章 - 根目录
      ...import.meta.glob("../../md/*.md"),
      // 博客文章 - 一级子文件夹
      ...import.meta.glob("../../md/*/*.md"),
    };

    for (const path in mdFiles) {
      // 排除spec目录下的所有文章
      if (path.includes('/spec/')) {
        continue;  // 跳过该目录下的文章
      }

      const module = await mdFiles[path]();
      if (module.attributes) {
        const { title, published, tags } = module.attributes;

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

  // 在文章加载完成后设置Intersection Observer
  await nextTick();
  setupScrollAnimation();
});

// 设置滚动动画
const setupScrollAnimation = () => {
  const animateItems = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    animateItems.forEach(item => {
      observer.observe(item);
    });
  } else {
    // 降级处理：对于不支持IntersectionObserver的浏览器，直接显示所有元素
    animateItems.forEach(item => {
      item.classList.add('animate-visible');
    });
  }
};

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

// 修改导航到文章的方法，以支持子文件夹
const navigateToArticle = (path) => {
  // 移除基础路径部分以获得相对路径
  let relativePath = path
    .replace("../../md/", "")  // 移除前缀路径
    .replace(".md", "");       // 移除.md后缀

  // 输出调试信息
  console.log("原始路径:", path);
  console.log("处理后路径:", relativePath);

  // 导航到文章页面
  router.push({ name: "blog", params: { path: relativePath } });
};
</script>

<style scoped>
/* 基础样式 - 初始隐藏状态 */
.animate-on-scroll {
  opacity: 0;
  transition: all 0.8s ease-out;
}

/* 滑入动画 - 从左侧 */
.slide-in-left {
  transform: translateX(-50px);
}

/* 滑入动画 - 从右侧 */
.slide-in-right {
  transform: translateX(50px);
}

/* 渐入动画 - 从下方 */
.fade-in-up {
  transform: translateY(30px);
}

/* 可见状态 */
.animate-visible {
  opacity: 1;
  transform: translate(0);
}
</style>

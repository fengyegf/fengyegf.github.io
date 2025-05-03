<template>
  <div>
    <top :tags="allTags" :selectedTag="selectedTag" @select-tag="selectTag" />

    <div class="flex flex-wrap p-5">
      <Card v-for="item in paginatedItems" :key="item.path" :item="item" @click="navigateToItem(item.path)" />
    </div>

    <!-- 无内容提示 -->
    <div v-if="filteredItems.length === 0" class="p-10 text-center text-gray-500">
      暂无内容
    </div>
    <div class="flex justify-center mt-5">
      <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";
import top from "./top.vue";
import Pagination from "../Pagination.vue";

const router = useRouter();
const lifeItems = ref([]);
const selectedTag = ref("");
const currentPage = ref(1);
const pageSize = 9; // 每页显示9个项目

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page;
  // 回到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 加载所有 life 目录下的 markdown 文件，包括子文件夹
onMounted(async () => {
  try {
    // 同时加载根目录和所有子文件夹中的 Markdown 文件
    const lifeFiles = {
      // 根目录文件
      ...import.meta.glob("../../life/*.md"),
      // 子文件夹文件
      ...import.meta.glob("../../life/*/*.md"),
    };

    for (const path in lifeFiles) {
      const module = await lifeFiles[path]();
      if (module.attributes) {
        const { title, published, image, category, tags, description, draft } =
          module.attributes;

        // 跳过标记为草稿的文章
        if (draft === true) continue;

        lifeItems.value.push({
          title: title || "无标题",
          published: published || "",
          image: image || "",
          category: category || "生活记录",
          tags: tags || [],
          description: description || "",
          path: path,
        });
      }
    }

    // 按发布日期排序（从新到旧）
    lifeItems.value.sort((a, b) => {
      if (!a.published) return 1;
      if (!b.published) return -1;
      return new Date(b.published) - new Date(a.published);
    });
  } catch (error) {
    console.error("加载生活记录失败:", error);
  }
});

// 提取所有唯一标签
const allTags = computed(() => {
  const tags = new Set();
  lifeItems.value.forEach((item) => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
});

// 根据选中的标签过滤内容
const filteredItems = computed(() => {
  if (!selectedTag.value) return lifeItems.value;

  return lifeItems.value.filter(
    (item) => item.tags && item.tags.includes(selectedTag.value)
  );
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / pageSize) || 1;
});

// 获取当前页的项目
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredItems.value.slice(start, end);
});

// 当标签变化时重置页码
const selectTag = (tag) => {
  selectedTag.value = tag;
  currentPage.value = 1; // 重置到第一页
};

// 点击处理 - 支持二级目录
const navigateToItem = (path) => {
  // 简化路径处理，直接移除前缀和后缀
  let relativePath = path
    .replace("../../life/", "")  // 移除前缀路径
    .replace(".md", "");         // 移除.md后缀

  // 输出调试信息
  console.log("原始路径:", path);
  console.log("处理后路径:", relativePath);

  router.push({ name: "life", params: { path: relativePath } });
};
</script>

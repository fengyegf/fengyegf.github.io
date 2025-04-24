<template>
  <div>
    <top :tags="allTags" :selectedTag="selectedTag" @select-tag="selectTag" />

    <div class="flex flex-wrap p-5">
      <Card v-for="item in filteredItems" :key="item.path" :item="item" @click="navigateToItem(item.path)" />
    </div>

    <!-- 无内容提示 -->
    <div v-if="filteredItems.length === 0" class="p-10 text-center text-gray-500">
      暂无内容
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Card from "./Card.vue";
import top from "./top.vue";

const router = useRouter();
const lifeItems = ref([]);
const selectedTag = ref("");

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

// 选择标签
const selectTag = (tag) => {
  selectedTag.value = tag;
};

// 点击处理 - 支持二级目录
const navigateToItem = (path) => {
  // 检测是根目录还是子文件夹中的文件
  let relativePath;

  if (path.includes("/life/") && path.split("/").length > 3) {
    // 子文件夹中的文件，例如 "../../life/1/1.md"
    const parts = path.split("/");
    const folder = parts[parts.length - 2]; // 文件夹名称
    const filename = parts[parts.length - 1].replace(".md", ""); // 文件名
    relativePath = `${folder}/${filename}`;
  } else {
    // 根目录中的文件，例如 "../../life/1.md"
    relativePath = path.replace("../../life/", "").replace(".md", "");
  }

  router.push({ name: "life", params: { path: relativePath } });
};
</script>

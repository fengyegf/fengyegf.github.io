<template>
  <div class="collection-container">
    <h1 class="collection-title">我的收藏</h1>
    <div class="collection-grid">
      <div
        v-for="(item, index) in collectionItems"
        :key="index"
        class="collection-card"
      >
        <div class="card-body">
          <h2 class="card-title">{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <div class="card-actions">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="visit-button"
            >
              访问网站
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collectionData from "@/data/collection.json";

export default {
  name: "Collection",
  data() {
    return {
      collectionItems: [],
    };
  },
  created() {
    // 组件创建时加载数据
    this.loadCollectionData();
  },
  methods: {
    loadCollectionData() {
      // 直接使用导入的JSON数据
      this.collectionItems = collectionData;
    },
  },
};
</script>

<style scoped>
.collection-container {
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.collection-title {
  text-align: left;
  margin-bottom: 2rem;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行3个卡片 */
  gap: 20px; /* 卡片间距 */
}

.card-body {
  padding: 20px;
  background-color: #f8f9fa;
  height: 100%;
}

.collection-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.collection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-title {
  margin-top: 0;
  color: #333;
}

.visit-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.visit-button:hover {
  background-color: #0056b3;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .collection-grid {
    grid-template-columns: repeat(2, 1fr); /* 中等屏幕每行2个 */
  }
}

@media (max-width: 576px) {
  .collection-grid {
    grid-template-columns: 1fr; /* 小屏幕每行1个 */
  }
}
</style>

<template>
  <div class="collection-container">
    <h1 class="collection-title">友情链接</h1>

    <div class="friends-grid">
      <a
        v-for="(friend, index) in friends"
        :key="index"
        :href="friend.url"
        target="_blank"
        rel="noopener noreferrer"
        class="friend-card"
      >
        <div class="friend-avatar">
          <img
            v-if="friend.avatar"
            :src="friend.avatar"
            :alt="friend.name"
            @error="handleImageError($event, friend)"
          />
          <div v-else class="avatar-placeholder">
            {{ friend.name.charAt(0).toUpperCase() }}
          </div>
        </div>

        <div class="friend-info">
          <h3 class="friend-name">{{ friend.name }}</h3>
          <p class="friend-description">{{ friend.description }}</p>
          <div
            class="friend-tag-container"
            v-if="friend.tags && friend.tags.length"
          >
            <span
              v-for="(tag, tagIndex) in friend.tags"
              :key="tagIndex"
              class="friend-tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import linksData from "@/data/link.json";

const friends = ref([]);

// 处理头像加载失败的情况
const handleImageError = (event, friend) => {
  friend.avatar = null; // 将头像设为null，触发占位符显示
};

onMounted(() => {
  // 从JSON文件加载数据
  friends.value = linksData;
});
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
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  letter-spacing: -0.5px;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.friend-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}

.friend-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color, #3498db);
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
}

.friend-info {
  flex: 1;
  overflow: hidden;
}

.friend-name {
  margin: 0 0 8px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.friend-description {
  margin: 0 0 12px;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.friend-tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.friend-tag {
  display: inline-block;
  font-size: 0.75rem;
  background-color: rgba(52, 152, 219, 0.1);
  color: var(--primary-color, #3498db);
  padding: 2px 8px;
  border-radius: 4px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .friends-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }

  .friend-card {
    padding: 16px;
  }

  .friend-avatar {
    width: 50px;
    height: 50px;
  }

  .friend-name {
    font-size: 1.1rem;
  }
}
</style>

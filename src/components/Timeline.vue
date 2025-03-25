<template>
  <div class="collection-container">
    <h1 class="collection-title">时间轴</h1>
    <div class="timeline">
      <div
        v-for="(event, index) in timelineEvents"
        :key="index"
        class="timeline-item"
        :class="{
          right: event.position === 'right',
          left: event.position === 'left',
        }"
      >
        <div
          class="timeline-badge"
          :style="{ backgroundColor: event.color || '#3498db' }"
        ></div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h3 class="timeline-title">{{ event.title }}</h3>
            <p class="timeline-date">{{ formatDate(event.date) }}</p>
          </div>
          <div class="timeline-body">
            <p>{{ event.content }}</p>

            <!-- 媒体内容网格 -->
            <div
              v-if="hasMedia(event)"
              class="timeline-media-grid"
              :class="getMediaGridClass(event)"
            >
              <!-- 图片展示 -->
              <div
                v-for="(img, imgIndex) in event.images"
                :key="`img-${imgIndex}`"
                class="timeline-media-item timeline-image-container"
              >
                <img
                  :src="img.url"
                  :alt="img.caption || event.title"
                  class="timeline-image"
                />
                <div v-if="img.caption" class="timeline-media-caption">
                  {{ img.caption }}
                </div>
              </div>

              <!-- 单张图片展示(向后兼容) -->
              <div
                v-if="event.image && !event.images"
                class="timeline-media-item timeline-image-container"
              >
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="timeline-image"
                />
              </div>

              <!-- 视频展示 -->
              <div
                v-for="(vid, vidIndex) in event.videos"
                :key="`vid-${vidIndex}`"
                class="timeline-media-item timeline-video-container"
              >
                <iframe
                  :src="vid.url"
                  :width="vid.width || 560"
                  :height="vid.height || 315"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="timeline-video"
                ></iframe>
                <div v-if="vid.caption" class="timeline-media-caption">
                  {{ vid.caption }}
                </div>
              </div>

              <!-- 单个视频展示(向后兼容) -->
              <div
                v-if="event.video && !event.videos"
                class="timeline-media-item timeline-video-container"
              >
                <iframe
                  :src="event.video"
                  :width="event.videoWidth || 560"
                  :height="event.videoHeight || 315"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="timeline-video"
                ></iframe>
              </div>
            </div>

            <!-- 链接按钮 -->
            <div v-if="event.link" class="timeline-link">
              <a :href="event.link" target="_blank" rel="noopener">查看更多</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import timelineData from "@/data/timeline.json";

// 格式化日期的函数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const timelineEvents = ref([]);

// 判断事件是否包含媒体
const hasMedia = (event) => {
  return (
    event.image ||
    event.images?.length > 0 ||
    event.video ||
    event.videos?.length > 0
  );
};

// 根据媒体数量决定网格类
const getMediaGridClass = (event) => {
  // 计算总媒体数量
  const imagesCount = event.images?.length || (event.image ? 1 : 0);
  const videosCount = event.videos?.length || (event.video ? 1 : 0);
  const totalCount = imagesCount + videosCount;

  if (totalCount === 1) {
    return "grid-1";
  } else if (totalCount === 2) {
    return "grid-2";
  } else if (totalCount === 3) {
    return "grid-3";
  } else if (totalCount >= 4 && totalCount <= 6) {
    return "grid-2-3"; // 2行3列
  } else if (totalCount > 6) {
    return "grid-3-3"; // 3行3列（最多显示9个）
  }

  return "grid-1"; // 默认
};

// 随机分配左右位置
const assignRandomPositions = (events) => {
  return events.map((event) => {
    const randomPosition = Math.random() > 0.5 ? "right" : "left";
    return {
      ...event,
      position: randomPosition,
    };
  });
};

onMounted(() => {
  timelineEvents.value = assignRandomPositions(timelineData);
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
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  margin-left: -2px;
  background-color: #e0e0e0;
  z-index: 0;
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
  width: 100%;
}

.timeline-item::after {
  content: "";
  display: table;
  clear: both;
}

.timeline-badge {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* 左侧面板 */
.timeline-item.left .timeline-panel {
  float: left;
  width: calc(50% - 50px);
  margin-left: 0;
  margin-right: 40px;
}

.timeline-item.left .timeline-panel::after {
  content: "";
  position: absolute;
  top: 16px;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #f8f9fa;
}

/* 右侧面板 */
.timeline-item.right .timeline-panel {
  float: right;
  width: calc(50% - 50px);
  margin-left: 40px;
  margin-right: 0;
}

.timeline-item.right .timeline-panel::after {
  content: "";
  position: absolute;
  top: 16px;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #f8f9fa;
}

.timeline-panel {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.timeline-heading {
  margin-bottom: 15px;
}

.timeline-title {
  margin: 0;
  color: #333;
  font-size: 1.4rem;
  font-weight: 600;
}

.timeline-date {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
}

.timeline-body p {
  margin: 0 0 15px;
  line-height: 1.5;
  color: #555;
}

/* 媒体网格系统 */
.timeline-media-grid {
  display: grid;
  gap: 12px;
  margin: 15px 0;
}

/* 单项 */
.timeline-media-grid.grid-1 {
  grid-template-columns: 1fr;
}

/* 两项横向 */
.timeline-media-grid.grid-2 {
  grid-template-columns: 1fr 1fr;
}

/* 三项横向 */
.timeline-media-grid.grid-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

/* 2行3列 */
.timeline-media-grid.grid-2-3 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
}

/* 3行3列 */
.timeline-media-grid.grid-3-3 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
}

.timeline-media-item {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.timeline-media-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 10px;
  font-size: 0.85rem;
}

/* 增加高度 */
.timeline-image-container {
  height: 0;
  position: relative;
  background-color: #f0f0f0;
}

/* 根据不同布局调整高度 */
.timeline-media-grid.grid-1 .timeline-image-container,
.timeline-media-grid.grid-1 .timeline-video-container {
  padding-top: 65%;
}

.timeline-media-grid.grid-2 .timeline-image-container,
.timeline-media-grid.grid-2 .timeline-video-container {
  padding-top: 75%;
}

.timeline-media-grid.grid-3 .timeline-image-container,
.timeline-media-grid.grid-3 .timeline-video-container {
  padding-top: 85%;
}

.timeline-media-grid.grid-2-3 .timeline-image-container,
.timeline-media-grid.grid-2-3 .timeline-video-container {
  padding-top: 80%;
}

.timeline-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timeline-video-container {
  height: 0;
  position: relative;
  background-color: #000;
}

.timeline-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.timeline-link {
  margin-top: 15px;
}

.timeline-link a {
  display: inline-block;
  padding: 6px 12px;
  background-color: var(--primary-color, #3498db);
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .timeline-media-grid.grid-3,
  .timeline-media-grid.grid-2-3,
  .timeline-media-grid.grid-3-3 {
    grid-template-columns: 1fr 1fr;
  }

  .timeline-media-grid.grid-3 .timeline-image-container,
  .timeline-media-grid.grid-3 .timeline-video-container,
  .timeline-media-grid.grid-2-3 .timeline-image-container,
  .timeline-media-grid.grid-2-3 .timeline-video-container {
    padding-top: 75%;
  }
}

@media (max-width: 768px) {
  .timeline::before {
    left: 40px;
  }

  .timeline-badge {
    left: 40px;
    margin-left: 0;
  }

  .timeline-item.left .timeline-panel,
  .timeline-item.right .timeline-panel {
    float: right;
    width: calc(100% - 90px);
    margin-left: 70px;
    margin-right: 0;
  }

  .timeline-item.left .timeline-panel::after,
  .timeline-item.right .timeline-panel::after {
    left: -10px;
    right: auto;
    border-left: 0;
    border-right: 10px solid #f8f9fa;
  }
}

@media (max-width: 576px) {
  .timeline-media-grid.grid-2,
  .timeline-media-grid.grid-3,
  .timeline-media-grid.grid-2-3,
  .timeline-media-grid.grid-3-3 {
    grid-template-columns: 1fr;
  }
}
</style>

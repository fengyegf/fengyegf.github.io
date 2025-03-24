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

            <!-- 图片显示 -->
            <div
              v-if="event.image && !event.video"
              class="timeline-image-container"
            >
              <img
                :src="event.image"
                :alt="event.title"
                class="timeline-image"
              />
            </div>

            <!-- 视频显示 -->
            <div v-if="event.video" class="timeline-video-container">
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

// 完全随机分配左右位置
const assignRandomPositions = (events) => {
  return events.map((event) => {
    // 对每个事件完全随机决定左右位置
    const randomPosition = Math.random() > 0.5 ? "right" : "left";

    return {
      ...event,
      position: randomPosition,
    };
  });
};

onMounted(() => {
  // 从JSON文件加载数据并随机分配位置
  console.log("Timeline component mounted");
  timelineEvents.value = assignRandomPositions(timelineData);
  console.log("Timeline events:", timelineEvents.value);
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.timeline-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
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
  margin: 0 0 10px;
  line-height: 1.5;
  color: #555;
}

.timeline-image-container {
  margin-top: 15px;
  border-radius: 4px;
  overflow: hidden;
}

.timeline-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

/* 视频容器样式 */
.timeline-video-container {
  margin-top: 15px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 宽高比 */
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
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.timeline-link a:hover {
  background-color: var(--primary-hover);
}

/* 响应式设计 */
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
</style>

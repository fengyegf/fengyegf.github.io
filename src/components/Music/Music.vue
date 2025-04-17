<template>
    <div>
        <h1 class="text-3xl font-bold p-5 mb-0">音乐空间</h1>
        <div class="h-1 w-20 bg-blue-500 ml-5 rounded-full"></div>

        <!-- 播放器信息显示区域 -->
        <div class="p-5">
            <!-- 播放器基本信息 -->
            <div class="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <!-- 专辑封面 -->
                <div class="w-48 h-48 overflow-hidden rounded-lg shadow-md flex-shrink-0">
                    <img v-if="playerImage" :src="playerImage" alt="专辑封面" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span class="text-gray-400">暂无封面</span>
                    </div>
                </div>

                <!-- 播放信息 -->
                <div class="flex-grow">
                    <h2 class="text-2xl font-bold mb-2">{{ playerSong || '暂无播放曲目' }}</h2>

                    <!-- 播放状态 -->
                    <div class="mb-3 text-gray-600">
                        状态: <span class="font-medium" :class="isPlaying ? 'text-green-500' : 'text-gray-500'">
                            {{ isPlaying ? '播放中' : '已暂停' }}
                        </span>
                    </div>

                    <!-- 播放进度条 -->
                    <div class="mb-3">
                        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500 transition-all duration-300"
                                :style="{ width: progressPercentage + '%' }"></div>
                        </div>
                        <div class="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{{ formatTime(currentTime) }}</span>
                            <span>{{ formatTime(totalTime) }}</span>
                        </div>
                    </div>

                    <!-- 当前歌词 -->
                    <div class="mt-3 text-lg font-medium" :class="isPlaying ? 'text-blue-600' : 'text-gray-700'">
                        {{ getCurrentLyric() }}
                    </div>
                </div>
            </div>

            <!-- 歌词组件 -->
            <LyricDisplay :lyrics="lyrics" :currentLyricIndex="currentLyricIndex" />

            <!-- 播放列表组件 -->
            <PlayList :playlist="playlist" :isOperationInProgress="isOperationInProgress"
                @song-click="handleSongClick" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePlayerInfo } from '../../assets/js/mu.js';
import LyricDisplay from './LyricDisplay.vue';
import PlayList from './PlayList.vue';

// 获取播放器信息
const {
    playerImage,
    currentTime,
    totalTime,
    playerSong,
    isPlaying,
    lyrics,
    currentLyricIndex,
    playlist,
    playSong
} = usePlayerInfo();

// 状态记录
const isOperationInProgress = ref(false);

// 计算播放进度百分比
const progressPercentage = computed(() => {
    if (totalTime.value <= 0) return 0;
    return (currentTime.value / totalTime.value) * 100;
});

// 获取当前歌词
const getCurrentLyric = () => {
    if (currentLyricIndex.value === -1) return '暂无歌词';
    if (lyrics.value.length === 0) return '加载中...';
    return lyrics.value[currentLyricIndex.value]?.text || '暂无歌词';
};

// 格式化时间显示
const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 处理歌曲点击
const handleSongClick = (index) => {
    if (isOperationInProgress.value) return;
    isOperationInProgress.value = true;
    playSong(index);
    setTimeout(() => {
        isOperationInProgress.value = false;
    }, 500);
};
</script>

<style scoped>
/* 基础样式保持不变 */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

button:active {
    transform: scale(0.95);
}
</style>
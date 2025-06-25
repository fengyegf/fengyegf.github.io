<template>
    <div class="music-player-container">
        <h1 class="text-2xl md:text-3xl font-bold p-3 md:p-5 mb-0">音乐空间</h1>
        <div class="h-1 w-16 md:w-20 bg-blue-500 ml-3 md:ml-5 rounded-full"></div>

        <!-- 播放器信息显示区域 -->
        <div class="p-3 md:p-5">
            <!-- 播放器基本信息 -->
            <div class="player-main-area bg-white rounded-xl shadow-md p-4 md:p-6 mb-4 md:mb-8">
                <div class="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6">
                    <!-- 专辑封面 - 添加点击事件控制播放/暂停 -->
                    <div class="album-cover-container" @click="togglePlay">
                        <div class="album-cover-inner">
                            <img v-if="playerImage" :src="playerImage" alt="专辑封面" class="w-full h-full object-cover" />
                            <div v-else
                                class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 md:h-16 w-12 md:w-16 text-gray-400"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                        </div>
                        <!-- 播放/暂停图标覆盖层 -->
                        <div class="play-overlay">
                            <div class="play-icon" v-if="!isPlaying">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5.14v14l11-7-11-7z"></path>
                                </svg>
                            </div>
                            <div class="pause-icon" v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- 播放信息 -->
                    <div class="flex-grow w-full">
                        <h2 class="text-xl md:text-2xl font-bold mb-1 md:mb-2 truncate">{{ playerSong || '暂无播放曲目' }}
                        </h2>

                        <!-- 当前歌词预览 -->
                        <div class="current-lyric mb-3 md:mb-4" :class="isPlaying ? 'text-blue-600' : 'text-gray-700'">
                            {{ getCurrentLyric() }}
                        </div>

                        <!-- 播放进度条 -->
                        <div class="mb-3 md:mb-4 mt-4 md:mt-6">
                            <div class="progress-bar-container">
                                <div class="progress-bar-bg"></div>
                                <div class="progress-bar-fill" :style="{ width: progressPercentage + '%' }"></div>
                                <div class="progress-bar-handle" :style="{ left: progressPercentage + '%' }"></div>
                            </div>
                            <div class="flex justify-between text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                                <span>{{ formatTime(currentTime) }}</span>
                                <span>{{ formatTime(totalTime) }}</span>
                            </div>
                        </div>

                        <!-- 播放状态 -->
                        <div class="flex items-center mt-1 md:mt-2">
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                :class="isPlaying ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                                {{ isPlaying ? '播放中' : '已暂停' }}
                                <span v-if="isPlaying" class="ml-1 flex h-1.5 md:h-2 w-1.5 md:w-2">
                                    <span
                                        class="animate-ping absolute inline-flex h-1.5 md:h-2 w-1.5 md:w-2 rounded-full bg-green-400 opacity-75"></span>
                                    <span
                                        class="relative inline-flex rounded-full h-1.5 md:h-2 w-1.5 md:w-2 bg-green-500"></span>
                                </span>
                            </span>
                        </div>
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
import { computed, ref, onMounted } from 'vue';
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

// 切换播放/暂停状态
const togglePlay = () => {
    if (isPlaying.value) {
        // 暂停播放
        const pauseButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol div b i.myhkpause.myhkfont.myhkicon-pauseCircle");
        if (pauseButton) {
            pauseButton.click();
        }
    } else {
        // 开始播放
        const playButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol div b i.myhkplay.myhkfont.myhkicon-playCircle");
        if (playButton) {
            playButton.click();
        }
    }
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
.music-player-container {
    background-color: #fff;
}

.player-main-area {
    border: 1px solid rgba(229, 231, 235, 0.5);
    transition: all 0.3s ease;
}

.album-cover-container {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .album-cover-container {
        width: 180px;
        height: 180px;
        margin: 0;
    }
}

.album-cover-inner {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
}

.album-cover-inner:hover {
    transform: scale(1.02);
}

/* 播放/暂停覆盖层样式 */
.play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
    border-radius: 12px;
}

.album-cover-container:hover .play-overlay {
    opacity: 1;
}

.play-icon,
.pause-icon {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
}

.play-icon svg,
.pause-icon svg {
    width: 30px;
    height: 30px;
}

.current-lyric {
    font-size: 0.9rem;
    line-height: 1.4;
    height: 2.8em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-style: italic;
    border-left: 2px solid #e5e7eb;
    padding-left: 0.5rem;
    margin: 0.5rem 0;
}

@media (min-width: 768px) {
    .current-lyric {
        font-size: 1.125rem;
        line-height: 1.5;
        height: 3em;
        border-left: 3px solid #e5e7eb;
        padding-left: 0.75rem;
    }
}

.progress-bar-container {
    position: relative;
    height: 6px;
    width: 100%;
    cursor: pointer;
}

@media (min-width: 768px) {
    .progress-bar-container {
        height: 8px;
    }
}

.progress-bar-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: #e5e7eb;
    border-radius: 4px;
}

.progress-bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(to right, #3b82f6, #60a5fa);
    border-radius: 4px;
    transition: width 0.1s linear;
}

.progress-bar-handle {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid #3b82f6;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    z-index: 2;
}

@media (min-width: 768px) {
    .progress-bar-handle {
        width: 16px;
        height: 16px;
    }
}

.bar {
    width: 3px;
    background-color: #3b82f6;
    border-radius: 3px;
    animation: sound 0ms -800ms linear infinite alternate;
}

.bar1 {
    height: 10px;
    animation-duration: 474ms;
}

.bar2 {
    height: 16px;
    animation-duration: 433ms;
}

.bar3 {
    height: 12px;
    animation-duration: 407ms;
}

@keyframes sound {
    0% {
        height: 3px;
    }

    100% {
        height: 15px;
    }
}
</style>
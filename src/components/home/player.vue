<template>
    <div class="glass rounded-xl flex flex-wrap items-center gap-5 p-3 mb-1">
        <div>
            <img class="w-15 h-15 rounded-sm" :src="playerImage" alt="fm" draggable="false" @contextmenu.prevent>
        </div>
        <div class="music-container" @mouseenter="showControls = true" @mouseleave="showControls = false">
            <div v-show="!showControls" class="song-info">
                <h1 class="truncate max-w-50">{{ playerSong }}</h1>
                <p class="truncate max-w-50">{{ getCurrentLyric() }}</p>
            </div>
            <div v-show="showControls" class="music-button w-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14" @click="handlePrev">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="m4.238 6.056l7.819-5.4c.396-.25.878-.183 1.226.08c.269.201.458.519.467.897v10.705c0 .884-.979 1.456-1.693 1.004l-7.82-5.367c-.65-.439-.65-1.48 0-1.919ZM0 1.742a1 1 0 1 1 2 0v10.516a1 1 0 1 1-2 0z"
                        clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14" v-show="!playing"
                    @click="handlePlay">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M2.676.02a1.74 1.74 0 0 0-.845.218a1.64 1.64 0 0 0-.895 1.433v10.677a1.64 1.64 0 0 0 .895 1.433a1.74 1.74 0 0 0 1.718-.016l8.63-5.338a1.61 1.61 0 0 0-.001-2.876L3.548.253A1.74 1.74 0 0 0 2.676.02"
                        clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14" v-show="playing"
                    @click="handlePause">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M0 1.5A1.5 1.5 0 0 1 1.5 0H4a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 4 14H1.5A1.5 1.5 0 0 1 0 12.5zM10 0a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 10 14h2.5a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 12.5 0z"
                        clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14" @click="handleNext">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M9.512 6.056L1.693.656C1.297.407.815.474.467.737A1.14 1.14 0 0 0 0 1.632v10.705c0 .884.979 1.456 1.693 1.004l7.82-5.367c.65-.439.65-1.48 0-1.919Zm4.238-4.314a1 1 0 1 0-2 0v10.516a1 1 0 0 0 2 0z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
</template>


<script setup>
import config from "@/config/Config";
import { ref, onMounted } from "vue";
const title = ref(config.title);
const message = ref(config.message);
const showControls = ref(false);

import { usePlayerInfo } from '../../assets/js/mu.js';
// 获取播放器信息
const {
    playerImage,
    playerSong,
    lyrics,
    currentLyricIndex,
    playSong
} = usePlayerInfo();

// 控制播放相关功能
const playing = ref(false);

// 使用外部播放器控制元素
const handlePlay = () => {
    const playButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol div b i.myhkicon-playCircle");
    if (playButton) {
        playButton.click();
        playing.value = true;
    }
};

const handlePause = () => {
    const pauseButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol div b i.myhkpause.myhkfont.myhkicon-pauseCircle");
    if (pauseButton) {
        pauseButton.click();
        playing.value = false;
    }
};

const handleNext = () => {
    const nextButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol i.myhknext.myhkfont.myhkicon-forward");
    if (nextButton) {
        nextButton.click();
        // 添加延时检查播放状态，因为切换歌曲有一个加载过程
        setTimeout(() => {
            checkPlayStatus();
        }, 300);
    }
};

const handlePrev = () => {
    const prevButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol i.myhkprev.myhkfont.myhkicon-backward");
    if (prevButton) {
        prevButton.click();
        // 添加延时检查播放状态
        setTimeout(() => {
            checkPlayStatus();
        }, 300);
    }
};

// 将检查播放状态逻辑提取为单独函数以便重用
const checkPlayStatus = () => {
    const pauseButton = document.querySelector("#myhkplayer .myhkplayer .myhkcontrol div b i.myhkpause.myhkfont.myhkicon-pauseCircle");
    playing.value = pauseButton !== null && window.getComputedStyle(pauseButton).display !== 'none';
};

// 监听外部播放器状态并同步
onMounted(() => {
    // 初始化播放状态
    checkPlayStatus();

    // 创建一个 MutationObserver 来监视播放器状态的变化
    const observer = new MutationObserver(mutations => {
        checkPlayStatus();
    });

    // 获取外部播放器容器并开始观察
    const playerContainer = document.querySelector("#myhkplayer");
    if (playerContainer) {
        observer.observe(playerContainer, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
});

// 获取当前歌词
const getCurrentLyric = () => {
    if (currentLyricIndex.value === -1) return '暂无歌词';
    if (lyrics.value.length === 0) return '加载中...';
    return lyrics.value[currentLyricIndex.value]?.text || '暂无歌词';
};
</script>
<style>
.music-button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 50px;
}

.music-container {
    flex: 1;
    cursor: pointer;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.song-info {
    transition: all 0.3s ease;
}
</style>
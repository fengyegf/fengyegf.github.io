<template>
    <div class="mt-6 bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <h3 class="text-lg font-semibold mb-4 border-b pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
            </svg>
            歌词
        </h3>
        <!-- 添加一个相对定位的容器，便于放置指示器 -->
        <div class="relative lyrics-wrapper">
            <!-- 中间指示线 -->
            <div class="center-indicator">
                <div class="center-line"></div>
            </div>

            <!-- 歌词容器 -->
            <div ref="lyricsContainer" class="max-h-120 overflow-y-auto py-24 hide-scrollbar"
                style="scroll-behavior: smooth;">
                <div v-if="lyrics.length > 0" class="space-y-3">
                    <p v-for="(lyric, index) in lyrics" :key="index"
                        :ref="el => { if (index === currentLyricIndex) activeLyricElement = el }" class="lyric-line"
                        :class="[
                            index === currentLyricIndex ? 'active' :
                                Math.abs(index - currentLyricIndex) <= 1 ? 'near' : 'far'
                        ]">
                        {{ lyric.text }}
                    </p>
                </div>
                <div v-else class="empty-lyrics">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2 text-gray-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>暂无歌词</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onUpdated, onMounted } from 'vue';

const props = defineProps({
    lyrics: {
        type: Array,
        required: true
    },
    currentLyricIndex: {
        type: Number,
        required: true
    }
});

const lyricsContainer = ref(null);
let activeLyricElement = null;

// 监听当前播放歌词索引的变化
watch(
    () => props.currentLyricIndex,
    async (newIndex) => {
        if (newIndex !== -1) {
            await nextTick();
            scrollToActiveLyric();
        }
    },
    { immediate: true }
);

// 监听歌词数组变化
watch(
    () => props.lyrics,
    async () => {
        await nextTick();
        if (props.currentLyricIndex !== -1) {
            scrollToActiveLyric();
        }
    }
);

// 组件挂载后执行滚动
onMounted(() => {
    // 初始添加上下填充，确保第一句和最后一句也能滚动到中间
    addPadding();
});

// 组件更新后执行滚动
onUpdated(() => {
    scrollToActiveLyric();
});

// 添加上下填充
const addPadding = () => {
    if (lyricsContainer.value) {
        const container = lyricsContainer.value;
        const containerHeight = container.offsetHeight;
        // 确保容器高度的一半空间，使第一句和最后一句歌词也能够滚动到中间
        const paddingValue = containerHeight / 2;
        container.style.paddingTop = `${paddingValue}px`;
        container.style.paddingBottom = `${paddingValue}px`;
    }
};

// 滚动到活跃歌词的函数
const scrollToActiveLyric = () => {
    if (activeLyricElement && lyricsContainer.value) {
        const container = lyricsContainer.value;
        const element = activeLyricElement;

        if (element) {
            const elementTop = element.offsetTop;
            const containerHeight = container.offsetHeight;
            // 将当前歌词定位到容器中央
            const scrollTo = elementTop - containerHeight / 2 + element.offsetHeight / 2;

            container.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        }
    }
};
</script>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

/* 歌词容器样式 */
.lyrics-wrapper {
    background-color: #fcfcfc;
    border-radius: 0.75rem;
}

/* 中间指示器 */
.center-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 3rem;
    background: linear-gradient(to right, rgba(219, 234, 254, 0.1), rgba(219, 234, 254, 0.3), rgba(219, 234, 254, 0.1));
    top: calc(50% - 1.5rem);
    border-radius: 0.5rem;
    pointer-events: none;
    z-index: 10;
}

.center-line {
    position: absolute;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(to right, rgba(96, 165, 250, 0), rgba(96, 165, 250, 0.7), rgba(96, 165, 250, 0));
    top: 50%;
}

/* 歌词行样式 */
.lyric-line {
    transition: all 0.3s ease;
    padding: 0.5rem 1.5rem;
    text-align: center;
    line-height: 1.6;
    border-radius: 0.5rem;
    margin: 0.25rem 0;
}

.lyric-line.active {
    color: #2563eb;
    font-weight: 600;
    font-size: 1.125rem;
    background-color: rgba(219, 234, 254, 0.5);
    transform: scale(1.03);
}

.lyric-line.near {
    color: #374151;
}

.lyric-line.far {
    color: #9ca3af;
    font-size: 0.875rem;
}

/* 添加渐变淡化效果 */
.relative::before,
.relative::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: 5;
    pointer-events: none;
}

.relative::before {
    top: 0;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
}

.relative::after {
    bottom: 0;
    height: 80px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
}

/* 空歌词样式 */
.empty-lyrics {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    color: #9ca3af;
    font-style: italic;
}
</style>
<template>
    <div class="mt-4 md:mt-6 bg-white/80 backdrop-blur-lg p-3 md:p-4 rounded-xl shadow-xl border border-gray-100">
        <h3 class="text-base md:text-lg font-semibold mb-3 md:mb-4 border-b pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 md:h-5 w-4 md:w-5 mr-1 md:mr-2 text-blue-500"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
            </svg>
            歌词
        </h3>
        <!-- 移除中间指示线和点 -->
        <div class="relative lyrics-wrapper">
            <!-- 歌词容器 -->
            <div ref="lyricsContainer"
                class="max-h-80 md:max-h-120 overflow-y-auto py-16 md:py-24 hide-scrollbar lyrics-bg"
                style="scroll-behavior: smooth;">
                <div v-if="lyrics.length > 0" class="space-y-2 md:space-y-3">
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 md:h-12 w-8 md:w-12 mb-2 text-gray-300"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-sm md:text-base">暂无歌词</p>
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
    background: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08);
    overflow: hidden;
}

.lyrics-bg {
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.85) 100%);
}

/* 移除 center-indicator、center-line、center-dot 相关样式 */
.center-indicator,
.center-line,
.center-dot {
    display: none !important;
}

/* 歌词行样式 */
.lyric-line {
    transition: all 0.3s cubic-bezier(.4, 2, .6, 1);
    padding: 0.375rem 1rem;
    text-align: center;
    line-height: 1.5;
    border-radius: 0.5rem;
    margin: 0.25rem 0;
    font-size: 0.95rem;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.lyric-line:hover {
    background: rgba(219, 234, 254, 0.18);
    transform: scale(1.04);
}

.lyric-line.active {
    color: #2563eb;
    font-weight: 700;
    font-size: 1.08rem;
    background: rgba(219, 234, 254, 0.7);
    box-shadow: 0 0 16px 2px #60a5fa33;
    transform: scale(1.08);
    animation: lyric-breath 1.2s infinite alternate;
}

@keyframes lyric-breath {
    0% {
        box-shadow: 0 0 16px 2px #60a5fa33;
    }

    100% {
        box-shadow: 0 0 32px 8px #60a5fa55;
    }
}

.lyric-line.near {
    color: #374151;
    opacity: 0.85;
}

.lyric-line.far {
    color: #9ca3af;
    font-size: 0.8rem;
    opacity: 0.6;
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

/* 移动设备上减小渐变高度 */
@media (max-width: 768px) {

    .relative::before,
    .relative::after {
        height: 60px;
    }

    .center-dot {
        width: 8px;
        height: 8px;
    }

    .lyric-line {
        font-size: 0.85rem;
    }

    .lyric-line.active {
        font-size: 0.95rem;
    }
}
</style>
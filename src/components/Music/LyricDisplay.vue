<template>
    <div class="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-3 border-b pb-2">歌词</h3>
        <!-- 添加一个相对定位的容器，便于放置指示器 -->
        <div class="relative">
            <!-- 中间指示线 -->
            <div class="absolute left-0 right-0 h-10 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 opacity-50 pointer-events-none"
                style="top: calc(50% - 1.25rem);">
                <div class="absolute left-0 right-0 h-px bg-blue-300" style="top: 50%;"></div>
            </div>

            <!-- 歌词容器 - 增大高度，隐藏滚动条 -->
            <div ref="lyricsContainer" class="max-h-120 overflow-y-auto py-24 hide-scrollbar"
                style="scroll-behavior: smooth;">
                <div v-if="lyrics.length > 0" class="space-y-3">
                    <p v-for="(lyric, index) in lyrics" :key="index"
                        :ref="el => { if (index === currentLyricIndex) activeLyricElement = el }" :class="[
                            'transition-all duration-300 py-1.5 text-center',
                            index === currentLyricIndex ? 'text-blue-600 font-bold text-lg' :
                                Math.abs(index - currentLyricIndex) <= 1 ? 'text-gray-700' : 'text-gray-400 text-sm'
                        ]">
                        {{ lyric.text }}
                    </p>
                </div>
                <p v-else class="text-gray-500 italic text-center py-6">暂无歌词</p>
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
/* 完全隐藏滚动条但保留滚动功能 */
.hide-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}

/* 添加渐变淡化效果 */
.relative::before,
.relative::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;
}

.relative::before {
    top: 0;
    height: 60px;
    background: linear-gradient(to bottom, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0));
}

.relative::after {
    bottom: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0));
}
</style>
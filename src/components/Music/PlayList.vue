<template>
    <div class="mt-4 md:mt-6 bg-white p-3 md:p-4 rounded-xl shadow-md border border-gray-100">
        <h3 class="text-base md:text-lg font-semibold mb-3 md:mb-4 border-b pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 md:h-5 w-4 md:w-5 mr-1 md:mr-2 text-blue-500"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            播放列表
        </h3>
        <div class="playlist-container">
            <div v-if="playlist.length > 0" class="playlist-items">
                <div v-for="(song, index) in playlist" :key="song.index" class="playlist-item"
                    :class="song.isPlaying ? 'playing' : ''" @click="handleClick(index)">
                    <div class="flex items-center w-full">
                        <!-- 播放中指示器 -->
                        <div class="song-indicator" v-if="song.isPlaying">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 md:h-4 w-3 md:w-4" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div v-else class="song-number text-xs md:text-sm">{{ index + 1 }}</div>

                        <span class="song-title text-sm md:text-base">
                            {{ song.text }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-else class="empty-playlist">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 md:h-12 w-8 md:w-12 mb-2 text-gray-300" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p class="text-sm md:text-base">暂无播放列表</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    playlist: {
        type: Array,
        required: true
    },
    isOperationInProgress: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['song-click']);

const handleClick = (index) => {
    emit('song-click', index);
};
</script>

<style scoped>
.playlist-container {
    max-height: 200px;
    overflow-y: auto;
    border-radius: 0.5rem;
}

@media (min-width: 768px) {
    .playlist-container {
        max-height: 320px;
    }
}

.playlist-items {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.playlist-item {
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    align-items: center;
    color: #374151;
    border-left: 3px solid transparent;
    font-size: 0.875rem;
}

@media (min-width: 768px) {
    .playlist-item {
        padding: 0.75rem 1rem;
        font-size: 1rem;
    }
}

.playlist-item:hover {
    background-color: #f3f4f6;
    border-left-color: #93c5fd;
}

.playlist-item.playing {
    background-color: #eff6ff;
    color: #2563eb;
    font-weight: 500;
    border-left-color: #3b82f6;
}

.song-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    color: #3b82f6;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@media (min-width: 768px) {
    .song-indicator {
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }
}

.song-number {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: #6b7280;
}

@media (min-width: 768px) {
    .song-number {
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }
}

.song-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
}

.empty-playlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    color: #9ca3af;
    font-style: italic;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
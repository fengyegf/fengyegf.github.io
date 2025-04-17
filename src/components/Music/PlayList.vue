<template>
    <div class="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-3 border-b pb-2">播放列表</h3>
        <div class="max-h-70 overflow-y-auto">
            <div v-if="playlist.length > 0" class="divide-y">
                <div v-for="(song, index) in playlist" :key="song.index" :class="song.isPlaying ? 'bg-blue-50' : ''"
                    class="py-2 px-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    @click="handleClick(index)">
                    <div class="flex items-center">
                        <span :class="song.isPlaying ? 'text-blue-600 font-medium' : 'text-gray-700'">
                            {{ song.text }}
                        </span>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-500 italic">暂无播放列表</p>
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
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #aaa;
}
</style>
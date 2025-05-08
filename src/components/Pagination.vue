<template>
    <div class="join">
        <button class="join-item btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">«</button>
        <button class="join-item btn">第 {{ currentPage }} 页/共 {{ totalPages }} 页</button>
        <button class="join-item btn" :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)">»</button>
    </div>
</template>

<script setup>

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['page-change']);

const changePage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
        emit('page-change', page);
    }
};
</script>
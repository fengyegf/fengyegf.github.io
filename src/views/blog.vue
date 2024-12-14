<template>
    <div class="parcel">
        <!-- <div class="blog">
            <parcel /> -->
        <!-- <div class="blog-post">
                <post />
            </div> -->
    </div>
    <!-- <div>
        <bottom />
    </div> -->
    <!-- </div> -->
</template>

<script setup>
import parcel from '@/components/parcel.vue';
import post from '@/components/post.vue';
import bottom from './bottom.vue';
</script>

<style scoped>
.parcel {
    width: 100%;
    background: #fff;
}

.blog {
    display: flex;
    justify-content: center;
    width: 100%;
}

.meta {
    display: flex;
    gap: 10px;
}

.title-info {
    display: flex;
    height: 100%;
}

.card-corner {
    height: 100%;
    width: 50%;
}

.title-text {
    margin-left: 30px;
}

.event-note {
    display: flex;
    align-items: center;
    gap: 5px;
}

.event-note p {
    margin: 0;
}

.contact {
    width: 100%;
    font-weight: 700;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}

.blog-post {
    box-shadow: 0 0 4px rgba(194, 194, 194, 0.497);
    margin-left: 20px;
    padding: 10px;
    border-radius: 10px;
}
</style>
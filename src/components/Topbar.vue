<script setup>
import config from '@/config/Config';
import { RouterLink } from 'vue-router';
import { HomeIcon, Link1Icon, BookmarkIcon, BookIcon, VerifyIcon } from "tdesign-icons-vue-next";
</script>

<template>
    <div class="header">
        <div class="left">
            <RouterLink to="/" class="title no_link">
                <HomeIcon />
                <p class="h1">{{ config.title }}</p>
            </RouterLink>
        </div>
        <div class="right">
            <div class="right-item">
                <RouterLink to="/collect" class="item no_link">
                    <BookmarkIcon />
                    <p>{{ config.Collect }}</p>
                </RouterLink>
                <RouterLink to="/link" class="item no_link">
                    <Link1Icon />
                    <p>{{ config.Shared }}</p>
                </RouterLink>
                <RouterLink to="/blog/" class="item no_link">
                    <BookIcon />
                    <p>{{ config.Archive }}</p>
                </RouterLink>
            </div>
            <div class="right-item">
                <RouterLink to="/Mine" class="item no_link">
                    <VerifyIcon size="30px" />
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {

    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: var(--background-color); */
    width: 85%;
    padding: 10px;
    border-radius: 15px;
    /* box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3); */
    font-size: var(--header-font-size);
}


.title {
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 5px;
    color: #fff;
}

.right {
    display: flex;
    gap: 300px;

    .right-item {
        display: flex;
        gap: 15px;
    }

    .item {
        display: flex;
        align-items: center;
        padding: 5px;
        gap: 5px;
        color: #fff;
    }

    .item:hover {
        background: var(--background-color);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        transform: translateY(-1px);
    }
}
</style>
<script setup>
import config from '@/config/Config';
import { RouterLink } from 'vue-router';
import { LogoGithubIcon, VerifyIcon } from "tdesign-icons-vue-next";

</script>

<template>
    <div class="header">
        <div class="left">
            <RouterLink to="/" class="title no_link">

                <p class="h1">{{ config.title }}</p>
            </RouterLink>
            <div class="right-item">
                <a href="https://fengyegf.cn/blog/" class="item no_link">
                    <p>{{ config.Archive }}</p>
                </a>
            </div>
        </div>

        <div class="right">

            <div class="right-item">
                <a href="https://github.com/MLeaf-coder" target="_blank" class="item no_link">
                    <LogoGithubIcon size="30px" />
                    <p>GitHub</p>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(https://chinese-fonts-cdn.deno.dev/packages/qxs/dist/quan/result.css);

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

.left {
    display: flex;
    align-items: center;
    gap: 15px;

}

.title {
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 5px;
    color: #fff;
    font-size: 30px;
    font-family: 'QuanPixel 8px';

}

.item {
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
        font-size: 15px;

    }



    .item:hover {
        background: var(--background-color);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        transform: translateY(-1px);
    }
}
</style>
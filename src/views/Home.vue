<script setup>
import config from '@/config/Config';
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="left">
                <img src="@/assets/img/1.png" alt="The">
            </div>
            <div class="side">
                <div class="parcel">
                    <div class="introduce">
                        <h1>{{ config.introduce }}</h1>
                    </div>
                    <div class="content">
                        <p>{{ config.Message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div style="display: flex;justify-content: center;width: 100%;">
        <div class="main">
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51018002000145" rel="noreferrer" target="_blank"
                class="beian-link no_link">
                <img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt="备案图标" class="beian-logo">
                川公网安备51018002000145
            </a>
            <a href="https://beian.miit.gov.cn/" class="beian-link no_link">蜀ICP备2023029817号-1</a>
        </div>
    </div>
</template>

<style scoped>
.root {
    display: flex;
    height: auto;
    width: auto;
    flex-direction: row;
    justify-content: center;
    margin-top: 150px;
}

.container {
    display: flex;
    height: 600px;
    width: 1310px;
}

.side {
    background-color: var(--background-color);
    width: 880px;
    border-radius: 20px;
    box-shadow: 0 0 4px rgb(102, 102, 102);
    padding: 20px;
    box-sizing: border-box;
    font-size: var(--side--font-size);
}

.left img {
    width: 440px;
    object-fit: contain;
}

.main {
    margin-top: 60px;
    width: auto;
    height: 10px;
    display: flex;
    background-color: var(--background-color);
    padding: 10px;
    border-radius: 10px;
    /* 添加这行 */
}

.beian-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-right: 16px;
    color: white;
    /* 添加这行 */
}

.beian-logo {
    margin-right: 8px;
    height: 20px;
    /* 调整图标高度 */
}
</style>
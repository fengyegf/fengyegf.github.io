<script setup>
import config from '@/config/Config';
import { LogoGithubIcon, AddressBookIcon } from 'tdesign-icons-vue-next'

</script>

<template>
    <div class="root">
        <div class="main1">
            <div class="card">
                <div class="title">
                    <p>{{ config.title1 }}</p>
                    <p class="silk">{{ config.title2 }}</p>
                </div>
                <div class="sponsor">
                    <p>{{ config.Message }}</p>
                </div>
                <div class="key">
                    <a href="https://github.com/MLeaf-coder" class="item no_link">
                        <div class="key-item">
                            <LogoGithubIcon size="35px" />
                            <p class="left">GitHub</p>
                        </div>
                    </a>
                    <a href="https://fengyegf.cn/blog/" class="item no_link">
                        <div class="key-item2">

                            <AddressBookIcon size="35px" />
                            <p class="left">blog</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="zzz">
                <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51018002000145" rel="noreferrer"
                    target="_blank" class="beian-link no_link">
                    <img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt="备案图标" class="beian-logo">
                    川公网安备51018002000145
                </a>
                <a href="https://beian.miit.gov.cn/" class="beian-link no_link">蜀ICP备2023029817号-1</a>
            </div>
        </div>
    </div>



</template>

<style scoped>
.left {
    margin-left: 10px;
}

.key-item2 {
    color: #ffffff;
    margin-left: 10px;
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    background-color: rgb(88, 88, 88);
    padding: 10px;
    border-radius: 10px;
}

.zzz {
    display: flex;
}

.key-item {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 10px;
}

.silk {
    color: #ffffff;
}

.title {
    display: flex;
    font-size: 48px;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.sponsor {
    margin: 30px 0;
    width: 700px;
    font-size: 36px;
}

.key {
    display: flex;
}

.root {
    width: 100%;
    height: 100vh;
}

.main1 {
    position: absolute;
    top: 355px;
    left: 235px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.main {
    width: 100%;

    /* background-color: var(--background-color); */

    border-radius: 10px;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
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
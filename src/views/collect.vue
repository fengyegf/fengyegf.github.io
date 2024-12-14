<template>
    <div class="root">
        <div class="collect">
            <div class="top">
                <div class="Lists" v-for="(item, index) in topItems" :key="index">{{ item }}</div>
            </div>
            <div class="middle">
                <div class="bottom">
                    <div class="Lists" v-for="(list, listIndex) in bottomLists" :key="listIndex">
                        <div>
                            <div class="link no_link" v-for="(link, linkIndex) in list" :key="linkIndex">
                                <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.name }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const topItems = ref(['常用网站', '影音媒体', '社交平台', '人工智能', '效率工具']);
const bottomLists = ref([
    [
        { name: 'Google', url: 'https://www.google.com' },
        { name: 'Baidu', url: 'https://www.baidu.com' },
        { name: 'Yahoo', url: 'https://www.yahoo.com' },
        { name: 'Bing', url: 'https://www.bing.com' }
    ],
    [
        { name: 'YouTube', url: 'https://www.youtube.com' },
        { name: 'Netflix', url: 'https://www.netflix.com' },
        { name: 'Spotify', url: 'https://www.spotify.com' },
        { name: 'Twitch', url: 'https://www.twitch.tv' }
    ],
    [
        { name: 'Facebook', url: 'https://www.facebook.com' },
        { name: 'Twitter', url: 'https://www.twitter.com' },
        { name: 'Instagram', url: 'https://www.instagram.com' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    [
        { name: 'ChatGPT', url: 'https://chat.openai.com' },
        { name: 'Bard', url: 'https://bard.google.com' },
        { name: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
        { name: 'Claude', url: 'https://www.anthropic.com' }
    ],
    [
        { name: 'Notion', url: 'https://www.notion.so' },
        { name: 'Trello', url: 'https://trello.com' },
        { name: 'Slack', url: 'https://slack.com' },
        { name: 'Zoom', url: 'https://zoom.us' }
    ]
]);
</script>

<style scoped>
.root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.collect {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    margin-top: 30px;
    width: 1470px;
    height: 800px;
    background-color: var(--background-color);
}

.top {
    display: flex;
    border-radius: 10px;
    margin-top: 42px;
    width: 1150px;
    height: 56px;
    background-color: #fff;
    justify-content: space-around;
    align-items: center;
}

.bottom {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.middle {
    width: 1150px;
    height: 100%;
}

.link {
    margin: 10px;
}

.no_link a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}
</style>

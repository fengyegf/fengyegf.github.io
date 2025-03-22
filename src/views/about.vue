<template>
  <div class="about-view">
    <Page :specificPath="aboutMdPath" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Page from "@/components/Articles/Page.vue";

// 指定关于我页面的Markdown文件路径
const aboutMdPath = ref("../../md/spec/about.md");
</script>

<style scoped>
.about-view {
  width: 100%;
}
</style>

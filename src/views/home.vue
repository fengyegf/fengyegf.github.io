<template>
  <!-- 桌面布局使用flex，移动设备使用flex-col -->
  <aside class="w-full min-h-screen flex flex-col md:flex-row">
    <!-- 左侧内容，在移动设备上变为顶部内容 -->
    <div
      class="w-full md:w-1/4 md:h-screen md:sticky md:top-0 flex justify-center md:justify-end md:items-start pt-4 md:pt-16">
      <div class="md:pr-4 w-full md:w-auto">
        <left />
      </div>
    </div>
    <!-- glass flex rounded-2xl p-3 md:p-5 flex-col w-full md:w-300 h-full -->
    <!-- 右侧可滚动内容，在移动设备上变为主体内容 -->
    <div class="w-full md:w-3/4 pt-4 md:pt-16 pb-16 md:w-300">
      <div>
        <right />
      </div>
      <div class="pt-6">
        <Vertical />
      </div>
    </div>
  </aside>
</template>
<script setup>
import Vertical from "@/components/home/Vertical.vue";
import left from "@/components/home/left.vue";
import right from "@/components/home/right.vue";
</script>
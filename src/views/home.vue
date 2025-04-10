<template>
  <aside class="w-full min-h-screen flex">
    <!-- 左侧固定内容 -->
    <div class="w-1/4 h-screen sticky top-0 flex items-start justify-end pt-16">
      <div class="pr-4">
        <left />
      </div>
    </div>

    <!-- 右侧可滚动内容 -->
    <div class="w-3/4 pt-16 pb-16">
      <div>
        <right />
      </div>
    </div>
  </aside>
</template>
<script setup>
import left from "@/components/home/left.vue";
import right from "@/components/home/right.vue";
</script>

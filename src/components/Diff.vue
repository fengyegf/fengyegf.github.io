<template>
  <figure class="diff aspect-16/9" tabindex="0">
    <div class="diff-item-1" role="img">
      <img :alt="alt1" :src="image1" />
    </div>
    <div class="diff-item-2" role="img" tabindex="0">
      <img :alt="alt2" :src="image2" />
    </div>
    <div class="diff-resizer"></div>
  </figure>
</template>

<script setup>
defineProps({
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  alt1: {
    type: String,
    default: "图像1",
  },
  alt2: {
    type: String,
    default: "图像2",
  },
  aspect: {
    type: String,
    default: "16/9",
  },
});
</script>

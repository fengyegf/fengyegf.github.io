<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold p-3 md:p-5 mb-0">生活空间</h1>
    <div class="h-1 w-16 md:w-20 bg-blue-500 ml-3 md:ml-5 rounded-full"></div>
    <ul class="p-3 md:p-5 flex flex-wrap gap-2 md:gap-4 text-base md:text-lg">
      <li v-for="tag in tags" :key="tag" class="mb-1 cursor-pointer hover:text-blue-500" :class="{
        'text-blue-500 font-bold': selectedTag === tag,
        'text-gray-600': selectedTag !== tag,
      }" @click="$emit('select-tag', tag)">
        #{{ tag }}
      </li>
      <li class="mb-1 cursor-pointer hover:text-blue-500" :class="{
        'text-blue-500 font-bold': selectedTag === '',
        'text-gray-600': selectedTag !== '',
      }" @click="$emit('select-tag', '')">
        全部
      </li>
    </ul>
  </div>
</template>

<script setup>
defineEmits(["select-tag"]);

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  selectedTag: {
    type: String,
    default: "",
  },
});

</script>

<template>
  <div>
    <h1 class="text-3xl font-bold p-5 mb-0">生活空间</h1>
    <div class="h-1 w-20 bg-blue-500 ml-5 rounded-full"></div>
    <ul class="p-5 flex flex-wrap gap-4 text-lg">
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

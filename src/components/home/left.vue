<template>
  <div class="glass flex rounded-2xl p-5 flex-col items-center ml-20">
    <div class="flex">
      <img class="rounded-2xl" src="@/assets/img/avatar.jpg" alt="avatar" />
    </div>
    <div class="flex flex-col items-center">
      <h1 class="text-4xl font-bold p-5">{{ title }}</h1>
      <p
        class="glass p-3 rounded-xl text-center max-w-[16rem] whitespace-normal break-words overflow-wrap-anywhere leading-normal">
        {{ message }}
      </p>
    </div>
    <div class="divider"></div>
    <div>
      <Vertical />
    </div>
  </div>
</template>

<script setup>
import Vertical from "./Vertical.vue";
import config from "@/config/Config";
import { ref } from "vue";
const title = ref(config.title);
const message = ref(config.message);
</script>

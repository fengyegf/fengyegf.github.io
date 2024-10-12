import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({

    
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "maple leaf",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "枫叶",
      description: "vuepress-theme-hope 的博客演示",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});

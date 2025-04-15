import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { plugin as mdPlugin } from "vite-plugin-markdown";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/",
  // 移除viteStaticCopy插件配置
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    mdPlugin({
      mode: ["html", "toc"],
      markdownIt: {
        html: true,
        linkify: true,
        typographer: true,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        highlight: function (str, lang) {
          return "";
        },
      },
    }),
    // 删除viteStaticCopy配置
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    assetsDir: "assets", // 确保静态资源目录正确
  },
});

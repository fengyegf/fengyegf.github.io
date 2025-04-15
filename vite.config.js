import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { plugin as mdPlugin } from "vite-plugin-markdown";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/",
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
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/md/**/*",
          dest: "md", // 改为直接复制到 md 目录
        },
        {
          src: "src/assets/img/*",
          dest: "assets/img",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    assetsDir: "assets", // 确保静态资源目录正确
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
      },
    },
  },
});

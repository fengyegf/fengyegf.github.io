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
        highlight: function (str, lang) {
          return "";
        },
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/img/*",
          dest: "assets/img",
        },
      ],
    }),
    // 添加URL重写插件
    {
      name: "rewrite-image-urls",
      transformIndexHtml(html) {
        // 将 src/assets/img 替换为 assets/img
        return html.replace(/src\/assets\/img\//g, "assets/img/");
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // 添加图像路径别名
      "src/assets/img": fileURLToPath(
        new URL("./src/assets/img", import.meta.url)
      ),
    },
  },
  build: {
    assetsDir: "assets", // 确保静态资源目录正确
  },
});

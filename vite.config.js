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
      // 在 mdPlugin 配置中添加 markdown-it 设置
      markdownIt: {
        html: true,
        linkify: true,
        typographer: true,
        // 添加以下配置支持嵌套目录
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        highlight: function (str, lang) {
          return "";
        },
      },
    }),
    // 在viteStaticCopy配置中添加md目录
    viteStaticCopy({
      targets: [
        {
          src: "src/md/**/*.md",
          dest: "md",
          rename: (name, extension, fullPath) => {
            const relativePath = path.relative(
              path.join(__dirname, "src/md"),
              fullPath
            );
            return relativePath;
          },
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
  },
});

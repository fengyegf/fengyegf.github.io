import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  
  hostname: "https://fengyegf.cn",

  author: {
    name: "maple leaf",
    url: "https://fengyegf.cn",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "https://github.com/MLeaf-coder/FY/blob/main/logo.png?raw=true",

  repo: "MLeaf-coder/MLeaf-coder.github.io",

  docsDir: "src",

  blog: {
    medias: {
      Gitee: "https://gitee.com/cold-maple_1_0",
      GitHub: "https://github.com/MLeaf-coder",
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "Blog run time",

      displayFooter: true,

      blog: {
        description: "Seems to have forgotten something",//介绍
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "Help me adjust the content of the page",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "博客运行时间",

      displayFooter: true,

      blog: {
        description: "好像遗忘了什么",//介绍
        intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "帮我调整页面内容",

      },
    },
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  // enable it to preview all changes in time
  // hotReload: true,
  docsRepo: "https://github.com/MLeaf-coder/MLeaf-coder.github.io",
  docsBranch: "main",
  
  plugins: {

  // 启用公告插件
  notice: {
    config: [
      {
        path: '/',
        title: 'Announcement',
        content: `
        Scan the QR code to pay attention to the public number, you can quickly leave a message to feedback the problem, or you can leave a message at the bottom of the article<br>
        <img src="/assets/images/cover4.jpg" alt="二维码" style="max-width: 100%; height: auto;" />
      `,
        actions: [
          {
            text: 'OK',
            type: 'primary',
          },
        ],
      },
      {
        path: '/zh/',
        title: '公告',
        content: `
          扫描二维码关注公众号，可快捷留言反馈问题，也可在文章下方留言<br>
          <img src="/assets/images/cover4.jpg" alt="二维码" style="max-width: 100%; height: auto;" />
        `,
        actions: [
          {
            text: '好的',
            type: 'primary',
          },
        ],
      },
    ],
  },
    

    blog: true,
    searchPro: true,
    

    // Install @waline/client before enabling it
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    comment: {
      provider: "Giscus",
      repo: "MLeaf-coder/Comments",
      repoId: "R_kgDOM_UG0Q",
      category: "Announcements",
      categoryId: "DIC_kwDOM_UG0c4CjTaf",
    },
    
    components: {
      components: ["Badge", "VPCard"],
    },

    // These features are enabled for demo, only preserve features you need here
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },

    // markdownMath: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install mathjax-full before enabling it
    //   type: "mathjax",
    // },

    // This features is enabled for demo, only preserve if you need it
    markdownTab: true,

    // These features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      echarts: true,
      chart: true,
      mermaid: true,
      flowchart: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // install chart.js before enabling it
      // chart: true,

      // insert component easily

      // install echarts before enabling it
      // echarts: true,

      // install flowchart.ts before enabling it
      // flowchart: true,
      
      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
    copyright: {
      license: "MIT",
    },
  },
});

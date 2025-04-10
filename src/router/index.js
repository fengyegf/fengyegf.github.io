import { createWebHashHistory, createRouter } from "vue-router";
import homes from "@/views/home.vue";
import Home from "@/components/home.vue";
import time from "@/components/time/short.vue";
import gallery from "@/views/gallery.vue";
import Blogs from "@/views/Blogs.vue";
import Articles from "@/components/Articles.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: homes,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
        },
        {
          path: "time",
          name: "time",
          component: time,
        },
        {
          path: "gallery",
          name: "gallery",
          component: gallery,
        },
        {
          path: "blogs",
          name: "blogs",
          component: Blogs,
        },
        {
          // 博客文章详情页
          path: "blog/:path",
          name: "blog",
          component: Articles,
          props: true,
        },
        {
          // 生活记录详情页
          path: "life/:path",
          name: "life",
          component: Articles,
          props: true,
        },
      ],
    },
  ],
});

export default router;

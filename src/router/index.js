import { createWebHistory, createRouter } from "vue-router";
import homes from "@/views/home.vue";
import Home from "@/components/home.vue";
import time from "@/components/time/short.vue";
import gallery from "@/views/gallery.vue";
import Blogs from "@/views/Blogs.vue";
import Articles from "@/components/Articles.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

// 处理 GitHub Pages 重定向
if (typeof window !== "undefined") {
  const redirectPath = sessionStorage.getItem("redirect_path");
  if (redirectPath) {
    sessionStorage.removeItem("redirect_path");

    // 如果有存储的路径，则导航到该路径
    if (
      redirectPath !== "/" &&
      redirectPath !== router.currentRoute.value.path
    ) {
      router.push(redirectPath);
    }
  }
}

export default router;

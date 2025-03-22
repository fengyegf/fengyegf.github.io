import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/home/Home.vue";
import Articles from "@/components/Articles/Articles.vue";
import Collection from "@/components/Collection.vue";
import Timeline from "@/components/Timeline.vue";
import about from "@/views/about.vue";
import friends from "@/views/friends.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/blogs",
      name: "blogs",
      component: Articles,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Collection,
    },
    {
      path: "/Timeline",
      name: "Timeline",
      component: Timeline,
    },
    {
      path: "/about",
      name: "about",
      component: about,
    },
    {
      path: "/friends",
      name: "friends",
      component: friends,
    },
    {
      path: "/page/:path", // 使用动态路由参数
      name: "Page",
      component: () => import("../components/Articles/Page.vue"),
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import collect from "../views/collect.vue";
import Archiving from "../views/Archiving.vue";
import link from "../views/link.vue";
import Mine from "../views/Mine.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/collect",
      name: "collect",
      component: collect,
    },
    {
      path: "/Archiving",
      name: "Archiving",
      component: Archiving,
    },
    {
      path: "/link",
      name: "link",
      component: link,
    },
    {
      path: "/Mine",
      name: "Mine",
      component: Mine,
    },
  ],
});

export default router;

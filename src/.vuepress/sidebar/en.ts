import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Touch the fish 🐟",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "Tech Tinkering",
      icon: "tag",
      prefix: "Tossaround/",
      children: "structure",
    },
  ],
});

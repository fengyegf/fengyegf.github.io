import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./assets/js/myhk.js";

createApp(App).use(router).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import ExercisesPage from "./pages/Exercises.vue";
import NotfoundPage from "./pages/Notfound.vue";
import { createRouter, createWebHistory } from "vue-router";
import naive from "naive-ui";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "./style.css";

const routes = [
  { path: "/", component: HomePage },
  { path: "/exercises", component: ExercisesPage },
  { path: "/:catchAll(.*)", name: "not-found", component: NotfoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return savedPosition || { top: 0 };
  },
});

const app = createApp(App);
app.use(naive);
app.use(router);
app.use(VCalendar, {});
app.mount("#app");

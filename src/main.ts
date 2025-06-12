import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import ExercisesPage from "./pages/Exercises.vue";
import { createRouter, createWebHistory } from "vue-router";
import naive from "naive-ui";

const routes = [
  { path: "/", component: HomePage },
  { path: "/exercises", component: ExercisesPage },
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
app.mount("#app");

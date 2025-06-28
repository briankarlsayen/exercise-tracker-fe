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
import PrivateLayout from "./layouts/PrivateLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";

import LoginPage from "./pages/Login.vue";
import RegistrationPage from "./pages/Registration.vue";
import ForgotPasswordPage from "./pages/ForgotPassword.vue";
import { createPinia } from "pinia";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        redirect: () => {
          const authKey = localStorage.getItem("auth");
          return { path: authKey ? "/app" : "/login" };
        },
      },
      { path: "/login", component: LoginPage },
      { path: "/register", component: RegistrationPage },
      { path: "/forgot-password", component: ForgotPasswordPage },
    ],
  },
  {
    path: "/app",
    component: PrivateLayout,
    children: [
      { path: "/app/", component: HomePage },
      { path: "/app/exercises", component: ExercisesPage },
    ],
  },
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
app.use(createPinia());
app.use(naive);
app.use(router);
app.use(VCalendar, {});
app.mount("#app");

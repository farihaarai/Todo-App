import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/authStore";
import AddTask from "../views/postlogin/AddTask.vue";
import ChangePassword from "../views/postlogin/ChangePassword.vue";
import Dashboard from "../views/postlogin/Dashboard.vue";
import PostLogin from "../views/postlogin/PostLogin.vue";
import Profile from "../views/postlogin/Profile.vue";
import LoginView from "../views/prelogin/LoginView.vue";
import PreLogin from "../views/prelogin/PreLogin.vue";
import SignupView from "../views/prelogin/SignupView.vue";

const routes = [
  {
    path: "/",
    component: PreLogin,
    redirect: { name: "login" },
    children: [
      { name: "login", path: "login", component: LoginView },
      { name: "signup", path: "signup", component: SignupView },
    ],
  },
  {
    path: "/post",
    component: PostLogin,
    children: [
      { name: "dashboard", path: "dashboard", component: Dashboard },
      { name: "profile", path: "profile", component: Profile },
      {
        name: "changePassword",
        path: "changePassword",
        component: ChangePassword,
      },
      { name: "addTask", path: "addTask", component: AddTask },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router guard
// if the url start's with /post & user is not logged-in in the authStore, redirect to login

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  // If route starts with "/post" and user is not logged in
  if (to.path.startsWith("/post") && !authStore.currentUser) {
    return { name: "login" };
  }
});
export default router;

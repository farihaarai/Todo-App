import { createRouter, createWebHistory } from "vue-router";

import PreLogin from "../components/PreLogin.vue";
import PostLogin from "../components/PostLogin.vue";
import LoginSignup from "../components/LoginSignup.vue";
import Profile from "../components/Profile.vue";
import ChangePassword from "../components/ChangePassword.vue";
import Dashboard from "../components/Dashboard.vue";
import AddTask from "../components/AddTask.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/",
    component: PreLogin,
    redirect: { name: "login" },
    children: [
      { name: "login", path: "login", component: LoginSignup },
      { name: "signup", path: "signup", component: LoginSignup },
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

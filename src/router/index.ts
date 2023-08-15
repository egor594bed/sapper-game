import { createRouter, createWebHistory } from "vue-router";
import SapperView from "../views/SapperView.vue";
import LeaderBoardView from "../views/LeaderBoardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: SapperView,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderBoardView,
    },
  ],
});

export default router;

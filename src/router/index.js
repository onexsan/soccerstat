import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CompetitionItem from "../views/competitions/_id.vue";
import TeamItem from "../views/teams/_id.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Soccerstat – Home",
    },
  },
  {
    path: "/teams",
    name: "Teams",
    meta: {
      title: "Soccerstat – Teams",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/teams/index.vue"),
  },
  {
    path: "/competitions",
    name: "Competitions",
    meta: {
      title: "Soccerstat – Competitions",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/competitions/index.vue"),
  },
  {
    path: "/competitions/:id",
    component: CompetitionItem,
    name: "CompetitionItem",
    meta: {
      title: "Soccerstat – Competitions",
    },
  },
  {
    path: "/teams/:id",
    component: TeamItem,
    name: "TeamItem",
    meta: {
      title: "Soccerstat – Teams",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  next();
});

export default router;

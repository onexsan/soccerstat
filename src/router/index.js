import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CompetitionItem from '../views/competitions/_id.vue'
import TeamItem from '../views/teams/_id.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teams',
    name: 'Teams',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/teams/index.vue')
  },
  {
    path: '/competitions',
    name: 'Competitions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/competitions/index.vue')
  },
  { path: '/competitions/:id', component: CompetitionItem, name: 'CompetitionItem' },
  { path: '/teams/:id', component: TeamItem, name: 'TeamItem' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

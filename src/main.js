import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import axios from "axios";
import VueAxios from "vue-axios";

import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Pagination from "vue-pagination-2";
import store from "./store";

Vue.use(Vuex);

Vue.use(VueAxios, axios);
axios.defaults.headers.common["X-Auth-Token"] = process.env.VUE_APP_TOKEN;

import interceptorsSetup from "./interceptors";
interceptorsSetup();

Vue.use(BootstrapVue);

Vue.component("pagination", Pagination);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

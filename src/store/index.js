import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isHamburgerActive: false,
    showErrorModal: false,
  },
  mutations: {
    toggleHamburger(state) {
      state.isHamburgerActive = !state.isHamburgerActive;
    },
    toggleErrorModal(state) {
      state.showErrorModal = !state.showErrorModal;
    },
  },
  actions: {
    toggleError({ commit }) {
      commit("toggleErrorModal");
    },
  },
});

export default store;

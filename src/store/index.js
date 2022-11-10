import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  plugins: [createLogger()],
  state: {
    count: 0,
    isMobile: false
  },
  getters: {
    count(state) {
      return state.count;
    },
    doubleCount(state) {
      return state.count * 2;
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    }
  }
});

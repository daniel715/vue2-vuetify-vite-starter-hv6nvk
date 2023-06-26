import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    libros: [],
    autores: [],
    categorias: [],
    pedidos: []
  },

  getters: {
    libros(state) {
      return state.libros;
    },
    autores(state) {
      return state.autores;
    },
    categorias(state) {
      return state.categorias;
    },
    pedidos(state) {
      return state.pedidos;
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

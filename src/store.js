import Vue from 'vue';
import Vuex from 'vuex';
import getters from './assets/store/getters';
import route from './assets/store/modules/route';
import apis from './assets/store/modules/apis';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    route,
    apis,
  },
  getters,
});

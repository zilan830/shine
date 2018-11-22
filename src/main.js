import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/api/androidApi.js';
import './assets/style/index.styl';
import 'hxui-components';
import 'hxui-components/dist/hxui.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

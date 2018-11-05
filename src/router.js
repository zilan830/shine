import Vue from 'vue';
import Router from 'vue-router';
import News from './views/news/index.vue';
import Apply from './views/apply/index.vue';
import Mine from './views/mine/index.vue';
import Home from './views/home/home.vue';
import Login from './views/login.vue';
import Index from './views/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      meta: { index: 0 },
    },
    {
      path: '/index',
      component: Index,
      redirect: '/home',
      meta: { index: 1 },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { index: 10 },
        },
        {
          path: '/test',
          meta: { index: 101 },
          component: News,
        },
        {
          path: '/news',
          name: 'news',
          component: News,
          meta: { index: 11 },
        },
        {
          path: '/apply',
          name: 'apply',
          component: Apply,
          meta: { index: 12 },
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine,
          meta: { index: 13 },
        },
      ],
    },
  ],
});

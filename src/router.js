import Vue from 'vue';
import Router from 'vue-router';
import News from './views/news/index.vue';
import Apply from './views/apply/index.vue';
import Leave from './views/apply/Leave/leave.vue';
import LeaveForm from './views/apply/Leave/leaveForm.vue';
import NextApprove from './views/apply/form/nextApprove.vue';
// import CreateForm from './views/apply/Leave/form/createForm.vue';
// import DealForm from './views/apply/Leave/form/dealForm.vue';
// import FinishedForm from './views/apply/Leave/form/finishedForm.vue';
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
          path: '/apply',
          name: 'apply',
          component: Apply,
          meta: { index: 11 },
        },
        {
          path: '/leave',
          name: 'leave',
          component: Leave,
          meta: { index: 110 },
        },
        // {
        //   path: '/createForm',
        //   name: 'createForm',
        //   component: CreateForm,
        //   meta: { index: 11000 },
        // },
        {
          path: '/leaveform',
          name: 'leaveform',
          component: LeaveForm,
          meta: { index: 1100 },
        },
        {
          path: '/nextapprove',
          name: 'nextapprove',
          component: NextApprove,
          meta: { index: 1101 },
        },
        {
          path: '/news',
          name: 'news',
          component: News,
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

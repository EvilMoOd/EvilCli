import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: () => import('@/pages/homePage.vue'),
    path: '/home',
  },
];

export default routes;

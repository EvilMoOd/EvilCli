import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/userLogin.vue'),
  },
];
export default routes;

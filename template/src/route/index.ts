import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
// vite2
const routes: RouteRecordRaw[] = [];

const modules = import.meta.globEager('./modules/*.ts');
for (const path in modules) {
  routes.push(...modules[path].default);
}

export default createRouter({
  history: createWebHashHistory(),
  routes,
});

Vue3+TS+vite2+vue-router+pinia+Elp+tailwind+iconfy+axios+lodash+dayjs+eslint+prettier

###1、创建vite2项目，配置eslint和prettier；

```js
yarn create vite
pnpm i
```

#### package.json(如果懒得手动安装的话)

```json
{
  "name": "vue3-starter",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "@element-plus/icons": "^0.0.11",
    "@iconify/iconify": "^2.1.0",
    "axios": "^0.24.0",
    "dayjs": "^1.10.7",
    "element-plus": "^1.2.0-beta.3",
    "lodash-es": "^4.17.21",
    "pinia": "^2.0.3",
    "sass": "^1.43.4",
    "unplugin-vue-components": "^0.17.2",
    "vue": "^3.2.16",
    "vue-router": "4"
  },
  "devDependencies": {
    "@iconify/json": "^1.1.428",
    "@types/lodash-es": "^4.17.5",
    "@types/node": "14.17.4",
    "@typescript-eslint/eslint-plugin": "^5.3.1",
    "@typescript-eslint/parser": "^5.3.1",
    "@vitejs/plugin-vue": "^1.9.3",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.2.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.0.3",
    "postcss": "^8.3.11",
    "prettier": "^2.4.1",
    "tailwindcss": "^2.2.19",
    "typescript": "^4.4.3",
    "vite": "^2.6.4",
    "vite-plugin-purge-icons": "^0.7.0",
    "vue-eslint-parser": "^8.0.1",
    "vue-tsc": "^0.3.0"
  }
}
```



#####安装EP

```js
pnpm i prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue vue-eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

####配置文件

##### .eslintrc.json

```json
{
  "root": true,
  "env": {
    "es2021": true,
    "node": true,
    "browser": true
  },
  "globals": {
    "node": true
  },
  "extends": [
    //    "plugin:vue/essential",
    /** @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs */
    //    "plugin:@typescript-eslint/recommended",
    //    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    /**@see https://github.com/prettier/eslint-plugin-prettier#recommended-configuration */
    "plugin:prettier/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "ignorePatterns": ["types/env.d.ts", "node_modules/**", "**/dist/**"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/no-v-html": "off",

    //    "space-before-blocks": "warn",
    //    "space-before-function-paren": "error",
    //    "space-in-parens": "warn",
    //    "no-whitespace-before-property": "off",
    /**
     * Having a semicolon helps the optimizer interpret your code correctly.
     * This avoids rare errors in optimized code.
     * @see https://twitter.com/alex_kozack/status/1364210394328408066
     */
    "semi": ["error", "always"]
    /**
     * This will make the history of changes in the hit a little cleaner
     */
    //    "comma-dangle": ["warn", "always-multiline"],
    /**
     * Just for beauty
     */
    //    "quotes": ["warn", "single"]
  }
}

```

##### .prettier

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "vueIndentScriptAndStyle": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "trailingComma": "es5",
  "jsxBracketSameLine": true,
  "jsxSingleQuote": false,
  "arrowParens": "always",
  "insertPragma": false,
  "requirePragma": false,
  "proseWrap": "never",
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "rangeStart": 0
}

```

##### .editorconfig

```json
root = true

[*]
charset = utf-8
# end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
ij_html_quote_style = double
max_line_length = 120
tab_width = 2
trim_trailing_whitespace = true

```

##### App和main.js

```VUE
<template>
  <router-view />
</template>

```

```TS
import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import store from './store'

import '@/assets/styles/app.scss';
import 'element-plus/dist/index.css';
import '@purge-icons/generated'; // <-- This

const app = createApp(App);
app.use(router).use(store);
app.mount('#app');

```

##### vite.config.ts

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
//配置路径
import * as path from 'path';
//按需引入El
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//按需引入icon
import PurgeIcons from 'vite-plugin-purge-icons';

const resolve = (p: string) => {
  return path.resolve(__dirname, p);
};
// https://vitejs.dev/config/
export default defineConfig({
  //@路径
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  plugins: [
    vue(),
    //按需加载EL和Icon
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    PurgeIcons({
      /* PurgeIcons Options */
      content: [
        '**/*.html',
        '**/*.js',
        '**/*.vue', // scan for .vue file as well
      ],
    }),
  ],
});

```

##### ts.config

```ts
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}

```



###2、配置路由器、仓库

```js
pnpm vue-router pinia
```

index.ts（路由）

```js
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
// vite2
const routes: RouteRecordRaw[] = [];
//遍历模块下的路由
const modules = import.meta.globEager('./modules/*.ts');
for (const path in modules) {
  routes.push(...modules[path].default);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
```

路由示例

```TS
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/pages/Admin.vue'),
    path: '/admin',
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
      },
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/pages/admin/UserList.vue'),
      },
    ],
  },
];

export default routes;
```



index.ts（仓库）

```ts
import { createPinia } from 'pinia';
export default createPinia();
```

仓库示例

```ts
import { defineStore } from 'pinia';

const useCountStore = defineStore({
  id: 'count',
  state: () => ({ num: 1 }),
  actions: {
    increment() {
      this.num += 1;
    },
  },
});

//store
const instance = useCountStore();

//save
instance.$subscribe((_, state) => {
  localStorage.setItem('count-store', JSON.stringify({ ...state }));
});
//get
const old = localStorage.getItem('count-store');
if (old) {
  instance.$state = JSON.parse(old);
}

export default useCountStore;

```



### 3、配置TailwindCSS 、Elp、iconfy

去官网看

##### Iconfy封装成组件

```VUE
<script lang="ts" setup="setup">
  //vue3.2，
  const props = defineProps<{
    icon: string;
  }>();
</script>

<template>
  <span class="iconify" :data-icon="props.icon"></span>
</template>

<style lang="scss" scoped></style>

```


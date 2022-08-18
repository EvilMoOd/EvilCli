import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
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
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
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

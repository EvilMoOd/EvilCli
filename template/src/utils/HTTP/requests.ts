import axios from 'axios';
import { KEY_USER_ID, UserInfo } from '@/store/userStore';
import { NO_PERMISSION, OK_CODE } from '@/app/keys';
import router from '@/route';
import nprogress from '@/utils/nprogress';

const requests = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
});

//拦截器
requests.interceptors.request.use((config = {}) => {
  //这里不能使用pinia，因为pinia在该文件可能为被vue初始化导致报错
  nprogress.start();
  try {
    const user = JSON.parse(localStorage.getItem(KEY_USER_ID) || '') as UserInfo;
    if (user.token) {
      config.headers!['Authorization'] = `Bearer ${user.token}`;
    }
  } catch (e) {}
  return config;
});

requests.interceptors.response.use(
  (resp) => {
    nprogress.done();
    const { code, msg } = resp.data || {};
    if (code !== OK_CODE) {
      return Promise.reject(msg);
    }
    if (code === NO_PERMISSION) {
      router.push({ name: 'Login' }).then();
      return Promise.reject(msg);
    }
    return Promise.resolve(resp);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;

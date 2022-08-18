import useHttp from '@/utils/HTTP/useHttp';
import { BasicResp } from '@/api/types';
import {LoginParams,LoginData,UserListData,RegParams} from './types'

//注册

// export const reqUserRegister = (params: RegParams) => {
//   //axios http
//   return useHttp<BasicResp<null>>({
//     url: `/v1/user`,
//     method: 'post',
//   });
// };

//登录
export const reqUserLogin = (params: LoginParams) => {
  //axios http
  return useHttp<BasicResp<LoginData>>({
    url: `/login`,
    method: 'post',
    data: { ...params },
  });
};
//获取用户信息
export const reqUserList = (page: number, size: number) => {
  return useHttp<BasicResp<UserListData>>({
    url: `/admin/v1/user`,
    method: 'get',
    params: { page, size },
  });
};
//添加用户
export const reqUserAdd = (params: RegParams) => {
  return useHttp<BasicResp<null>>({
    url: `/v1/user`,
    method: 'post',
    data: { ...params },
  });
};
//删除用户
export const reqUserDel = (id: number) => {
  return useHttp<BasicResp<null>>({
    url: `/admin/v1/user/${id}`,
    method: 'delete',
  });
};
//axios 封装完毕

//register 界面 x

//login 界面


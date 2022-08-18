//注册
export interface RegParams {
  username: string;
  password: string;
  email: string;
}
//登录
export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  info: UserInfo;
  token: string;
}

export interface UserInfo {
  id: number;
  create_time: string;
  update_time: string;
  username: string;
  email: string;
  role: string;
}

export interface UserListData {
  list: UserInfo[];
  total: number;
}

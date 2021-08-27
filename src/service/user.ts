import request from '@/utils/request';

// 用户注册
export async function registerUser(params: API.userInfo) {
  return request('/api/login/register', {
    method: 'POST',
    data: params,
  });
}

// 用户登录
export async function userLogin(params: API.userInfo) {
  return request('/api/login/user_login', {
    method: 'POST',
    data: params,
  });
}

// 用户修改信息
export async function userUpdate(params: API.updateUser) {
  return request('/api/login/update_userinfo', {
    method: 'POST',
    data: params,
  });
}

// 获取用户信息
export async function getUser(params: string) {
  return request('/api/login/userinfo', {
    method: 'GET',
    params: {
      id: params,
    },
  });
}

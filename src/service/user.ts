import request from '@/utils/request';

export async function registerUser(params: API.userInfo) {
  return request('/api/login/register', {
    method: 'POST',
    data: params,
  });
}

export async function userLogin(params: API.userInfo) {
  return request('/api/login/user_login', {
    method: 'POST',
    data: params,
  });
}

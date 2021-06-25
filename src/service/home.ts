import request from '@/utils/request';

export type homeListParamsType = {};

export async function getHomeList(params: homeListParamsType) {
  return request('/api/home/list', {
    method: 'GET',
  });
}

import request from '@/utils/request';

/**
 * @description: 获取项目列表
 * @param {object} query
 * @return {*}
 */
export async function getItem(query: { pageSize?: number; page?: number }) {
  return request('/api/proitem/list', {
    method: 'POST',
    data: query,
  });
}

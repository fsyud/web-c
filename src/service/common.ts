import request from '@/utils/request';

// 文件上传
export async function getArtDeatil(params: any) {
  return request('/api/home/detail', {
    method: 'POST',
    params: params,
  });
}

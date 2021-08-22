import request from '@/utils/request';

// 文件上传
export async function upLoadFiles(pmrams: any) {
  return request('/api/common/upload', {
    method: 'POST',
    requestType: 'form',
    data: pmrams,
  });
}

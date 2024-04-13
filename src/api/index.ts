import http from '../helpers/httpHelper';

const apiCommon = {
 getStingByUrl(url: string) {
  return http
   .post('/api/get-string-by-url', {
    url,
   })
   .then((res: { data: { content: string } }) => res.data);
 },
};

export default apiCommon;

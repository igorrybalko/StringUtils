import http from '../helpers/httpHelper';

import type { PageContent } from '../types';

const apiCommon = {
 getStingByUrl(url: string) {
  return http
   .post('/api/get-string-by-url', {
    url,
   })
   .then((res: { data: { content: string } }) => res.data);
 },
 getPageContent(id: number) {
  return http
   .get('/api/get-page/' + id)
   .then((res: { data: PageContent }) => res.data);
 },
};

export default apiCommon;

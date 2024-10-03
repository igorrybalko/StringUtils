import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getPageContent } from '../../store/slices/common';
import PageData from '../../classes/PageData';

const initPd = new PageData();

export default function DonatePage() {
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(8))
   .unwrap()
   .then((res) => {
    const { title, content } = res;

    setPd({ ...pd, content, title });
   })
   .catch(() => {});
 }, []);

 return (
  <div className='info-text'>
   <Helmet>
    <title>StringUtils - Donate</title>
    <link rel='canonical' href={import.meta.env.VITE_SITE_URL + '/donate'} />
    <meta
     name='description'
     content='StringUtils - Donate. You can support this project'
    />
   </Helmet>

   <h1>{pd.title}</h1>
   <div dangerouslySetInnerHTML={{ __html: pd.content }}></div>
  </div>
 );
}

import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';

import { useLoadPage, useAppDispatch } from '../hooks';
import { getPageContent } from '../store/slices/common';
import PageData from '../classes/PageData';

const initPd = new PageData();

type Props = {
 id: number;
 canonical: string;
 seoTitle: string;
};

export default function PrivacyPolicyPage({ id, seoTitle, canonical }: Props) {
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(id))
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
    <title>{seoTitle}</title>

    <link rel='canonical' href={import.meta.env.VITE_SITE_URL + canonical} />
   </Helmet>

   <h1>{pd.title}</h1>
   <div dangerouslySetInnerHTML={{ __html: pd.content }}></div>
  </div>
 );
}

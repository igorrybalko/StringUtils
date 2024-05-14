import { useLocation, useMatches } from 'react-router-dom';
import { useMemo } from 'react';

export default function SuShare() {
 const { pathname } = useLocation();
 const matches = useMatches();

 const url = useMemo(
  () => import.meta.env.VITE_SITE_URL + pathname,
  [pathname]
 );

 const hideShare = useMemo(() => {
  const id = matches[1]['id'];
  const is404 = id.slice(0, 2);

  if ('privacy-policy' == id || is404 == '0-') {
   return true;
  }

  return false;
 }, [pathname]);

 if (hideShare) {
  return null;
 }

 return (
  <div className='mb-30'>
   <div className='mb-10'>Share:</div>

   <div className='d-flex'>
    <div className='mr-10'>
     <a
      href={'https://www.facebook.com/sharer/sharer.php?u=' + url}
      target='_blank'
      rel='nofollow noreferrer'
     >
      <img width='32' height='32' src='/img/icon-fb.svg' alt='icon fb' />
     </a>
    </div>
    <div className='mr-10'>
     <a
      href={`https://x.com/share?&url=${url}`}
      target='_blank'
      rel='nofollow noreferrer'
     >
      <img width='32' height='32' src='/img/icon-x.svg' alt='icon x' />
     </a>
    </div>
    <div className='mr-10'>
     <a
      href={'https://www.linkedin.com/sharing/share-offsite/?url=' + url}
      target='_blank'
      rel='nofollow noreferrer'
     >
      <img width='32' height='32' src='/img/icon-ld.svg' alt='icon ld' />
     </a>
    </div>
   </div>
  </div>
 );
}

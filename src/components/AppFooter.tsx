import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { useEffect } from 'react';
import Cookie from 'cookie-universal';

import AppNotif from './AppNotif';
import AppCount from './AppCount';
//import AppCookieInfo from './AppCookieInfo';

import { useAppSelector } from '../hooks';

const { Footer } = Layout;

const cookies = Cookie();

export default function AppFooter() {
 const cookieAgree = useAppSelector((state) => state.common.cookieAgree);

 useEffect(() => {
  if (cookieAgree) {
   const cookieAgreeCookie = cookies.get('cookieAgree');

   if (!cookieAgreeCookie) {
    cookies.set('cookieAgree', cookieAgree, {
     path: '/',
     sameSite: 'strict',
     maxAge: 86400 * 365,
    });
   }
  }
 }, []);

 return (
  <Footer>
   <div className='wrapper'>
    <div className='text-center f-sm mb-10'>Convert your data as you want</div>
    <div className='d-flex jc-sb'>
     <div>&copy; 2025 StringUtils</div>

     <div>
      <Link to='/privacy-policy'>Privacy Policy</Link>
      {/* {cookieAgree === '1' && <AppCount />} */}
      <AppCount />
     </div>
    </div>
   </div>
   {/* {!cookieAgree && <AppCookieInfo />} */}
   <AppNotif />
  </Footer>
 );
}

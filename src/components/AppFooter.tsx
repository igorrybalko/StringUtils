import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import AppNotif from './AppNotif';
import AppCount from './AppCount';
import AppCookieInfo from './AppCookieInfo';

import { useAppSelector } from '../hooks';

const { Footer } = Layout;

export default function AppFooter() {
 const cookieAgree = useAppSelector((state) => state.common.cookieAgree);

 return (
  <Footer>
   <div className='wrapper'>
    <div className='text-center f-sm mb-10'>Convert your data as you want</div>
    <div className='d-flex jc-sb'>
     <div>&copy; 2024 String Utils</div>

     <div>
      <Link to='/privacy-policy'>Privacy Policy</Link>
      {cookieAgree === '1' && <AppCount />}
     </div>
    </div>
   </div>
   {!cookieAgree && <AppCookieInfo />}
   <AppNotif />
  </Footer>
 );
}

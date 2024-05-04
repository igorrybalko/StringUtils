import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import AppNotif from './AppNotif';
import AppCount from './AppCount';

const { Footer } = Layout;

export default function AppFooter() {
 return (
  <Footer>
   <div className='wrapper'>
    <div className='d-flex jc-sb'>
     <div>&copy; 2024 String Utils</div>

     <div>
      <Link to='/privacy-policy'>Privacy Policy</Link>
      <AppCount />
     </div>
    </div>
   </div>
   <AppNotif />
  </Footer>
 );
}

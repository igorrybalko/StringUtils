import { Layout } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';

import AppHeader from '../components/AppHeader';
import SuShare from '../components/SuShare';
import AppNotif from '../components/AppNotif';

import { useAppSelector } from '../hooks';

const { Footer, Content } = Layout;

export default function AppLayout() {
 const darkTheme = useAppSelector((state) => state.common.darkTheme);

 return (
  <Layout className={darkTheme ? 'dark-theme' : ''}>
   <div>
    <AppHeader />
    <Content>
     <div className='wrapper'>
      <Suspense fallback={<div>Loading...</div>}>
       <Outlet />
      </Suspense>
     </div>
    </Content>
    <div className='wrapper'>
     <SuShare />
    </div>
   </div>
   <Footer>
    <div className='wrapper'>
     <div className='d-flex jc-sb'>
      <div>&copy; 2024 String Utils</div>

      <div>
       <Link to='/privacy-policy'>Privacy Policy</Link>
      </div>
     </div>
    </div>
   </Footer>
   <AppNotif />
  </Layout>
 );
}

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

const SuShare = lazy(() => import('../components/SuShare'));

import { useAppSelector } from '../hooks';

const { Content } = Layout;

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
    <Suspense fallback={<div>Loading...</div>}>
     <div className='wrapper'>
      <SuShare />
     </div>
    </Suspense>
   </div>
   <AppFooter />
  </Layout>
 );
}

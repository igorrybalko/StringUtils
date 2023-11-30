import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/AppHeader';
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
      <Outlet />
     </div>
    </Content>
   </div>
   <Footer>
    <div className='wrapper'>&copy; 2023</div>
   </Footer>
  </Layout>
 );
}

import { Layout } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';

const { Header, Footer, Content } = Layout;

export default function AppLayout() {
 return (
  <Layout>
   <div>
    <Header>
     <div className='wrapper'>
      <Link to='/'>StringUtils</Link>
     </div>
    </Header>
    <Content>
     <div className='wrapper'>
      <Suspense fallback={<div>Loading</div>}>
       <Outlet />
      </Suspense>
     </div>
    </Content>
   </div>
   <Footer>
    <div className='wrapper'>&copy; 2023</div>
   </Footer>
  </Layout>
 );
}

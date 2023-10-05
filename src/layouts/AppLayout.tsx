import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

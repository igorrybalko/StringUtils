import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { MoonOutlined, SunOutlined, HeartOutlined } from '@ant-design/icons';

import { useAppDispatch } from '../hooks';
import { toggleTheme } from '../store/slices/common';

const { Header } = Layout;

export default function AppHeader() {
 const dispatch = useAppDispatch();

 function toggle() {
  dispatch(toggleTheme());
 }
 return (
  <Header>
   <div className='wrapper'>
    <div className='d-flex header-inner'>
     <Link to='/'>StringUtils</Link>
     <div className='d-flex top-menu'>
      <Link to='/donate'>
       <HeartOutlined /> Donate
      </Link>
      <div className='header-inner__toggle' onClick={toggle}>
       <MoonOutlined />
       <SunOutlined /> Toggle theme
      </div>
     </div>
    </div>
   </div>
  </Header>
 );
}

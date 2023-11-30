import { Layout } from 'antd';
import { Link } from 'react-router-dom';

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

     <div className='header-inner__toggle' onClick={toggle}>
      Toggle theme
     </div>
    </div>
   </div>
  </Header>
 );
}

import { List } from 'antd';
import { Link } from 'react-router-dom';

import menuList from '../config/home-menu';

type Props = {
 ids: number[];
};

export default function AppSidebar({ ids }: Props) {
 const list = menuList.filter((el) => ids.includes(el.id));

 return (
  <>
   <h3>Similar tools</h3>
   <List
    bordered
    dataSource={list}
    renderItem={(item) => (
     <List.Item>
      <Link to={item.url}>{item.title}</Link>
     </List.Item>
    )}
   ></List>
  </>
 );
}

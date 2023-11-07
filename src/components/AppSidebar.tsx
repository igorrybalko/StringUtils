import { List } from 'antd';
import { Link } from 'react-router-dom';

type PropListItem = {
 title: string;
 url: string;
};

type Props = {
 list: PropListItem[];
};

export default function AppSidebar({ list }: Props) {
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

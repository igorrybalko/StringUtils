import { Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';

export default function HomePage() {
 const list = [
  {
   url: '/base64-encode',
   title: 'Base64 Encode',
  },
  {
   url: '/base64-decode',
   title: 'Base64 Decode',
  },
  {
   url: '/md5-generator',
   title: 'MD5 Hash Generator',
  },
  {
   url: '/translit-url',
   title: 'Translit URL',
  },
  {
   url: '/case-converter',
   title: 'Case Converter',
  },
 ];

 return (
  <div>
   <h1>String conversion utilities online</h1>
   <Divider />
   <Row gutter={[24, 0]}>
    {list.map((el) => (
     <Col span={6} key={el.url}>
        <div className="mb-30">
            <Link to={el.url}>{el.title}</Link>
        </div>
     </Col>
    ))}
   </Row>
  </div>
 );
}

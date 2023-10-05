import { Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';

export default function HomePage() {
 return (
  <div>
   <h1>String conversion utilities online</h1>
   <Divider />
   <Row gutter={[24, 0]}>
    <Col span={6}>
     <Link to='/base64-encode'>Base64 Encode</Link>
    </Col>
    <Col span={6}>
     <Link to='/base64-decode'>Base64 Decode</Link>
    </Col>
    <Col span={6}>
     <Link to='/md5-generator'>MD5 Hash Generator</Link>
    </Col>
    <Col span={6}>
     <Link to='/translit-url'>Translit URL</Link>
    </Col>
   </Row>
  </div>
 );
}

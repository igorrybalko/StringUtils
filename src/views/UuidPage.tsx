import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, notification, Divider, Row, Col } from 'antd';
import copy from 'copy-to-clipboard';

import AppSidebar from '../components/AppSidebar';

export default function UuidPage() {
 const [uuid, setUuid] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const navList = [
  {
   title: 'MD5 Hash Generator',
   url: '/md5-generator',
  },
 ];

 useEffect(() => {
  generateUuid();
 }, []);

 function generateUuid() {
  const id = crypto.randomUUID();
  setUuid(id);
 }

 function copyText() {
  copy(uuid);
  api.success({
   message: 'Сopied',
  });
 }

 return (
  <div>
   <Helmet>
    <title>Online UUID Generator (Version 4)</title>
    <meta
     name='description'
     content='Online tool for random generate UUID (Universally Unique Identifier) - version 4'
    />
    <link rel='canonical' href={import.meta.env.VITE_SITE_URL + '/uuid'} />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Online UUID (Version-4) Generator</h1>
     <div className='text-center mb-30 p-input'>{uuid}</div>
     <div className='mb-30'>
      <Button type='primary' onClick={copyText}>
       Copy UUID
      </Button>
     </div>
     <div className='mb-30'>
      <Button type='primary' onClick={generateUuid}>
       Generate new UUID
      </Button>
      <Divider />
      <h2>What is UUID V4?</h2>
      <div>
       <p>
        UUID (Universally Unique Identifier) version 4 is a randomly generated
        identifier composed of 32 hexadecimal digits, typically displayed in the
        format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where each "x" represents a
        hexadecimal digit and "y" is one of the reserved digits. UUID v4 is
        generated using random or pseudo-random numbers, ensuring a high
        probability of uniqueness.
       </p>
       <p>
        This type of UUID is widely used across various applications and systems
        where unique identification is crucial, such as distributed systems,
        databases, messaging systems, and cryptographic applications. It is
        particularly favored in scenarios where the chances of generating
        duplicate identifiers need to be extremely low or practically
        impossible. Common use cases include session management in web
        applications, tracking unique user interactions, generating unique
        identifiers for database records, and creating unique identifiers for
        files or resources in cloud storage systems
       </p>
       <p>
        Additionally, UUID v4 is utilized in security-related applications, such
        as generating secure tokens, session IDs, or cryptographic keys. Its
        randomness and uniqueness properties make it suitable for cryptographic
        operations and secure data transmission. Overall, UUID v4 serves as a
        reliable solution for generating unique identifiers in a wide range of
        applications, contributing to robustness, scalability, and security in
        distributed computing environments.
       </p>
      </div>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

import {
 Button,
 Form,
 Input,
 Divider,
 notification,
 Space,
 Row,
 Col,
} from 'antd';
import { useState } from 'react';
import md5 from 'md5';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import AppSidebar from '../components/AppSidebar';

const { TextArea } = Input;

export default function Md5GeneratorPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const navList = [
  {
   title: 'UUID Generator',
   url: '/uuid',
  },
 ];

 const onFinish = (val: { text: string }) => {
  setResult(md5(val.text));
 };

 function copyText() {
  if (result.length) {
   copy(result);
   api.success({
    message: 'Сopied',
   });
  }
 }

 const onReset = () => {
  setResult('');
 };

 return (
  <div>
   <Helmet>
    <title>MD5 Hash Generator Online</title>
    <meta
     name='description'
     content='Online tool for generate MD5 hash. Create MD5 for free'
    />
    <meta
     name='keywords'
     content='md5, hash, generator, create, string, encode, encrypt'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/md5-generator'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>MD5 Hash Generator</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
      >
       <TextArea
        className='textarea'
        spellCheck='false'
        placeholder='Type your text...'
       />
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Generate
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <div className='caption'>Result:</div>
     <div className='p-input mb-24'>{result}</div>
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />
     <div>
      <h2>Online generator md5 hash</h2>
      <p>
       NPM package{' '}
       <a href='https://www.npmjs.com/package/md5' target='_blank'>
        MD5
       </a>{' '}
       is used for hashing.
      </p>
      <p>
       <strong>MD5</strong> (Message Digest Algorithm 5) is a widely-used
       cryptographic hash function that generates a 128-bit (16-byte) hash
       value, typically represented as a 32-character hexadecimal number.
       Originally designed for data integrity verification and digital
       signatures, <strong>MD5</strong> has been extensively utilized in various
       applications such as checksums for verifying data integrity, password
       storage (though its use for this purpose is now discouraged due to
       vulnerabilities), and digital signatures for software distribution.
      </p>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

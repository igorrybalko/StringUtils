import {
 Button,
 Form,
 Input,
 Divider,
 notification,
 Space,
 Col,
 Row,
} from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import AppSidebar from '../components/AppSidebar';

const { TextArea } = Input;

export default function Base64DecodePage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const navList = [
  {
   title: 'Base64 Encode',
   url: '/base64-encode',
  },
 ];

 function b64DecodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
   atob(str)
    .split('')
    .map(function (c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join('')
  );
 }

 const onFinish = (val: { text: string }) => {
  try {
   const str = b64DecodeUnicode(val.text);
   setResult(str);
  } catch (err) {
   api.error({
    message: 'Error',
    description: 'invalid text',
   });
  }
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
    <title>Base64 Decode Online</title>
    <meta
     name='description'
     content='Decode a string from Base64 format online'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/base64-decode'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Base64 Decode</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
      >
       <TextArea
        className='textarea'
        placeholder='Type your text...'
        spellCheck='false'
       />
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Decode
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <h2>Result:</h2>
     <div className='p-textarea mb-24'>{result}</div>
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />
     <div>
      <p>
       Decoding is done using the{' '}
       <a
        href='https://developer.mozilla.org/en-US/docs/Web/API/atob'
        target='_blank'
        rel='nofollow'
       >
        atob()
       </a>{' '}
       function
      </p>
      <p>The service allows you to decode text (string) encoded in Base64</p>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

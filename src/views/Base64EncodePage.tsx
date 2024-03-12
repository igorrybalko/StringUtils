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

export default function Base64EncodePage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const navList = [
  {
   title: 'Base64 Decode',
   url: '/base64-decode',
  },
 ];

 function b64EncodeUnicode(str: string) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
   encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    function toSolidBytes(_match, p1) {
     return String.fromCharCode(parseInt('0x' + p1, 16));
    }
   )
  );
 }

 const onFinish = (val: { text: string }) => {
  try {
   const str = b64EncodeUnicode(val.text);
   setResult(str);
  } catch (err) {
   console.log(err);
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
    <title>Base64 Encode Online Tools</title>
    <meta name='description' content='Encode string to Base64 format online' />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/base64-encode'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Base64 Encode</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
      >
       <TextArea
        spellCheck='false'
        className='textarea'
        placeholder='Type your text...'
       />
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Encode
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <div className='caption'>Result:</div>
     <div className='p-textarea mb-24'>{result}</div>
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />
     <div>
      <h2>Encode a string to Base64 online</h2>
      <p>
       Encoding is done using the{' '}
       <a
        href='https://developer.mozilla.org/en-US/docs/Web/API/btoa'
        target='_blank'
        rel='nofollow'
       >
        btoa()
       </a>{' '}
       function
      </p>
      <p>
       Base64 is a standard for encoding binary data using only 64 ASCII
       characters. The encoding uses Latin characters A-Z, a-z, numbers 0-9 (62
       characters in total) and 2 additional characters
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

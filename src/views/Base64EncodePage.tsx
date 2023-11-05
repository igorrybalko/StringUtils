import { Button, Form, Input, Divider, notification, Space } from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

const { TextArea } = Input;

export default function Base64EncodePage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const onFinish = (val: { text: string }) => {
  
  try {
    setResult(btoa(val.text));
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
    <title>Base64 Encode Online</title>
    <meta name='description' content='Encode string to Base64 format online' />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/base64-encode'}
    />
   </Helmet>
   {contextHolder}
   <h1>Base64 Encode</h1>
   <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
    <Form.Item
     name='text'
     rules={[{ required: true, message: 'Please enter data' }]}
    >
     <TextArea
      size='large'
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
   <h2>Result:</h2>
   <div className='p-textarea mb-24'>{result}</div>
   <Button type='primary' onClick={copyText}>
    Copy
   </Button>
   <Divider />
   <div>
    <h3>Encode a string to Base64 online</h3>
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
  </div>
 );
}

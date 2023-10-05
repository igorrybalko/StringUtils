import { Button, Form, Input, Divider, notification } from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';

const { TextArea } = Input;

export default function Base64EncodePage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const onFinish = (val: { text: string }) => {
  setResult(btoa(val.text));
 };

 function copyText() {
  if (result.length) {
   copy(result);
   api.success({
    message: 'Сopied',
   });
  }
 }

 return (
  <div>
   {contextHolder}
   <h1>Base64 Encode</h1>
   <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
    <Form.Item
     name='text'
     rules={[{ required: true, message: 'Please enter data' }]}
    >
     <TextArea
      size='large'
      className='textarea'
      placeholder='Type your text...'
     />
    </Form.Item>

    <Form.Item>
     <Button type='primary' htmlType='submit'>
      Encode
     </Button>
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
    <p>Encode a string to Base64 online</p>
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
   </div>
  </div>
 );
}

import { Button, Form, Input, Divider, notification } from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';

const { TextArea } = Input;

export default function CaseConverterPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const onFinish = (val: { text: string }) => {
  try {
   const txt = atob(val.text);
   setResult(txt);
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

 return (
  <div>
   {contextHolder}
   <h1>Base64 Decode</h1>
   <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
    <Form.Item
     name='text'
     rules={[{ required: true, message: 'Please enter data' }]}
    >
     <TextArea className='textarea' placeholder='Type your text...' />
    </Form.Item>

    <Form.Item>
     <Button type='primary' htmlType='submit'>
      Decode
     </Button>
     <Button  type='primary' htmlType='submit'>Default</Button>
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
    Decoding is done using the{' '}
    <a
     href='https://developer.mozilla.org/en-US/docs/Web/API/atob'
     target='_blank'
     rel='nofollow'
    >
     atob()
    </a>{' '}
    function
   </div>
  </div>
 );
}
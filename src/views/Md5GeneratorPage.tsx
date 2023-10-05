import { Button, Form, Input, Divider, notification } from 'antd';
import { useState } from 'react';
import md5 from 'md5';
import copy from 'copy-to-clipboard';

const { TextArea } = Input;

export default function Md5GeneratorPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

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

 return (
  <div>
   {contextHolder}
   <h1>MD5 Hash Generator</h1>
   <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
    <Form.Item
     name='text'
     rules={[{ required: true, message: 'Please enter data' }]}
    >
     <TextArea className='textarea' placeholder='Type your text...' />
    </Form.Item>

    <Form.Item>
     <Button type='primary' htmlType='submit'>
      Generate
     </Button>
    </Form.Item>
   </Form>
   <Divider />
   <h2>Result:</h2>
   <div className='p-input mb-24'>{result}</div>
   <Button type='primary' onClick={copyText}>
    Copy
   </Button>
   <Divider />
   <div>
    <p>Online generator md5 hash</p>
    <p>
     NPM package{' '}
     <a href='https://www.npmjs.com/package/md5' target='_blank'>
      MD5
     </a>{' '}
     is used for hashing
    </p>
   </div>
  </div>
 );
}

import { Button, Form, Input, Divider, notification } from 'antd';
import { useState } from 'react';
import md5 from 'md5';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

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
   <Helmet>
    <title>MD5 Hash Generator Online</title>
    <meta name='description' content='Online tool for generate MD5 hash' />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/md5-generator'}
    />
   </Helmet>
   {contextHolder}
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
    <h3>Online generator md5 hash</h3>
    <p>
     NPM package{' '}
     <a href='https://www.npmjs.com/package/md5' target='_blank'>
      MD5
     </a>{' '}
     is used for hashing.
    </p>
    <p>
     Using the service you can encrypt text and passwords. MD5 cannot be
     decrypted, since reverse encoding is not provided in this algorithm, which
     ensures high security of encrypted data.
    </p>
    <p>
     MD5 (Message Digest 5) is a 128-bit hashing algorithm developed by
     Professor Ronald L. Rivest in 1991. Designed to create "prints" or
     "digests" of messages of arbitrary length
    </p>
   </div>
  </div>
 );
}

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
import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';
import { CopyOutlined } from '@ant-design/icons';

import AppSidebar from '../../components/AppSidebar';
import AppExample from '../../components/AppExample';

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getPageContent } from '../../store/slices/common';
import PageData from '../../classes/PageData';

const { TextArea } = Input;
const initPd = new PageData();

export default function Base64DecodePage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(4))
   .unwrap()
   .then((res) => {
    const { json } = res;
    const example = JSON.parse(json);

    setPd({ ...pd, example });
   })
   .catch(() => {});
 }, []);

 const navIds = [1, 3];

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
    <title>Base64 Decode Online Tools - Free</title>
    <meta
     name='description'
     content='A Base64 decoding service is a convenient online tool that swiftly converts Base64-encoded data back to its original format'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/base64-decode'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Base64 Decode Online (Text)</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
       label='Enter Base64'
      >
       <TextArea
        className='textarea'
        placeholder='Type your Base64...'
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
     <div className='caption'>Result:</div>
     <div className='p-textarea mb-24'>{result}</div>
     <Button type='primary' onClick={copyText} icon={<CopyOutlined />}>
      Copy
     </Button>
     <Divider />
     <div className='info-text'>
      <h2>About Base64 Decoding</h2>
      <p>
       Decoding is done using the{' '}
       <a
        href='https://developer.mozilla.org/en-US/docs/Web/API/atob'
        target='_blank'
        rel='nofollow noreferrer'
       >
        atob()
       </a>{' '}
       function
      </p>
      <p>
       <strong>Base64</strong> decoding service is a valuable online tool that
       efficiently converts Base64-encoded data into its original form, commonly
       used for encoding binary data in ASCII characters. This service proves
       beneficial for developers, data analysts, and anyone working with encoded
       data, as it simplifies the process of decoding and facilitates easy
       interpretation of information.
      </p>
      <p>
       Its user-friendly interface and accessibility make it a handy resource
       for individuals seeking a hassle-free solution to decode{' '}
       <strong>Base64</strong> data without the necessity for programming
       skills. Furthermore, this service can be particularly useful in web
       development, data exchange, and debugging scenarios, enhancing overall
       efficiency in handling encoded content. Embracing such decoding services
       can save time and streamline workflows for professionals dealing with
       encoded information on a regular basis.
      </p>
     </div>
     <AppExample example={pd.example} />
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

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

export default function Base64EncodePage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(3))
   .unwrap()
   .then((res) => {
    const { json } = res;
    const example = JSON.parse(json);

    setPd({ ...pd, example });
   })
   .catch(() => {});
 }, []);

 const navIds = [2, 3];

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
    <title>Base64 Encode Online Tools - Free</title>
    <meta
     name='description'
     content='Encode string to Base64 format online - free. Convert text to Base64'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/base64-encode'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Base64 Encode Online (Text)</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
       label='Enter text'
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
     <div className='caption'>Result in Base64:</div>
     <div className='p-textarea mb-24'>{result}</div>
     <Button type='primary' onClick={copyText} icon={<CopyOutlined />}>
      Copy
     </Button>
     <Divider />
     <div className='info-text'>
      <h2>Encode a string to Base64 online</h2>
      <p>
       Base64 is a binary-to-text encoding scheme that converts binary data into
       an ASCII string format. It is commonly used to encode data so that it can
       be safely transmitted over mediums that handle only text, such as email
       or HTTP. Base64 works by dividing binary data into 6-bit chunks and
       mapping each chunk to a corresponding ASCII character. This encoding
       method ensures that the data remains intact and unaltered when
       transmitted over text-based protocols.
      </p>
      <p>
       An online service that allows users to encode a string to Base64 would be
       highly useful for developers, particularly when they need to encode data
       such as sensitive information into a text-friendly format. For example,
       if an API requires a file to be embedded in a request or when sending a
       binary file over email as part of the payload, encoding the data in
       Base64 ensures that the underlying binary data is safely transported.
      </p>
      <p>
       Using the service would be straightforward: users would input their
       string (such as text or binary data) into a provided text box, and the
       service would output the Base64-encoded version. This could be used in
       cases like embedding CSS, securely transmitting sensitive data like
       passwords, or storing non-text data in databases in a text-friendly way.
      </p>
      <p>
       This kind of tool is also essential in authentication systems where
       Base64 is used to encode credentials for HTTP Basic Authentication or to
       generate tokens for OAuth systems. Since Base64 encoding is reversible, a
       separate decoding tool would be necessary to convert the encoded text
       back into its original form.
      </p>
      <p>
       In short, an online Base64 encoding service helps developers simplify and
       safeguard data transmission, while making it compatible with various
       text-based systems. It is invaluable for ensuring that data remains
       intact when transmitted across different platforms.
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

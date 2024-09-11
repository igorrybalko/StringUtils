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
import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import { useLoadPage, useAppDispatch } from '../hooks';
import { getPageContent } from '../store/slices/common';

import AppSidebar from '../components/AppSidebar';
import AppExample from '../components/AppExample';

import PageData from '../classes/PageData';

const { TextArea } = Input;
const initPd = new PageData();

const navList = [
 {
  title: 'JSON Minify',
  url: '/json-minify',
 },
];

export default function JsonStringifyTextPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(6))
   .unwrap()
   .then((res) => {
    const { json } = res;
    const example = JSON.parse(json);

    if (example) {
     setPd({ ...pd, example });
    }
   })
   .catch(() => {});
 }, []);

 const onFinish = (val: { text: string }) => {
  const str = JSON.stringify(val.text);
  setResult(str);
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
    <title>JSON Stringify Text Generator Online Tools</title>
    <meta
     name='description'
     content='Simple and fast convert text to json string. Using JSON.stringify(). It also you can to share stringify JSON data. Free online tool'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/json-stringify'}
    />
   </Helmet>
   {contextHolder}

   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>JSON Stringify Text Generator Online</h1>
     <p>Free online tool for JSON stringifying text</p>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
       label='Enter your data'
      >
       <TextArea
        className='textarea'
        placeholder='Type or paste your content here...'
        spellCheck='false'
       />
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Submit
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset all
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
     <div className='info-text'>
      <h2>About JSON.stringify</h2>
      <p>
       This online service convert string value to JSON String using JavaScript
       JSON.stringify()
      </p>
      <p>
       <strong>JSON stringify</strong> is particularly useful when working with
       APIs, as it allows developers to easily serialize JavaScript objects into
       a format that can be transmitted over the network. Additionally, it's
       used in client-server communication, where JavaScript objects need to be
       converted to strings before being sent to the server, or vice versa, when
       receiving JSON data from the server and parsing it into JavaScript
       objects. Overall, JSON.stringify plays a crucial role in JavaScript
       programming for handling data interchange in a structured and efficient
       manner.
      </p>
     </div>
     <AppExample example={pd.example} />
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

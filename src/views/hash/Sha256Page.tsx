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
import { CopyOutlined } from '@ant-design/icons';

import AppSidebar from '../../components/AppSidebar';
import AppExample from '../../components/AppExample';

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getPageContent } from '../../store/slices/common';
import PageData from '../../classes/PageData';

const { TextArea } = Input;
const initPd = new PageData();

function getHash(str: string) {
 const utf8 = new TextEncoder().encode(str);
 return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
   .map((bytes) => bytes.toString(16).padStart(2, '0'))
   .join('');
  return hashHex;
 });
}

export default function Sha256Page() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(7))
   .unwrap()
   .then((res) => {
    const { title, content, json } = res;
    const example = JSON.parse(json);

    setPd({ ...pd, example, content, title });
   })
   .catch(() => {});
 }, []);

 const navIds = [4, 19, 9];

 const onFinish = async (val: { text: string }) => {
  const hash = await getHash(val.text);
  setResult(hash);
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
    <title>SHA-256 Generator Online Tool</title>
    <meta
     name='description'
     content='Online tool for generate SHA-256 hash. SHA-256 encryption online for free'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/sha-256'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>{pd.title}</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
       label='Enter text'
      >
       <TextArea
        className='textarea'
        spellCheck='false'
        placeholder='Type your text...'
       />
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Generate
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <div className='caption'>Result:</div>
     <div className='p-input mb-24'>{result}</div>
     <Button type='primary' onClick={copyText} icon={<CopyOutlined />}>
      Copy
     </Button>
     <Divider />
     <div
      className='info-text'
      dangerouslySetInnerHTML={{ __html: pd.content }}
     ></div>
     <AppExample example={pd.example} />
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

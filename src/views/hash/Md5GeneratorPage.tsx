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
import md5 from 'md5';
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

export default function Md5GeneratorPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(5))
   .unwrap()
   .then((res) => {
    const { json, content, title } = res;
    const example = JSON.parse(json);

    setPd({ ...pd, example, content, title });
   })
   .catch(() => {});
 }, []);

 const navIds = [16, 19, 9];

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

 const onReset = () => {
  setResult('');
 };

 return (
  <div>
   <Helmet>
    <title>MD5 Generator Online Tool</title>
    <meta
     name='description'
     content='Online tool for generate MD5 hash. MD5 encryption online for free'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/md5-generator'}
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

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

import AppSidebar from '../../components/AppSidebar';

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getPageContent, getHtpasswd } from '../../store/slices/common';
import PageData from '../../classes/PageData';

const initPd = new PageData();

export default function Md5GeneratorPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(13))
   .unwrap()
   .then((res) => {
    const { subtitle, content, title } = res;

    setPd({ ...pd, content, title, subtitle });
   });
 }, []);

 const navIds = [4, 16, 9];

 const onFinish = (val: { username: string; password: string }) => {
  dispatch(getHtpasswd(val.password))
   .unwrap()
   .then((res) => {
    const result = val.username.trim() + ':' + res.htpasswd;
    setResult(result);
   });
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
    <title>Htpasswd Generator Online</title>
    <meta
     name='description'
     content='Online tool for generating (creating) a hashed password for htpasswd'
    />
    <link rel='canonical' href={import.meta.env.VITE_SITE_URL + '/htpasswd'} />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>{pd.title}</h1>
     <p>{pd.subtitle}</p>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
       name='username'
       rules={[
        { required: true, message: 'The field is required', whitespace: true },
       ]}
       label='Username'
      >
       <Input spellCheck='false' placeholder='Type your username...' />
      </Form.Item>

      <Form.Item
       name='password'
       rules={[
        { required: true, message: 'The field is required', whitespace: true },
       ]}
       label='Password'
      >
       <Input.Password spellCheck='false' placeholder='Type your password...' />
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
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />
     <div
      className='info-text'
      dangerouslySetInnerHTML={{ __html: pd.content }}
     ></div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

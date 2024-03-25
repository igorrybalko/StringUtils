import {
 Button,
 Form,
 Divider,
 notification,
 Space,
 Col,
 Row,
 Upload,
 Select,
} from 'antd';

import type { UploadFile } from 'antd';

import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';
import { UploadOutlined } from '@ant-design/icons';

import AppSidebar from '../../components/AppSidebar';
import { useLoadPage } from '../../hooks';

const { Option } = Select;

export default function ImgToBase64Page() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 useLoadPage();

 const navList = [
  {
   title: 'Base64 Encode',
   url: '/base64-encode',
  },
  {
   title: 'Base64 Decode',
   url: '/base64-decode',
  },
 ];

 const onFinish = (val: { upload: UploadFile[] }) => {
  if (val.upload) {
   try {
    const str = val.upload[0].thumbUrl;

    if (str) {
     setResult(str);
    }
   } catch (err) {
    console.log(err);
    api.error({
     message: 'Error',
     description: '',
    });
   }
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

 const normFile = (e: any) => {
  if (Array.isArray(e)) {
   return e;
  }
  return e?.fileList;
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
     href={import.meta.env.VITE_SITE_URL + '/img-to-base64'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Base64 Encode Online (Text)</h1>
     <Form
      onFinish={onFinish}
      autoComplete='off'
      layout='vertical'
      initialValues={{ format: 'simple' }}
     >
      <Form.Item
       name='upload'
       label='Upload'
       valuePropName='fileList'
       getValueFromEvent={normFile}
      >
       <Upload
        name='img'
        listType='picture'
        maxCount={1}
        accept='image/png, image/jpeg'
        beforeUpload={() => {
         /* update state here */
         return false;
        }}
       >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
       </Upload>
      </Form.Item>

      <Form.Item name='format' label='Output Format'>
       <Select placeholder='Please select a country'>
        <Option value='simple'>Only Base64</Option>
        <Option value='dataUri'>Data URI</Option>
       </Select>
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Encode image to Base64
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
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />
     <div>
      <h2>Encode a string to Base64 online</h2>
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
      <p>
       Base64 is a standard for encoding binary data using only 64 ASCII
       characters. The encoding uses Latin characters A-Z, a-z, numbers 0-9 (62
       characters in total) and 2 additional characters
      </p>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

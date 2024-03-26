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

type ConvertType = 'simple' | 'dataUri';

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

 const converter = {
  simple(str: string) {
   const arr = str.split(';base64,');
   return arr[1];
  },
  dataUri(str: string) {
   return str;
  },
 };

 const onFinish = (val: { upload: UploadFile[]; format: ConvertType }) => {
  if (val.upload && val.upload[0]) {
   try {
    const reader = new FileReader();
    reader.onloadend = () => {
     const rawStr = reader.result;
     if (rawStr) {
      const str = converter[val.format](rawStr as string);
      setResult(str);
     }
    };
    reader.readAsDataURL(val.upload[0].originFileObj as File);
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
  if (e.file.size > 9441674) {
   api.error({
    message: 'Error',
    description: 'File too big',
   });
   return null;
  }

  if (Array.isArray(e)) {
   return e;
  }
  return e?.fileList;
 };

 return (
  <div>
   <Helmet>
    <title>
     Image to Base64 Converter Online | Base64 Image Encoder (Free)
    </title>
    <meta name='description' content='Convert an image to Base64 online. Conver jpg, png, svg, webp to Base64' />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/img-to-base64'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Convert Image to Base64 Online</h1>
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
        accept='image/png, image/jpeg, image/svg+xml, image/webp'
        beforeUpload={() => {
         /* update state here */
         return false;
        }}
       >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
       </Upload>
      </Form.Item>

      <Form.Item name='format' label='Output Format'>
       <Select>
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
      <h2>Encode your image to Base64 online</h2>
      <p>
       You can upload an image in next formats:{' '}
       <strong>jpg, png, svg, webp</strong>. Maximum image size{' '}
       <strong>9 MB</strong>.
      </p>
      <p>We don't save your images on our server.</p>
      <p>
       Once you have a Base64 string representation of an image, you can use it
       in various ways depending on your specific requirements and the
       environment you're working in:
      </p>
      <ul>
       <li>
        <strong>Embedding in HTML:</strong> You can directly embed the Base64
        string into HTML using the img tag with the src attribute set to the
        Base64 string. This allows you to display the image on a webpage without
        needing a separate image file.
       </li>
       <li>
        <strong>Storing in Databases:</strong> If you're working with databases,
        you can store the Base64 string as a text. This allows you to
        efficiently store and retrieve image data without needing to handle
        separate image files.
       </li>
       <li>
        <strong>Sending via APIs:</strong> When working with APIs, you can
        include the Base64 string as part of the payload when sending data to a
        server. This enables you to transmit image data along with other
        information in a single request.
       </li>
      </ul>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

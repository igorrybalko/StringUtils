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

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getStingByUrl, getPageContent } from '../../store/slices/common';

import AppSidebar from '../../components/AppSidebar';
import AppExample from '../../components/AppExample';
import DownloadBtn from '../../components/DowloadBtn';

import PageData from '../../classes/PageData';

const { TextArea } = Input;
const initPd = new PageData();

const navIds = [12, 15, 14, 13, 10];

export default function JsonStringifyTextPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [url, setUrl] = useState('');
 const [loading, setLoading] = useState(false);
 const [form] = Form.useForm();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(2))
   .unwrap()
   .then((res) => {
    const { title, subtitle, content, json } = res;
    const example = JSON.parse(json);

    setPd({ title, subtitle, content, example });
   })
   .catch(() => {});
 }, []);

 const onFinish = (val: { text: string }) => {
  try {
   const str = JSON.stringify(JSON.parse(val.text));
   setResult(str);
  } catch (err) {
   api.error({
    message: 'Error',
    description: 'JSON Data is invalid',
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
  setUrl('');
 };

 function loadUrl() {
  const trimUrl = url.trim();
  if (trimUrl) {
   if (trimUrl.startsWith('https://')) {
    setLoading(true);

    dispatch(getStingByUrl(url))
     .unwrap()
     .then((res) => {
      form.setFieldsValue({
       text: res.content,
      });
     })
     .finally(() => {
      setTimeout(() => {
       setLoading(false);
      }, 500);
     })
     .catch(() => {});
   } else {
    api.error({
     message: 'Error',
     description: 'URL should start with "https://"',
    });
   }
  }
 }

 return (
  <div>
   <Helmet>
    <title>JSON Minifier (Compressor) Online</title>
    <meta
     name='description'
     content='This online service minifies the JSON by removing unnecessary spaces and hyphens'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/json-minify'}
    />
   </Helmet>
   {contextHolder}

   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>{pd.title}</h1>
     <p>{pd.subtitle}</p>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical' form={form}>
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
       label='Enter your JSON'
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
         Compress
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset all
        </Button>
       </Space>
      </Form.Item>
     </Form>

     <Row gutter={[12, 0]}>
      <Col xs={24} sm={24} md={12}>
       <div className='mb-24'>
        <label>Load URL</label>
        <Space.Compact style={{ width: '100%' }}>
         <Input
          placeholder='https://example.com/file.json'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
         />
         <Button type='primary' onClick={loadUrl} loading={loading}>
          Load
         </Button>
        </Space.Compact>
       </div>
      </Col>
     </Row>
     <Divider />
     <div className='caption'>Result:</div>
     <div className='p-textarea mb-24'>{result}</div>
     <Space>
      <Button type='primary' onClick={copyText} icon={<CopyOutlined />}>
       Copy
      </Button>
      <DownloadBtn name='file.json' content={result} />
     </Space>
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

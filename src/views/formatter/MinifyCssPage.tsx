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
import { Helmet } from 'react-helmet';
import { useState, useRef } from 'react';
import { minify } from 'csso';
import AceEditor from 'react-ace';
import copy from 'copy-to-clipboard';

import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import AppSidebar from '../../components/AppSidebar';
import { useLoadPage, useAppDispatch } from '../../hooks';
import { getStingByUrl } from '../../store/slices/common';

const navIds = [12, 15, 14, 11];

export default function MinifyCssPage() {
 useLoadPage();

 const [result, setResult] = useState('');
 const [editorValue, setEditorValue] = useState('');
 const [resetKey, setResetKey] = useState(0);
 const [url, setUrl] = useState('');
 const [loading, setLoading] = useState(false);

 const [api, contextHolder] = notification.useNotification();
 const [form] = Form.useForm();
 const dispatch = useAppDispatch();

 const editorRef = useRef(null);

 const onFinish = (val: { text: string }) => {
  try {
   if (val.text?.length) {
    const str = val.text.trim();

    let result = minify(str);

    setEditorValue(val.text);

    setResult(result.css);
   }
  } catch (err) {
   console.log(err);
   api.error({
    message: 'Error',
    description: 'Invalid data',
   });
  }
 };

 const onReset = () => {
  setResult('');
  setEditorValue('');
  setResetKey((val) => (val += 1));
  setUrl('');
 };

 function copyText() {
  if (result?.length) {
   copy(result);
   api.success({
    message: 'Сopied',
   });
  }
 }

 function onChange(newValue: string) {
  form.setFieldsValue({
   text: newValue,
  });
 }

 function loadUrl() {
  const trimUrl = url.trim();
  if (trimUrl) {
   const notHttps = !trimUrl.startsWith('https://');
   const notCss = !trimUrl.includes('.css');

   if (notHttps || notCss) {
    const httpsTxt = 'URL should start with "https://"';
    const cssTxt = 'URL should contain ".сss"';

    const description = notHttps ? httpsTxt : cssTxt;

    api.error({
     message: 'Error',
     description,
    });

    return;
   }

   setLoading(true);

   dispatch(getStingByUrl(url))
    .unwrap()
    .then((res) => {
     setEditorValue(res.content);
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
  }
 }

 return (
  <div>
   <Helmet>
    <title>Minify CSS Online Free | CSS Compressor</title>
    <meta
     name='description'
     content='Free online tool for minifying (compressing) CSS in the browser'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/minify-css'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Minify CSS Online</h1>

     <Form onFinish={onFinish} autoComplete='off' layout='vertical' form={form}>
      <Form.Item name='text' className='hidden'>
       <Input type='hidden' />
      </Form.Item>

      <div className='mb-24'>
       <label>Enter your CSS</label>
       <AceEditor
        mode='css'
        theme='github'
        name='inputcode'
        width='100%'
        editorProps={{ $blockScrolling: true }}
        onChange={onChange}
        height='250px'
        value={editorValue}
        ref={editorRef}
        key={'one' + resetKey}
       />
      </div>

      <Row gutter={[12, 0]}>
       <Col xs={24} sm={24} md={12}>
        <div className='mb-24'>
         <label>Load URL</label>
         <Space.Compact style={{ width: '100%' }}>
          <Input
           placeholder='https://example.com/style.css'
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

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Minify
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset all
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <div className='mb-24'>
      <label>Result</label>
      <AceEditor
       mode='css'
       theme='github'
       name='outputcode'
       width='100%'
       height='150px'
       value={result}
       editorProps={{ $blockScrolling: true }}
       key={'two' + resetKey}
      />
     </div>
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />

     <div className='info-text'>
      <h2>CSS Compressor</h2>
      <p>
       Minifying or compressing CSS involves removing unnecessary whitespace,
       comments, and redundant code from Cascading Style Sheets (CSS) files,
       resulting in a smaller file size. This process is highly beneficial in
       web development for optimizing website performance by reducing page load
       times and bandwidth usage.
      </p>
      <p>
       Minified CSS files load faster, leading to improved user experience and
       better search engine rankings due to faster page load times. Web
       developers commonly use CSS minification in production environments to
       optimize website performance, especially for large-scale websites or
       applications with numerous CSS files.
      </p>
      <p>
       Furthermore, minification is useful for mobile web development, where
       reducing file sizes is critical for improving loading times on mobile
       devices with limited bandwidth and processing power.
      </p>
      <p>
       Overall, CSS minification is an essential optimization technique used by
       web developers and website administrators to enhance website performance,
       improve user experience, and achieve better search engine rankings.
      </p>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

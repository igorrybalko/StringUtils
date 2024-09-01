import {
 Button,
 Form,
 Input,
 Divider,
 notification,
 Space,
 Radio,
 Row,
 Col,
} from 'antd';
import { Helmet } from 'react-helmet';
import { useState, useRef } from 'react';
import { prettify } from 'htmlfy';
import AceEditor from 'react-ace';
import copy from 'copy-to-clipboard';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import AppSidebar from '../../components/AppSidebar';
import { useLoadPage, useAppDispatch } from '../../hooks';
import { getStingByUrl } from '../../store/slices/common';

const navList = [
 {
  title: 'Beautify JS',
  url: '/beautify-js',
 },
 {
  title: 'CSS Formatter',
  url: '/beautify-css',
 },
 {
  title: 'Minify CSS',
  url: '/minify-css',
 },
 {
  title: 'JSON Minify',
  url: '/json-minify',
 },
];

export default function FormatterHtmlPage() {
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

 const onFinish = (val: { text: string; tabSize: number }) => {
  try {
   if (val.text?.length) {
    const html = val.text.trim();
    let str = html;

    const doctype = html.slice(0, 15).toLowerCase();

    if (doctype === '<!doctype html>') {
     str = html.slice(15);
    }

    let txt = prettify(str, {
     tab_size: val.tabSize,
    });

    if (doctype === '<!doctype html>') {
     txt = `<!DOCTYPE html>\n${txt}`;
    }

    setEditorValue(val.text);

    setResult(txt);
   }
  } catch (err) {
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
   if (trimUrl.startsWith('https://')) {
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
    <title>HTML Formatter Online Free | HTML Beautifier</title>
    <meta
     name='description'
     content='Online tool for formatting HTML in the editor for free. Easy to use'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/formatter-html'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>HTML Formatter Online</h1>

     <Form
      onFinish={onFinish}
      autoComplete='off'
      layout='vertical'
      form={form}
      initialValues={{ tabSize: 2 }}
     >
      <Form.Item name='text' className='hidden'>
       <Input type='hidden' />
      </Form.Item>

      <div className='mb-24'>
       <label>Enter your HTML</label>
       <AceEditor
        mode='html'
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
           placeholder='https://'
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

      <Form.Item name='tabSize' label='Tab size'>
       <Radio.Group>
        <Radio value={2}>2</Radio>
        <Radio value={4}>4</Radio>
       </Radio.Group>
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Format
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
       mode='html'
       theme='github'
       name='outputcode'
       width='100%'
       height='250px'
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
      <h2>HTML Beautifier</h2>
      HTML Formatter tool online free. Formatting occurs in the browser. HTML
      code is displayed in the editor. You can adjust the indentation. The tool
      is useful for web developers, copywriters and website administrators.
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

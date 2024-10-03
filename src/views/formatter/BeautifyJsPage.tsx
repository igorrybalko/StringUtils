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
import jsBeautify from 'js-beautify';
import AceEditor from 'react-ace';
import copy from 'copy-to-clipboard';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import AppSidebar from '../../components/AppSidebar';
import { useLoadPage, useAppDispatch } from '../../hooks';
import { getStingByUrl } from '../../store/slices/common';

const navIds = [12, 14, 13, 11];

export default function BeautifyJsPage() {
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
    const code = val.text.trim();
    let str = code;

    let txt = jsBeautify(str, { indent_size: val.tabSize });

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
    <title>Beautify JS Online Free | JS Formatter</title>
    <meta
     name='description'
     content='Online tool for formatting JavaScript in the editor for free. Easy to use'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/beautify-js'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>JavaScript Formatter Online</h1>

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
       <label>Enter your JS code</label>
       <AceEditor
        mode='javascript'
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
       mode='javascript'
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
      <h2>JS Beautifier</h2>
      <p>
       An online JavaScript beautifier is a valuable tool that transforms
       minified or poorly formatted JavaScript code into a well-organized,
       readable format. This service adds appropriate indentation, spacing, and
       line breaks to make the code easier to understand and debug. It is
       particularly useful for developers who need to quickly comprehend complex
       or minified JavaScript code, often encountered when working with
       third-party libraries or legacy projects.
      </p>

      <p>
       Using a JavaScript beautifier, developers can enhance code readability,
       making it easier to maintain and modify. This is crucial in collaborative
       environments where multiple developers work on the same codebase,
       ensuring that everyone can read and understand the code easily. The tool
       is also beneficial for educational purposes, helping new developers learn
       best practices in code formatting and structure.
      </p>

      <p>
       Overall, online JavaScript beautifiers serve as essential tools for
       developers, enhancing productivity, code maintainability, and
       collaboration by transforming messy or minified code into clean, readable
       scripts.
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

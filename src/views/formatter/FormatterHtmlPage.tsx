import { Button, Form, Input, Divider, notification, Space, Radio } from 'antd';
import { Helmet } from 'react-helmet';
import { useState, useRef } from 'react';
import { prettify } from 'htmlfy';
import AceEditor from 'react-ace';
import copy from 'copy-to-clipboard';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import { useLoadPage } from '../../hooks';

export default function FormatterHtmlPage() {
 useLoadPage();

 const [result, setResult] = useState('');
 const [editorValue, setEditorValue] = useState('');
 const [resetKey, setResetKey] = useState(0);
 const [api, contextHolder] = notification.useNotification();
 const [form] = Form.useForm();

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
    description: 'invalid data',
   });
  }
 };

 const onReset = () => {
  setResult('');
  setEditorValue('');
  setResetKey((val) => (val += 1));
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
     <label className='mb-10 d-block'>Enter your HTML</label>
     <AceEditor
      mode='html'
      theme='github'
      name='inputhtml'
      width='100%'
      editorProps={{ $blockScrolling: true }}
      onChange={onChange}
      height='250px'
      value={editorValue}
      ref={editorRef}
      key={'one' + resetKey}
     />
    </div>

    <Form.Item name='tabSize' label='Tab size'>
     <Radio.Group>
      <Radio value={2}>2</Radio>
      <Radio value={4}>4</Radio>
     </Radio.Group>
    </Form.Item>

    <Form.Item>
     <Space>
      <Button type='primary' htmlType='submit'>
       Convert
      </Button>
      <Button htmlType='reset' onClick={onReset}>
       Reset all
      </Button>
     </Space>
    </Form.Item>
   </Form>
   <Divider />
   <div className='mb-24'>
    <label className='mb-10 d-block'>Result</label>
    <AceEditor
     mode='html'
     theme='github'
     name='outputhtml'
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
   <h2>HTML Beautifier</h2>
   <div>
    HTML Formatter tool online free. Formatting occurs in the browser. HTML code
    is displayed in the editor. You can adjust the indentation. The tool is
    useful for web developers, copywriters and website administrators.
   </div>
  </div>
 );
}

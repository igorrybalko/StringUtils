import {
 Button,
 Form,
 Input,
 Checkbox,
 Divider,
 notification,
 Space,
 Col,
 Row,
} from 'antd';
import { useState, useRef } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';
import { CopyOutlined } from '@ant-design/icons';

import AppSidebar from '../../components/AppSidebar';
import DownloadBtn from '../../components/DowloadBtn';

import { useLoadPage } from '../../hooks';

const { TextArea } = Input;

export default function StripTagsPage() {
 const navIds = [7];

 const [result, setResult] = useState('');
 const [txtDownload, setTxtDownload] = useState('');
 const [api, contextHolder] = notification.useNotification();

 const [form] = Form.useForm();

 const trimValue: boolean = Form.useWatch('trim', form);

 const textRef = useRef<HTMLDivElement>(null);

 useLoadPage();

 const onFinish = (val: { text: string; trim: boolean }) => {
  try {
   let divEl = document.createElement('div');
   divEl.innerHTML = val.text;
   const localres = divEl.textContent || divEl.innerText || '';

   const txt = localres.trim();

   setResult(txt);

   setTimeout(() => {
    setTxtForFile(txt, trimValue);
   }, 500);
  } catch (err) {
   api.error({
    message: 'Error',
   });
  }
 };

 function setTxtForFile(txt: string, checked: boolean) {
  let copiedTxt = txt;
  if (checked && textRef.current) {
   copiedTxt = textRef.current.innerText;
  }
  setTxtDownload(copiedTxt);
 }

 function changeTrimValue(checked: boolean) {
  setTxtForFile(result, checked);
 }

 function copyText() {
  if (result.length) {
   copy(txtDownload);
   api.success({
    message: 'Сopied',
   });
  }
 }

 const onReset = () => {
  setResult('');
  setTxtDownload('');
 };

 return (
  <div>
   <Helmet>
    <title>Case Converter Online Tools (Lowercase and Uppercase)</title>
    <meta
     name='description'
     content='Online tool for convert string to uppercase, lowercase, capitalize words, sentence case. All caps to lowercase or uppercase.'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/strip-tags'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Remove HTML Tags from Text</h1>
     <Form
      onFinish={onFinish}
      autoComplete='off'
      layout='vertical'
      form={form}
      initialValues={{ trim: true }}
     >
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

      <Form.Item name='trim' valuePropName='checked'>
       <Checkbox onChange={(e) => changeTrimValue(e.target.checked)}>
        Clear line breaks and spaces
       </Checkbox>
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Strip Tags
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <div className='caption'>Result:</div>

     <div
      className='p-textarea mb-24'
      ref={textRef}
      style={{ display: trimValue ? 'block' : 'none' }}
     >
      {result}
     </div>

     <div className='mb-24' style={{ display: !trimValue ? 'block' : 'none' }}>
      <TextArea className='textarea' spellCheck='false' value={result} />
     </div>

     <Space>
      <Button type='primary' onClick={copyText} icon={<CopyOutlined />}>
       Copy
      </Button>
      <DownloadBtn name='stripped-tags.txt' content={txtDownload} />
     </Space>
     <Divider />
     <div className='info-text'>
      <h2>About Case Converter</h2>
      <p>
       Online tools for text case modification, allowing users to convert text
       to <strong>uppercase</strong>, <strong>lowercase</strong>, or{' '}
       <strong>capitalize</strong> words, are valuable for a variety of
       purposes. Writers and editors can utilize these tools to ensure
       consistent formatting and style in their documents. Content creators and
       social media managers may find them handy for crafting eye-catching
       headlines or captions. Additionally, programmers and developers can
       streamline their coding practices by easily adjusting the case of
       variables and identifiers. Overall, these online tools serve as versatile
       aids for anyone seeking efficient and uniform text transformation,
       enhancing readability and professionalism across different contexts.
      </p>
      <h3>Case converter examples</h3>
      <ul>
       <li>
        <strong>Lowercase:</strong> all caps to lowercase
       </li>
       <li>
        <strong>Uppercase:</strong> ALL CAPS TO UPPERCASE
       </li>
       <li>
        <strong>Capitalized case:</strong> Every First Letter In A Word Is Set
        To Uppercase
       </li>
       <li>
        <strong>Sentence case:</strong> Every first letter in a sentence is set
        to uppercase
       </li>
      </ul>
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

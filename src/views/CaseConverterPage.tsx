import {
 Button,
 Form,
 Input,
 Divider,
 notification,
 Radio,
 Space,
 Col,
 Row,
} from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import AppSidebar from '../components/AppSidebar';
import { useLoadPage } from '../hooks';

const { TextArea } = Input;

export default function CaseConverterPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

 useLoadPage();

 const navList = [
  {
   title: 'Word/Character Counter',
   url: '/word-counter',
  },
 ];

 type ConvertOption = 'lc' | 'uc' | 'cc';

 const onFinish = (val: { text: string; option: ConvertOption }) => {
  const actions = {
   lc: () => val.text.toLowerCase(),

   uc: () => val.text.toUpperCase(),
   cc: () => convertToTitleCase(val.text),
  };

  try {
   const txt = actions[val.option]();

   setResult(txt);
  } catch (err) {
   api.error({
    message: 'Error',
    description: 'invalid text',
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

 function convertToTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
 }

 const onReset = () => {
  setResult('');
 };

 return (
  <div>
   <Helmet>
    <title>Case Converter Online Tools (Lowercase and Uppercase)</title>
    <meta
     name='description'
     content='Online tool for convert string to uppercase, lowercase and capitalize words. Сaps lock online'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/case-converter'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>Case Converter Online</h1>
     <Form
      onFinish={onFinish}
      autoComplete='off'
      layout='vertical'
      initialValues={{ option: 'lc' }}
     >
      <Form.Item
       name='text'
       rules={[{ required: true, message: 'Please enter data' }]}
      >
       <TextArea
        className='textarea'
        spellCheck='false'
        placeholder='Type your text...'
       />
      </Form.Item>

      <Form.Item name='option'>
       <Radio.Group>
        <Radio value={'lc'}>lower case</Radio>
        <Radio value={'uc'}>UPPER CASE</Radio>
        <Radio value={'cc'}>Capitalized Case</Radio>
       </Radio.Group>
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Convert
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
      Online tools for text case modification, allowing users to convert text to{' '}
      <strong>uppercase</strong>, <strong>lowercase</strong>, or{' '}
      <strong>capitalize</strong> words, are valuable for a variety of purposes.
      Writers and editors can utilize these tools to ensure consistent
      formatting and style in their documents. Content creators and social media
      managers may find them handy for crafting eye-catching headlines or
      captions. Additionally, programmers and developers can streamline their
      coding practices by easily adjusting the case of variables and
      identifiers. Overall, these online tools serve as versatile aids for
      anyone seeking efficient and uniform text transformation, enhancing
      readability and professionalism across different contexts.
     </div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar list={navList} />
    </Col>
   </Row>
  </div>
 );
}

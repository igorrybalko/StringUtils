import { Button, Form, Input, Divider, notification, Radio } from 'antd';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

const { TextArea } = Input;

export default function CaseConverterPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();

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

 return (
  <div>
   <Helmet>
    <title>Case Converter Online</title>
    <meta
     name='description'
     content='Online tool for convert string to upper and lower case'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/case-converter'}
    />
   </Helmet>
   {contextHolder}
   <h1>Case Converter</h1>
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
     <Button type='primary' htmlType='submit'>
      Convert
     </Button>
    </Form.Item>
   </Form>
   <Divider />
   <h2>Result:</h2>
   <div className='p-textarea mb-24'>{result}</div>
   <Button type='primary' onClick={copyText}>
    Copy
   </Button>
   <Divider />
   <div>
    This service will be useful for copywriters, content managers, and
    programmers for converting text to upper or lower case. Conversion is
    performed without reloading the page in the browser using JavaScript
   </div>
  </div>
 );
}

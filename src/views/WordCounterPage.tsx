import {
 Button,
 Form,
 Input,
 Divider,
 notification,
 Space,
 Checkbox,
 Tag,
} from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const { TextArea } = Input;

export default function WordCounterPage() {
 const [countAllSymbols, setCountAllSymbols] = useState(0);
 const [countWithoutSpace, setCountWithoutSpace] = useState(0);
 const [cntWords, setCntWords] = useState(0);
 const [api, contextHolder] = notification.useNotification();

 const countWords = (str: string) => {
  str = str.trim();
  const words = str.match(/\S+/g);

  if (words) {
   return words.length;
  }
  return 0;
 };

 const onFinish = (val: { text: string; trim: boolean }) => {
  try {
   let str = val.text;
   if (val.trim) {
    str = str.trim();
   }

   setCountAllSymbols(str.length);

   const withoutSpace = str.replace(/\s/g, '').length;
   setCountWithoutSpace(withoutSpace);

   const words = countWords(str);
   setCntWords(words);
  } catch (err) {
   api.error({
    message: 'Error',
    description: 'invalid text',
   });
  }
 };

 const onReset = () => {
  setCountAllSymbols(0);
  setCountWithoutSpace(0);
  setCntWords(0);
 }

 return (
  <div>
   <Helmet>
    <title>
     Tool to count words and characters (Letters or Symbols) online free
    </title>
    <meta
     name='description'
     content='Calculate words and symbols (letters) in text online for free, including spaces and without'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/word-counter'}
    />
   </Helmet>
   {contextHolder}
   <h1>Character (Letters) Count and Words Online Free</h1>
   <Form
    onFinish={onFinish}
    autoComplete='off'
    layout='vertical'
    initialValues={{ trim: true }}
   >
    <Form.Item
     name='text'
     rules={[{ required: true, message: 'Please enter data' }]}
    >
     <TextArea
      className='textarea-big'
      placeholder='Paste your text...'
      spellCheck='false'
     />
    </Form.Item>

    <Form.Item name='trim' valuePropName='checked'>
     <Checkbox>Trim start and end spaces</Checkbox>
    </Form.Item>

    <Form.Item>
     <Space>
      <Button type='primary' htmlType='submit'>
       Count
      </Button>
      <Button htmlType='reset' onClick={onReset}>Reset</Button>
     </Space>
    </Form.Item>
   </Form>
   <Divider />
   <h2>Result:</h2>
   <div className='mb-10'>All symbols: <Tag>{countAllSymbols}</Tag></div>
   <div className='mb-10'>Symbols without spaces: <Tag>{countWithoutSpace}</Tag></div>
   <div>Words: <Tag>{cntWords}</Tag></div>

   <Divider />
   <div>
    Online character and word counting tools provide a convenient way to keep
    track of the number of characters and words in a text. They are valuable for
    students, writers, journalists, and marketers, helping them adhere to
    character limits, both in social media and academic or professional
    assignments. These tools make it easier to create precise texts and ensure
    compliance with formatting rules and length constraints, which can be
    particularly crucial in SEO, social media, and other fields where content
    accuracy and optimization are essential.
   </div>
  </div>
 );
}

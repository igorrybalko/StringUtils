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
import { useState, useRef, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';
import { CopyOutlined } from '@ant-design/icons';

import AppSidebar from '../../components/AppSidebar';
import DownloadBtn from '../../components/DowloadBtn';

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getPageContent } from '../../store/slices/common';
import PageData from '../../classes/PageData';

const { TextArea } = Input;

const initPd = new PageData();

export default function StripTagsPage() {
 const navIds = [6, 7];

 const [result, setResult] = useState('');
 const [txtDownload, setTxtDownload] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 const [form] = Form.useForm();

 const trimValue: boolean = Form.useWatch('trim', form);

 const textRef = useRef<HTMLDivElement>(null);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(15))
   .unwrap()
   .then((res) => {
    const { title, content } = res;

    setPd({ ...pd, content, title });
   });
 }, []);

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
    <title>Strip HTML Tags Online – Remove & Clean HTML from Text</title>
    <meta
     name='description'
     content='Use this free online tool to remove HTML tags from text directly in your browser. Fast, secure, and perfect for developers, editors, and content creators.'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/strip-tags'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>{pd.title}</h1>
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
     <div
      className='info-text'
      dangerouslySetInnerHTML={{ __html: pd.content }}
     ></div>
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

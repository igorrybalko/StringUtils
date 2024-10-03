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
import md5 from 'md5';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import AppSidebar from '../../components/AppSidebar';
import AppExample from '../../components/AppExample';

import { useLoadPage, useAppDispatch } from '../../hooks';
import { getPageContent } from '../../store/slices/common';
import PageData from '../../classes/PageData';

const { TextArea } = Input;
const initPd = new PageData();

export default function Md5GeneratorPage() {
 const [result, setResult] = useState('');
 const [api, contextHolder] = notification.useNotification();
 const [pd, setPd] = useState(initPd);

 useLoadPage();
 const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(getPageContent(5))
   .unwrap()
   .then((res) => {
    const { json } = res;
    const example = JSON.parse(json);

    setPd({ ...pd, example });
   })
   .catch(() => {});
 }, []);

 const navIds = [16, 9];

 const onFinish = (val: { text: string }) => {
  setResult(md5(val.text));
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
 };

 return (
  <div>
   <Helmet>
    <title>MD5 Generator Online Tool</title>
    <meta
     name='description'
     content='Online tool for generate MD5 hash. MD5 encryption online for free'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/md5-generator'}
    />
   </Helmet>
   {contextHolder}
   <Row gutter={[24, 0]}>
    <Col xs={24} sm={24} md={18}>
     <h1>MD5 Hash Generator Online</h1>
     <Form onFinish={onFinish} autoComplete='off' layout='vertical'>
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

      <Form.Item>
       <Space>
        <Button type='primary' htmlType='submit'>
         Generate
        </Button>
        <Button htmlType='reset' onClick={onReset}>
         Reset
        </Button>
       </Space>
      </Form.Item>
     </Form>
     <Divider />
     <div className='caption'>Result:</div>
     <div className='p-input mb-24'>{result}</div>
     <Button type='primary' onClick={copyText}>
      Copy
     </Button>
     <Divider />
     <div className='info-text'>
      <h2>MD5 generator online</h2>
      <p>
       NPM package{' '}
       <a
        href='https://www.npmjs.com/package/md5'
        target='_blank'
        rel='nofollow noreferrer'
       >
        MD5
       </a>{' '}
       is used for hashing.
      </p>
      <p>
       MD5 (Message Digest Algorithm 5) is a widely used cryptographic hash
       function that produces a 128-bit (16-byte) hash value, typically
       represented as a 32-character hexadecimal number. Developed by Ronald
       Rivest in 1991, MD5 is designed to take an input (such as a file or
       message) and generate a fixed-size output, regardless of the input size.
       This makes it useful for creating unique digital fingerprints or
       checksums of data.
      </p>
      <p>
       MD5 is commonly used for verifying the integrity of files and data. When
       downloading large files or software, an MD5 hash of the file is often
       provided. Users can compute the hash of the downloaded file and compare
       it with the provided hash to ensure the file hasn't been altered or
       corrupted during transmission. It's also used in checksums for data
       integrity in storage systems.
      </p>
      <p>
       However, MD5 is no longer considered secure for cryptographic purposes
       due to vulnerabilities that allow for collisions (two different inputs
       producing the same hash). As a result, it is not recommended for tasks
       like password hashing or cryptographic security, where stronger
       algorithms like <a href="/sha-256">SHA-256</a> are preferred.
      </p>
      <p>
       Despite its vulnerabilities, MD5 is still used in non-cryptographic
       applications where quick hash computations are needed, such as in
       database indexing, identifying duplicate files, and ensuring file
       consistency across networks.
      </p>
      <p>
       In short, while MD5 remains useful for data integrity verification and
       non-security-related tasks, it should be avoided for secure cryptographic
       applications due to its susceptibility to attacks.
      </p>
     </div>
     <AppExample example={pd.example} />
    </Col>
    <Col xs={24} sm={24} md={6}>
     <AppSidebar ids={navIds} />
    </Col>
   </Row>
  </div>
 );
}

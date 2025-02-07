import {
 Button,
 Form,
 Input,
 Divider,
 notification,
 Space,
 Table,
 Col,
 Row,
} from 'antd';
import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';
import { CopyOutlined } from '@ant-design/icons';

import AppUtFullDate from '../components/AppUtFullDate';
import { useLoadPage } from '../hooks';

type DataType = {
 key: number;
 cap: string;
 val: string;
};

let timer: ReturnType<typeof setInterval> | null = null;

export default function UnixtimestampPage() {
 const [api, contextHolder] = notification.useNotification();
 const [currentTime, setCurrentTime] = useState<number>();
 const [placeholder, setPlaceholder] = useState('');
 const [dataSource, setDataSource] = useState<DataType[]>([]);

 useLoadPage();

 const columns = [
  {
   dataIndex: 'cap',
   key: 'cap',
  },
  {
   dataIndex: 'val',
   key: 'val',
  },
 ];

 useEffect(() => {
  startTimer();

  setPlaceholder(String(getCurrentTimestamp()));

  return () => {
   stopTimer();
  };
 }, []);

 function getCurrentTimestamp() {
  const time = Math.floor(new Date().getTime() / 1000);
  return time;
 }

 const onFinish = (val: { timestamp: string }) => {
  const date = new Date(Number(val.timestamp) * 1000);

  if (isNaN(Number(date))) {
   api.error({
    message: 'Error',
    description: 'Invalid Date',
   });
  } else {
   setDataSource([
    {
     key: 1,
     cap: 'GMT',
     val: date.toUTCString(),
    },
    {
     key: 2,
     cap: 'Local time',
     val: date.toString(),
    },
   ]);
  }
 };

 function copyTimestamp() {
  copy(String(currentTime));
  api.success({
   message: 'Сopied',
   description: currentTime,
  });
 }

 function stopTimer() {
  if (timer) {
   clearInterval(timer);
  }
 }

 function startTimer() {
  timer = setInterval(() => {
   setCurrentTime(getCurrentTimestamp());
  }, 1000);
 }

 return (
  <div>
   <Helmet>
    <title>Epoch and Unix Timestamp Conversion Tools Online</title>
    <meta
     name='description'
     content='Online tool for developers to convert Unix timestamps'
    />
    <meta
     name='keywords'
     content='unix, time, stamp, timestamp, epoch, conversion, converter, generator'
    />
    <link
     rel='canonical'
     href={import.meta.env.VITE_SITE_URL + '/unixtimestamp'}
    />
   </Helmet>
   {contextHolder}
   <h1>Unix Timestamp Conversion Online Tools</h1>
   <div>
    <h3>Current Unix epoch time</h3>

    <p>
     <span onMouseEnter={stopTimer} onMouseLeave={startTimer}>
      <strong>{currentTime}</strong>
     </span>
    </p>

    <p>Seconds since Jan 01 1970</p>

    <Button type='primary' onClick={copyTimestamp} icon={<CopyOutlined />}>
     Copy Timestamp
    </Button>
   </div>
   <Divider />
   <Form
    onFinish={onFinish}
    autoComplete='off'
    layout='vertical'
    requiredMark={'optional'}
   >
    <Row>
     <Col>
      <Form.Item
       name='timestamp'
       label='Timestamp in seconds'
       rules={[{ required: true, message: 'Please enter timestamp' }]}
      >
       <Input type='number' spellCheck='false' placeholder={placeholder} />
      </Form.Item>
     </Col>
    </Row>

    <Form.Item>
     <Space>
      <Button type='primary' htmlType='submit'>
       Convert
      </Button>
      <Button htmlType='reset'>Reset</Button>
     </Space>
    </Form.Item>
   </Form>

   {!!dataSource.length && (
    <Table
     showHeader={false}
     dataSource={dataSource}
     columns={columns}
     pagination={false}
    />
   )}

   <Divider />

   <AppUtFullDate />

   <div className='info-text'>
    <h2>Unix time stamp</h2>

    <p>
     The Unix timestamp is a system for tracking time in computing, representing
     the number of seconds that have elapsed since 00:00:00 Coordinated
     Universal Time (UTC) on January 1, 1970, not counting leap seconds. It
     serves as a universal standard for expressing time across different systems
     and platforms, making it easier to compare and synchronize chronological
     data. Unix timestamps are widely used in programming, databases, and
     various applications for storing and manipulating temporal information due
     to their simplicity and consistency. This timestamp format is particularly
     valuable for facilitating date and time calculations and comparisons in a
     standardized manner within the realm of computer science and software
     development.
    </p>
   </div>
  </div>
 );
}

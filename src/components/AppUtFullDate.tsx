import {
 Button,
 Form,
 InputNumber,
 notification,
 Space,
 Table,
 Col,
 Row,
} from 'antd';

import { useState, useEffect } from 'react';

type FullDate = {
 year: number;
 month: number;
 day: number;
 hour: number;
 minutes: number;
 seconds: number;
};

type DataType = {
 key: number;
 cap: string;
 val: string;
};

export default function AppUtFullDate() {
 const [api, contextHolder] = notification.useNotification();
 const [form] = Form.useForm();
 const [dataSource, setDataSource] = useState<DataType[]>([]);

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
  const date = new Date();

  form.setFieldsValue({
   year: date.getFullYear(),
   month: date.getMonth() + 1,
   day: date.getDate(),
   hour: date.getHours(),
   minutes: date.getMinutes(),
   seconds: date.getSeconds(),
  });
 }, []);

 const onFinishDate = (val: FullDate) => {
  const { year, month, day, hour, minutes, seconds } = val;

  const date = new Date(year, month - 1, day, hour, minutes, seconds);

  if (isNaN(Number(date))) {
   api.error({
    message: 'Error',
    description: 'Invalid Date',
   });
  } else {

    const time = Math.floor(date.getTime() / 1000);

   setDataSource([
    {
     key: 1,
     cap: 'Unix Timestamp',
     val: String(time),
    },
    {
     key: 2,
     cap: 'GMT',
     val: date.toUTCString(),
    },
    {
     key: 3,
     cap: 'Local time',
     val: date.toString(),
    },
   ]);
  }
 };

 const onReset = () => {};

 return (
  <>
   {contextHolder}
   <Form
    onFinish={onFinishDate}
    autoComplete='off'
    layout='vertical'
    requiredMark={'optional'}
    form={form}
   >
    <Row gutter={[12, 0]}>
     <Col md={4}>
      <Form.Item
       name='year'
       label='Year'
       rules={[{ required: true, message: 'Required' }]}
      >
       <InputNumber spellCheck='false' placeholder='YYYY' />
      </Form.Item>
     </Col>
     <Col md={4}>
      <Form.Item
       name='month'
       label='Month'
       rules={[{ required: true, message: 'Required' }]}
      >
       <InputNumber spellCheck='false' placeholder='MM' min={1} max={12} />
      </Form.Item>
     </Col>
     <Col md={4}>
      <Form.Item
       name='day'
       label='Day'
       rules={[{ required: true, message: 'Required' }]}
      >
       <InputNumber spellCheck='false' placeholder='DD' min={1} max={31} />
      </Form.Item>
     </Col>
     <Col md={4}>
      <Form.Item
       name='hour'
       label='Hour (24 hour)'
       rules={[{ required: true, message: 'Required' }]}
      >
       <InputNumber spellCheck='false' placeholder='HH' min={0} max={24} />
      </Form.Item>
     </Col>
     <Col md={4}>
      <Form.Item
       name='minutes'
       label='Minutes'
       rules={[{ required: true, message: 'Required' }]}
      >
       <InputNumber spellCheck='false' placeholder='MM' min={0} max={60} />
      </Form.Item>
     </Col>
     <Col md={4}>
      <Form.Item
       name='seconds'
       label='Seconds'
       rules={[{ required: true, message: 'Required' }]}
      >
       <InputNumber spellCheck='false' placeholder='SS' min={0} max={60} />
      </Form.Item>
     </Col>
    </Row>

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

   {!!dataSource.length && (
    <Table
     showHeader={false}
     dataSource={dataSource}
     columns={columns}
     pagination={false}
    />
   )}
  </>
 );
}

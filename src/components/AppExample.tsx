import { Col, Row } from 'antd';

type Props = {
 example: {
  title: string;
  input: {
   value: string;
   label: string;
  };
  output: {
   value: string;
   label: string;
  };
 };
};

export default function AppExample({ example }: Props) {
 return (
  <div className='info-text'>
   <h3>{example.title}</h3>
   <Row gutter={[12, 0]}>
    <Col xs={24} sm={24} md={12}>
     <div className='mb-24'>
      <label>{example.input.label}</label>
      <div
       className='p-textarea'
       dangerouslySetInnerHTML={{ __html: example.input.value }}
      ></div>
     </div>
    </Col>
    <Col xs={24} sm={24} md={12}>
     <div className='mb-24'>
      <label>{example.output.label}</label>
      <div
       className='p-textarea'
       dangerouslySetInnerHTML={{ __html: example.output.value }}
      ></div>
     </div>
    </Col>
   </Row>
  </div>
 );
}

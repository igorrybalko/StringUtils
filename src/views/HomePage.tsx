import { Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function HomePage() {
 const list = [
  {
   url: '/base64-encode',
   title: 'Base64 Encode',
  },
  {
   url: '/base64-decode',
   title: 'Base64 Decode',
  },
  {
   url: '/md5-generator',
   title: 'MD5 Hash Generator',
  },
  {
   url: '/translit-url',
   title: 'Translit URL',
  },
  {
   url: '/case-converter',
   title: 'Case Converter',
  },
  {
   url: '/word-counter',
   title: 'Word/Character Counter',
  },
 ];

 return (
  <div>
   <Helmet>
    <title>Online String Conversion Tools</title>
    <link rel='canonical' href={import.meta.env.VITE_SITE_URL} />
    <meta
     name='description'
     content='Online tools for string conversion. Such as base64 encode and decode, MD5 hash generator, LowerCase and UpperCase. It is also possible to count words and characters into text'
    />
   </Helmet>
   <h1>String conversion utilities online</h1>
   <Divider />
   <Row gutter={[24, 0]}>
    {list.map((el) => (
     <Col key={el.url} xs={12} sm={12} md={6}>
      <div className='mb-30'>
       <Link to={el.url}>{el.title}</Link>
      </div>
     </Col>
    ))}
   </Row>
   <Divider />
   <div className='info-text'>
    The service allows you to manipulate text and strings online for free. It is
    possible to encode and decode in <strong>Base64</strong>, convert strings to
    upper and lower case and generate hash in <strong>md5</strong>. It is also
    possible to convert Cyrillic to Latin for <strong>SEF</strong> (convenient
    for search engines). This is useful for the <strong>SEO</strong>. You can
    also count the number of words and characters in the text.
   </div>
  </div>
 );
}

import { Col, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useLoadPage } from '../../hooks';
import list from '../../config/home-menu';

export default function HomePage() {
 useLoadPage();

 return (
  <div>
   <Helmet>
    <title>Online String Conversion Tools Free</title>
    <link rel='canonical' href={import.meta.env.VITE_SITE_URL} />
    <meta
     name='description'
     content='Online tools for string conversion. Such as base64 encode and decode, MD5 hash generator, Unix timestamp, UUID, JSON stringify, LowerCase and UpperCase. It is also possible to count words and characters into text'
    />
   </Helmet>
   <h1>String Conversion Utilities Online Free</h1>
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
    <h2>About Web Tools</h2>
    <p>
     This service is useful for web developers, SEO optimizers and copywriters.
     The service allows you to manipulate text and strings online for free. It
     is possible to encode and decode in Base64, convert strings to upper and
     lower case.
    </p>
    <p>
     You can generate hash in md5, generate UUID (Version 4), convert text to
     json string using JSON.stringify, minify (compress) JSON, format HTML, minify (compress) CSS,
     beautify CSS, beautify JavaScript.
    </p>
    <p>
     It is also possible to convert Cyrillic to Latin for SEF (convenient for
     search engines). This is useful for the SEO. You can also count the number
     of words and characters in the text.
    </p>
   </div>
  </div>
 );
}

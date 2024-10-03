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
   <p>List of all tools</p>
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
     An online service offering tools like Base64 encoding/decoding, MD5
     generation, SHA-256 generation, UUID generation (Version 4), JSON minification, HTML
     formatting, CSS and JavaScript beautification/minification, word/chapter
     counting, case conversion, UNIX timestamp generation, and URL
     transliteration can be incredibly useful for a wide range of users,
     particularly those in the fields of web development, software engineering,
     and content creation.
    </p>
    <p>
     For developers, the ability to encode and decode Base64 can help with data
     transmission, file handling, and embedding media in web applications. MD5
     hash generation is useful for verifying file integrity or creating digital
     fingerprints. UUID (Version 4) generation provides developers with a simple
     and unique identifier for database entries, API keys, and tokens, ensuring
     randomness and minimizing conflicts.
    </p>
    <p>
     The JSON minify tool helps developers optimize the size of JSON data for
     faster API responses or efficient storage. Similarly, CSS and JavaScript
     minification improves website performance by reducing file sizes,
     contributing to faster page load times. HTML formatting, CSS
     beautification, and JavaScript beautification tools make code easier to
     read and maintain, essential for collaboration in team environments or when
     revisiting projects.
    </p>
    <p>
     Content creators, such as bloggers and writers, will benefit from the word
     and chapter counting tool, especially when working on manuscripts or
     SEO-driven content. Case converters help in quickly changing the case of
     text for consistency across documents or for specific formatting needs.
    </p>
    <p>
     The ability to generate UNIX timestamps simplifies time-based operations
     for backend services, logging systems, and event-driven applications.
     Transliterating URLs ensures that non-Latin characters in URLs are
     translated into readable and SEO-friendly formats, which is crucial for
     global websites.
    </p>
    <p>
     In summary, this service benefits web developers, content creators, data
     engineers, and digital marketers, enhancing productivity, ensuring
     consistency, improving performance, and making content management easier
     across a variety of professional fields.
    </p>
   </div>
  </div>
 );
}

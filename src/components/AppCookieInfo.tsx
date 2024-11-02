import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../hooks';
import { setCookieAgree } from '../store/slices/common';

import '../scss/components/AppCookieInfo.scss';


export default function AppCookieInfo() {
 const dispatch = useAppDispatch();

 function agree() {
  const gScript = document.createElement('script');
  gScript.async = true;
  gScript.setAttribute(
   'src',
   'https://www.googletagmanager.com/gtag/js?id=G-4WXYJQBTY9'
  );

  const head = document.getElementsByTagName('head')[0];
  head.prepend(gScript);
  dispatch(setCookieAgree('1'));
 }

 function decline() {
  dispatch(setCookieAgree('0'));
 }

 return (
  <div className='cinfo'>
   <div className='wrapper'>
    <h4>We use cookies</h4>
    <div className='mb-20'>
     <p>
      This website uses cookies and other tracking technologies to improve your
      browsing experience for the following purposes: to enable basic
      functionality of the website, to provide a better experience on the
      website, to measure your interest in our products and services and to
      personalize marketing interactions, to deliver ads that are more relevant
      to you.
     </p>
     <p>
      For any queries in relation to our policy on cookies and your choices,
      please contact us. To find out more, please visit our{' '}
      <Link to='/privacy-policy' className='underline'>
       Privacy Policy
      </Link>
      .
     </p>
    </div>
    <Flex gap='middle' align='start'>
     <Button type='primary' onClick={agree}>
      I agree
     </Button>
     <Button type='primary' onClick={decline}>
      I decline
     </Button>
    </Flex>
   </div>
  </div>
 );
}

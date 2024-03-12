import { Divider } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function HomePage() {
 return (
  <div>
   <Helmet>
    <title>Page not found</title>
    <meta name="robots" content="noindex, nofollow" />
   </Helmet>
   <h1>404</h1>
   <h2>Page not found</h2>

   <Divider />

   <Link to="/">To Home Page</Link>
  </div>
 );
}

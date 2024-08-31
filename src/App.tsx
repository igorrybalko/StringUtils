import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
//import Hotjar from '@hotjar/browser';

import routes from './router';

// const siteId = 5067838;
// const hotjarVersion = 6;

function App() {
 //const { darkAlgorithm } = theme;

 //Hotjar.init(siteId, hotjarVersion);

 return (
  <ConfigProvider
   theme={{
    hashed: false,
    //algorithm: darkAlgorithm,
    token: {
     fontSize: 16,
    },
   }}
  >
   <RouterProvider router={routes} />
  </ConfigProvider>
 );
}

export default App;

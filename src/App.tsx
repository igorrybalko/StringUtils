import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import routes from './router';

function App() {

 return (
  <ConfigProvider
   theme={{
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

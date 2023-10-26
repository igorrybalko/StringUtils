import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import routes from './router';

function App() {
 console.log(theme);

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

import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import routes from './router';

function App() {
 //const { darkAlgorithm } = theme;
 return (
  <ConfigProvider
   theme={{
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

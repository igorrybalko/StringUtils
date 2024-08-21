import { Helmet } from 'react-helmet';

import { useLoadPage } from '../../hooks';

export default function DonatePage() {
 useLoadPage();

 return (
  <div className='info-text'>
   <Helmet>
    <title>StringUtils - Donate</title>
    <link rel='canonical' href={import.meta.env.VITE_SITE_URL + '/donate'} />
    <meta
     name='description'
     content='StringUtils - Donate. You can support this project'
    />
   </Helmet>

   <h1>Donate</h1>
   <p>
    Dear friend, if you want to financially support this project, you can do it
    with cryptocurrency. Your help will be used to develop the project and pay
    for hosting.
   </p>
   <h2>Crypto</h2>
   <div className='sm-smaller'>
    <div className='mb-24'>
     <h4 className='m-0'>Bitcoin (BTC)</h4>
     <div>bc1qwfcjmu2ngme8p63uzhjmll9akv35gvy95wqhsg</div>
    </div>
    <div className='mb-24'>
     <h4 className='m-0'>Ethereum (ETH)</h4>
     <div>0xd46fca07b2bfb16ee0014048f9264820026fbc1d</div>
    </div>
    <div className='mb-24'>
     <h4 className='m-0'>Litecoin (LTC)</h4>
     <div>ltc1qx0srqpp9dpyf8xlrsexht8fcva5p4tkw0c0e7m</div>
    </div>
    <div className='mb-24'>
     <h4 className='m-0'>USDT (ERC20)</h4>
     <div>0xd46fca07b2bfb16ee0014048f9264820026fbc1d</div>
    </div>
   </div>
  </div>
 );
}

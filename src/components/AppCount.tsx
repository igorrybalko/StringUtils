export default function AppCount() {
 const Cd = document;
 const Cr = '&' + Math.random();
 let Cp = '&s=1';
 Cd.cookie = 'b=b';
 if (Cd.cookie) Cp += '&c=1';
 Cp += '&t=' + new Date().getTimezoneOffset();
 if (self != top) Cp += '&f=1';
 return (
  <div className='mt-10'>
   <a href='http://hit.ua/?x=16955' target='_blank' rel='nofollow noreferrer'>
    <img
     src={
      '//c.hit.ua/hit?i=16955&g=0&x=4' +
      Cp +
      Cr +
      '&r=' +
      encodeURIComponent(Cd.referrer) +
      '&u=' +
      encodeURIComponent(window.location.href)
     }
     width='88'
     height='15'
    />
   </a>
  </div>
 );
}

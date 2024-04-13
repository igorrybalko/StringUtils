import { notification } from 'antd';
import { useEffect } from 'react';

import { store } from '../store';
import { useAppSelector } from '../hooks';

export default function AppNotif() {
 const [api, contextHolder] = notification.useNotification();

 const notifFlag = useAppSelector((state) => state.common.notifFlag);
 let currentValue = notifFlag;
 useEffect(() => {
  const unsubscribe = store.subscribe(() => {
   let previousValue = currentValue;
   const state = store.getState();
   currentValue = state.common.notifFlag;

   if (previousValue !== currentValue) {
    api.error({
     message: 'Error',
     description: state.common.errorMessage,
    });
   }
  });

  return () => {
   unsubscribe();
  };
 }, []);

 return <div>{contextHolder}</div>;
}

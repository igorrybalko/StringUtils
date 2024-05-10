import axios from 'axios';

import { store } from '../store';
import { showNotif } from '../store/slices/common';

axios.defaults.headers.common['x-api-key-app'] =
 import.meta.env.VITE_SITE_X_API_KEY_APP;
axios.defaults.baseURL = import.meta.env.VITE_SITE_BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';

axios.interceptors.response.use(
 function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
 },
 function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  let message = '';

  if(error.response){
    message = error.response.data.message;
  }else{
    message = error.message;
  }

  store.dispatch(showNotif({message, variant: 'error'}))
  
  return Promise.reject(error);
 }
);

const httpHelper = {
 get(url: string) {
  return new Promise((resolve, reject) => {
   axios
    .get(url)
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject(err);
    });
  });
 },
 post(url: string, payload: any = null, headers: any = null): Promise<any> {
  return new Promise((resolve, reject) => {
   axios
    .post(url, payload, headers)
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject(err);
    });
  });
 },
 put(url: string, payload: any = null) {
  return new Promise((resolve, reject) => {
   axios
    .put(url, payload)
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject(err);
    });
  });
 },
 delete(url: string, payload = null) {
  let sendData: any = null;
  if (payload) {
   sendData = {
    data: payload,
   };
  }

  return new Promise((resolve, reject) => {
   axios
    .delete(url, sendData)
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject(err);
    });
  });
 },
 request(options: any) {
  return new Promise((resolve, reject) => {
   axios(options)
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject(err);
    });
  });
 },
 patch(url: string, payload: any = null) {
  return new Promise((resolve, reject) => {
   axios
    .patch(url, payload)
    .then((res) => {
     resolve(res);
    })
    .catch((err) => {
     reject(err);
    });
  });
 },
};

export default httpHelper;

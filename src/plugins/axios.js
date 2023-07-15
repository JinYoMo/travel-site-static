

import axios from 'axios';
import JSONbig from 'json-bigint'
import { AXIOS_DEFAULT_CONFIG } from '@/config';
import {
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc
} from '@/config/interceptor';

let axiosInstance = {};
axios.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  }catch(e){
    return data;
  }
  //return data;
}]
axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);
// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

// 注入返回拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;


/** @format */

import axios from 'axios';
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from './index';

const CancelToken = axios.CancelToken;
let CancelPromise = {};
// var csrfToken = '';

/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export function requestSuccessFunc(req) {
  /* 设置请求的 header 除了登录接口 其他接口都必须带上 */
  // csrfToken && req.method === 'post'
  //   ? (req.headers['iflytek_csrftoken'] = csrfToken)
  //   : null;
  // req.headers['X-Admin-Token'] = Cookie.getToken() || '';
  // console.log(req.url);

  //取消重复请求（allowRepeat中可定义允许重复请求的接口）
  const allowRepeat = [].includes(req.url);

  //添加时间戳，以防IE9下请求缓存
  //暂时去掉checkAuth接口的时间戳，避免403
  if (req.url !== '/setting/checkAuth') {
    req.method === 'get'
      ? (req.url += (req.url.indexOf('?') > 0 ? '&' : '?') + '_v=' + Date.now())
      : null;
  }

  // if (CancelPromise[req.url] && !allowRepeat) {
  //   CancelPromise[req.url]();
  // }
  // req.cancelToken = new CancelToken(c => {
  //   CancelPromise[req.url] = c;
  // });

  CONSOLE_REQUEST_ENABLE &&
    console.info('requestInterceptorFunc', `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  // 自定义请求失败逻辑，处理断网，请求发送监控等

  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export async function responseSuccessFunc(response) {
  // console.log(response);
  // debugger;
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // CONSOLE_RESPONSE_ENABLE && console.info('responseInterceptorFunc', response);
  // console.log(response, 'axios success');

  // response.headers['iflytek_csrftoken']
  //   ? (csrfToken = response.headers['iflytek_csrftoken'])
  //   : null; //取出csrftoken

  let returnFullResponse = response.config.headers.returnFullResponse; //是否将返回结果全部返回
  // 根据response返回处理 --- 适用于本项目
  if (returnFullResponse) {
    return response.data || {};
  } else if (response.data.code === 0 || response.data.code === 200) {
    return Promise.resolve(response.data)
  } else if (response.data.code !== 0) {
    if (response.data.msg !== '用户未登录') {
      window.$message.error(response.data.msg)
    }
    return Promise.reject(response.data.msg)
  }
  // 原始情况
  // if (returnFullResponse) {
  //   return response.data || {};
  // } else if (response.data.success) {
  //   return Promise.resolve(response.data.data)
  // } else if (!response.data.success) {
  //   if (response.data.message !== '用户未登录') {
  //     window.$message.error(response.data.message)
  //   }
  //   return Promise.reject(response.data.message)
  // }
  // if (response && response.data.ok == true) {
  //   return response.data.result || null;
  // } else {
  //   // console.log('warning', response.data.message);
  //   let errMsg = response.data.message || '出错了';
  //   // if (response.config.url.indexOf('login') > -1) {
  //   //   if (response.data.code == 100) {
  //   //     errMsg = '用户名密码错误！';
  //   //   } else if (response.data.code == 101) {
  //   //     errMsg = '验证码错误！';
  //   //   }
  //   // }
  //   return Promise.reject(errMsg);
  // }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  // debugger;
  //如果是取消，返回空，前端不提示消息
  const resData = resError.response;
  const errStr = resError.toString();
  // console.log(resData, errStr, 'axios failed');
  if (errStr === 'Cancel') {
    resError = '';
  } else if (errStr.indexOf('status code 400') !== -1) {
    resError = resData.data.message || '非法参数!';
  } else if (errStr.indexOf('status code 500') !== -1) {
    resError = '服务器出错了，请稍后再试！';
  } else if (errStr.indexOf('timeout') !== -1) {
    resError = '请求超时，请稍后再试！';
  }
  // 响应失败，可根据resError信息做监控处理
  return Promise.reject(resError);
}

import axios from 'axios';
import qs from 'qs';
import router from './../../router.js';
import store from './../../store.js';

const baseRequest={};

axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.defaults.transformRequest = [data => qs.stringify(data)];
axios.defaults.withCredentials = true; // 请求时携带cookie信息,避免session发生变化

baseRequest.request = (data, url, type = 'POST', timeout = 10000) => {
  const options = {
    data:data,
    url:`http://oa1.workmanage.cn:8899/oa/${url}`,
    //url:`http://172.16.0.125:8086/${url}`,
    method: type,
    timeout,
  };
  return axios(options).then((response) => {
    const { data, status } = response;
    if (status !== 200) {
      return Promise.reject(new Error('服务器请求失败'));
    }
    if ((!data.success && data.msg === '当前登录用户信息不存在！') || typeof data.msg === 'object') {
      router.push('/')
    }
    return Promise.resolve(data);
  });
};

//const returnDatas = window.nativeReturnData();

baseRequest.nativeRequest = (requestType,data, url) => {
  store.dispatch('updateLoading', { isLoading: true });
  window.android.requestWebData(
        `http://oa1.workmanage.cn:8899/oa/${url}`,
        JSON.stringify(data),
        requestType
      );
      if(returnData){
        return Promise.resolve(returnData);
      }
}

export default baseRequest;

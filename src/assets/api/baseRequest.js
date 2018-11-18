import axios from 'axios';
import qs from 'qs';

axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.defaults.transformRequest = [data => qs.stringify(data)];

const request = (data, url, type = 'POST', timeout = 10000) => {
  const options = {
    data,
    url,
    method: type,
    timeout,
  };
  return axios(options).then((response) => {
    const { data, status } = response;
    if (status !== 200) {
      return Promise.reject(new Error('服务器请求失败'));
    }
    if (!data.success && data.msg === '当前登录用户信息不存在！') {
      window.location.href = '/';
    }
    return Promise.resolve(data);
  });
};

export default request;

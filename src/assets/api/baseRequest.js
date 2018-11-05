import axios from 'axios';
import qs from 'qs';

axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.defaults.transformRequest = [data => qs.stringify(data)];

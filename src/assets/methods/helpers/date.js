import moment from 'moment';

const format = (date, format) => {
  if (date && format) {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (`${date.getFullYear()}`).substr(4 - RegExp.$1.length),
      );
    }
    Object.keys(o).forEach((k) => {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : (`00${o[k]}`).substr((`${o[k]}`).length),
        );
      }
    });
    return format;
  }
  return '';
};

const toDate = (dateString) => {
  if (dateString) {
    return new Date(dateString.replace(/-/gi, '/'));
  }
  return new Date();
};

const toMoment = (dateString) => {
  if (dateString) {
    return moment(dateString, 'YYYY-MM-DD HH:mm:ss');
  }
  return moment();
};

const toMomentDate = (dateString) => {
  if (dateString) {
    return moment(dateString, 'YYYY-MM-DD');
  }
  return moment();
};

const formatMomentFull = (m = moment()) => m.format('YYYY-MM-DD HH:mm:ss');

const formatMoment = (m = moment()) => m.format('YYYY-MM-DD');

export default {
  // 将时间轴转化为字符串
  dateToString(date) {
    const year = `${date.getFullYear()}-`;
    const month = `${date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1}-`;
    const day = date.getDate();
    return year + month + day;
  },
  // 将string格式的日期按指定格式进行格式化
  formatString(dateString, formatter = 'yyyy-MM-dd') {
    if (dateString) {
      const date = toDate(dateString);
      return format(date, formatter);
    }
    return '';
  },
  format,
  formatFull(date = new Date()) {
    return format(date, 'yyyy-MM-dd hh:mm:ss');
  },
  formatToDay(date = new Date()) {
    return format(date, 'yyyy-MM-dd');
  },
  isAfterNow(current) {
    return current && current.getTime() > Date.now();
  },
  momentIsAfterNow(current) {
    return current && current.toDate().getTime() > Date.now();
  },
  isBeforeNow(current) {
    return (
      current
      && current.getTime() < toDate(format(new Date(), 'yyyy-MM-dd')).getTime()
    );
  },
  momentIsBeforeNow(current) {
    return (
      current
      && current.toDate().getTime()
        < toDate(format(new Date(), 'yyyy-MM-dd')).getTime()
    );
  },
  toDate,
  toMoment,
  toMomentDate,
  formatMomentFull,
  formatMoment,
};

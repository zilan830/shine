import request from './baseRequest';

const apis = {};

// 登录
apis.login = obj => request(obj, 'loginAction!loginAjax').then((res) => {
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;
});

// 登出
apis.signOut = obj => request(obj, 'loginAction!logoutAjax').then((res) => {
  if (res.success) {
    return 'success';
  }
  const e = new Error('error');
  throw e;
});

// 请假列表 可删除
apis.leaveList = obj => request(obj, 'leaveFlowAction!getTabsInfo').then((res) => {
  console.log('leave', res);
  if (res.success) {
    return 'success';
  }
  const e = new Error('error');
  throw e;
});

// 消息列表
apis.getNews = obj => request(obj, 'leaveFlowAction!getMyPendingTasks').then((res) => {
  if (res.data) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});

// 请假权限
apis.getOperate = () => request({}, 'leaveFlowAction!getTabsInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});

// 请假数据
// pending-待处理；
apis.getPendingLeaveData = () => request({ instType: 'pending' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});
// finished-已处理；
apis.getFinishedLeaveData = () => request({ instType: 'finished' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});
// end-已办结；
apis.getEndLeaveData = () => request({ instType: 'end' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});
// cancel-已撤销；
apis.getCancelLeaveData = () => request({ instType: 'cancel' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});
// stopped-已中止
apis.getStopLeaveData = () => request({ instType: 'stopped' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});

// 获取请假表单数据
apis.getFormLeaveData = obj => request(obj, 'leaveFlowAction!getFlowInstDataInfo').then((res) => {
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw e;
});

// 获取数据字典
apis.getDataDictionary = () => request({}, 'leaveFlowAction!getSysData').then((res) => {
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw e;
});

// 请假保存
apis.getLeaveSave = obj => request({ ...obj }, 'leaveFlowAction!save').then((res) => {
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw e;
});

// 获取下一步节点信息
apis.getNextStepInfo = obj => request({ ...obj }, 'leaveFlowAction!nexStepInfo').then((res) => {
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw e;
});

// 下一个流程流转
apis.getNextSave = obj => request({ ...obj }, 'leaveFlowAction!nextSave').then((res) => {
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw e;
});


export default apis;

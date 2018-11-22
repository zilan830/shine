import baseRequest from './baseRequest';

const apis = {};

let requestMethod = baseRequest.request;



// 登录
apis.login = obj => requestMethod(obj, 'loginAction!loginAjax').then((res) => {
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;
});

// 登出
apis.signOut = obj => requestMethod(obj, 'loginAction!logoutAjax').then((res) => {
  if (res.success) {
    return 'success';
  }
  const e = new Error('error');
  throw res;
});

// 请假列表 可删除
apis.leaveList = obj => requestMethod(obj, 'leaveFlowAction!getTabsInfo').then((res) => {
  
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;

});

// 消息列表
apis.getNews = () => requestMethod({}, 'leaveFlowAction!getMyPendingTasks').then((res) => {

  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;
});

// 请假权限
apis.getOperate = () => requestMethod({}, 'leaveFlowAction!getTabsInfo').then((res) => {

  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;

});

// 请假数据
// pending-待处理；
apis.getPendingLeaveData = () => requestMethod({ instType: 'pending' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;
  

});
// finished-已处理；
apis.getFinishedLeaveData = () => requestMethod({ instType: 'finished' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;
 
});
// end-已办结；
apis.getEndLeaveData = () => requestMethod({ instType: 'end' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;

});
// cancel-已撤销；
apis.getCancelLeaveData = () => requestMethod({ instType: 'cancel' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;
  
});
// stopped-已中止
apis.getStopLeaveData = () => requestMethod({ instType: 'stopped' }, 'leaveFlowAction!getFlowInstInfo').then((res) => {
  
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;
  
});

// 获取请假表单数据
apis.getFormLeaveData = obj => requestMethod(obj, 'leaveFlowAction!getFlowInstDataInfo').then((res) => {
  
  if (res.success) {
    return res.data;
  }
  const e = new Error('error');
  throw res;
  
});

// 获取数据字典
apis.getDataDictionary = () => requestMethod({}, 'leaveFlowAction!getSysData').then((res) => {
  
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;
  
});

// 请假保存
apis.getLeaveSave = obj => requestMethod({ ...obj }, 'leaveFlowAction!save').then((res) => {
 
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;
 
});

// 获取下一步节点信息
apis.getNextStepInfo = obj => requestMethod({ ...obj }, 'leaveFlowAction!nexStepInfo').then((res) => {
  
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;
  
});

// 下一个流程流转
apis.getNextSave = obj => requestMethod({ ...obj }, 'leaveFlowAction!nextSave').then((res) => {
  
  if (res.success) {
    return res;
  }
  const e = new Error('error');
  throw res;
  
});


export default apis;

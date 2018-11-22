import router from './../../router.js';
import store from './../../store.js';
import baseRequest from './baseRequest.js';


//安卓原生
window.nativeReturnData = (data, type) => {
  const { commit, dispatch } = store;
  dispatch('updateLoading', { isLoading: false });

  switch (type) {
    case 'login':
      if (data.success) {
        const { loginUser } = data;
        window.localStorage.setItem('userInfo', JSON.stringify(loginUser));
      } else {
        const message = data.operateMessage ? data.operateMessage : '登录失败';
        commit({ type: 'getError', message });
      }
      baseRequest.nativeRequest('getDataDictionary', {}, 'leaveFlowAction!getSysData');
      break;
    case 'signout':
      if (data.success) {
        window.localStorage.removeItem('userInfo');
        router.push('/');
      } else {
        commit({ type: 'getError', message: '登出失败' });
      }
      break;
    case 'getOperate':
      baseRequest.nativeRequest('pending', { instType: 'pending' }, 'leaveFlowAction!getFlowInstInfo');
      if (data.success) {
        commit({ type: 'getOperate', hasOperate: data.data });

      } else {
        commit({ type: 'getError', message: '获取权限请求失败' });
      }
      break;
    case 'getNews':
      if (data.success) {
        commit({ type: 'getNews', data: data.data });
      } else {
        commit({ type: 'getError', message: '获取消息列表请求失败' });
      }
      break;
    case 'pending':
      if (data.success) {
        commit({ type: 'getLeavePendData', data: data.data });
      } else {
        commit({ type: 'getError', message: '获取待处理列表请求失败' });
      }
      baseRequest.nativeRequest('finished', { instType: 'finished' }, 'leaveFlowAction!getFlowInstInfo');
      break;
    case 'finished':
      if (data.success) {
        commit({ type: 'getLeaveFinishedData', data: data.data });
      } else {
        commit({ type: 'getError', message: '获取已处理列表请求失败' });
      }
      baseRequest.nativeRequest('end', { instType: 'end' }, 'leaveFlowAction!getFlowInstInfo');
      break;
    case 'end':
      if (data.success) {
        commit({ type: 'getLeaveEndData', data: data.data });
      } else {
        commit({ type: 'getError', message: '获取已办结列表请求失败' });
      }
      baseRequest.nativeRequest('cancel', { instType: 'cancel' }, 'leaveFlowAction!getFlowInstInfo');
      break;
    case 'cancel':
      if (data.success) {
        commit({ type: 'getLeaveCancelData', data: data.data });
      } else {
        commit({ type: 'getError', message: '获取已撤销列表请求失败' });
      }
      baseRequest.nativeRequest('stopped', { instType: 'stopped' }, 'leaveFlowAction!getFlowInstInfo');
      break;
    case 'stopped':
      if (data.success) {
        commit({ type: 'getLeaveStopData', data: data.data });
      } else {
        commit({ type: 'getError', message: '获取已中止列表请求失败' });
      }
      break;
    case 'leaveFormData':
      if (data.success) {
        commit({ type: 'getLeaveFormData', data: data.data });
      } else {
        commit({ type: 'getError', message: '请求失败' });
      }
      break;
    case 'getDataDictionary':
      if (data.success) {
        // 职位信息
        const positionList = data.post.map((item) => {
          const obj = {
            id: item.id,
            title: item.dataName,
          };
          return obj;
        });
        const post = positionList.map(item => item.title);
        window.localStorage.setItem('positionList', JSON.stringify(positionList));
        window.localStorage.setItem('post', JSON.stringify(post));

        // 请假信息
        const leaveList = data.leaveType.map((item) => {
          const obj = {
            id: item.id,
            title: item.dataName,
          };
          return obj;
        });
        const leave = leaveList.map(item => item.title);
        window.localStorage.setItem('leaveList', JSON.stringify(leaveList));
        window.localStorage.setItem('leave', JSON.stringify(leave));

        // 组别
        const groupList = data.group.map((item) => {
          const obj = {
            id: item.id,
            title: item.dataName,
          };
          return obj;
        });
        const group = groupList.map(item => item.title);
        window.localStorage.setItem('groupList', JSON.stringify(groupList));
        window.localStorage.setItem('group', JSON.stringify(group));
        router.push('/index');
      } else {
        commit({ type: 'getError', message: '获取数据字典请求失败,请重新登录' });
      }
      break;
    case 'leaveSave':
      if (data.success) {
        commit({ type: 'getLeaveSave', data: data.data });
      } else {
        commit({ type: 'getError', message: '保存信息请求失败' });
      }
      break;
    case 'nextInfo':
      if (data.success) {
        commit({ type: 'getNextStepInfo', data: data.nextInstNode });
      } else {
        commit({ type: 'getError', message: '获取下一步信息请求失败' });
      }
      break;
    case 'nextSave':
      if (data.success) {
        router.push('/leave');
      } else {
        commit({ type: 'getError', message: '下一步流转请求失败' });
      }
      break;
    default:
      break;

  }
  return { data, type }
}
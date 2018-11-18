import requestApis from '../../api/apis';

const apis = {
  state: {
    // 菊花是否加载
    isLoading: false,
    // 错误信息
    errorMessage: '',
    // 消息
    news: {},
    // 启动权限
    hasOperate: true,
    // pending-待处理；
    leavePendingData: [],
    // finished-已处理；
    leaveFinishedData: [],
    // end-已办结；
    leaveEndData: [],
    // cancel-已撤销；
    leaveCancelData: [],
    // stopped-已中止
    leaveStoppedData: [],
    // 表单数据
    leveFormData: {},
    // 下一步审核人
    nextApprove: [],
    // 保存返回数据
    saveData: {},
    // 下一步信息
    nextStepInfo: {},
    // 下一步流转
    nextSave: {},
  },
  mutations: {
    // 菊花
    updateLoading(state, payload) {
      state.isLoading = payload.isLoading;
    },
    // 获取错误信息
    getError(state, payload) {
      state.errorMessage = payload.message;
    },
    // 获取消息列表
    getNews(state, payload) {
      state.news = payload.data;
    },
    // 获取启动权限
    getOperate(state, payload) {
      state.hasOperate = payload.hasOperate;
    },
    // 获取请假数据
    getLeavePendData(state, payload) {
      state.leavePendingData = payload.data;
    },
    getLeaveFinishedData(state, payload) {
      state.leaveFinishedData = payload.data;
    },
    getLeaveEndData(state, payload) {
      state.leaveEndData = payload.data;
    },
    getLeaveCancelData(state, payload) {
      state.leaveCancelData = payload.data;
    },
    getLeaveStopData(state, payload) {
      state.leaveStoppedData = payload.data;
    },
    getLeaveFormData(state, payload) {
      state.leveFormData = payload.data;
    },
    getLeaveSave(state, payload) {
      state.saveData = payload.data;
    },
    getNextStepInfo(state, payload) {
      state.nextStepInfo = payload.data;
    },
    getNextSave(state, payload) {
      state.nextSave = payload.data;
    },
  },
  actions: {
    updateLoading({ commit }, payload) {
      commit({ type: 'updateLoading', ...payload });
    },
    // 登录
    login({ dispatch, commit }, payload) {
      dispatch('updateLoading', { isLoading: true });
      const { router } = payload;
      requestApis.login({ ...payload.data }).then((res) => {
        const { loginUser } = res;
        window.localStorage.setItem('userInfo', JSON.stringify(loginUser));
        dispatch('updateLoading', { isLoading: false });
        router.push('/index');
      }).catch((err) => {
        dispatch('updateLoading', { isLoading: false });
        const message = err.operateMessage ? err.operateMessage : '登录失败';
        commit({ type: 'getError', message });
      });
    },
    // 登出
    signOut({ dispatch, commit }, payload) {
      dispatch('updateLoading', { isLoading: true });
      const { router } = payload;
      requestApis.signOut().then(() => {
        window.localStorage.removeItem('userInfo');
        dispatch('updateLoading', { isLoading: false });
        router.push('/');
      }).catch(() => {
        commit({ type: 'getError', message: '登出失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // 请假
    // 获取请假启动权限
    getOperate({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getOperate().then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getOperate', hasOperate: res });
      }).catch((err) => {
        commit({ type: 'getError', message: '获取权限请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // 获取消息列表
    getNews({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getNews().then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getNews', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '获取消息列表请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // 获取请假数据
    // pending-待处理；
    getLeavePendData({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getPendingLeaveData().then((res) => {
        console.log('res', res);
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeavePendData', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '获取待处理列表请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // finished-已处理；
    getLeaveFinishedData({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getFinishedLeaveData().then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeaveFinishedData', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '获取已处理列表请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // end-已办结；
    getLeaveEndData({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getEndLeaveData().then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeaveEndData', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '获取已办结列表请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // cancel-已撤销；
    getLeaveCancelData({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getCancelLeaveData().then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeaveCancelData', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '获取已撤销列表请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // stopped-已中止
    getLeaveStopData({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getStopLeaveData().then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeaveStopData', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '获取已中止列表请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },
    // 获取表单数据
    getLeaveFormData({ dispatch, commit }, payload) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getFormLeaveData({ ...payload.param }).then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeaveFormData', data: res });
      }).catch(() => {
        commit({ type: 'getError', message: '请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },

    // 获取数据字典
    getDataDictionary({ dispatch, commit }) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getDataDictionary({}).then((res) => {
        dispatch('updateLoading', { isLoading: false });
        // 职位信息
        const positionList = res.post.map((item) => {
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
        const leaveList = res.leaveType.map((item) => {
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
        const groupList = res.group.map((item) => {
          const obj = {
            id: item.id,
            title: item.dataName,
          };
          return obj;
        });
        const group = groupList.map(item => item.title);
        window.localStorage.setItem('groupList', JSON.stringify(groupList));
        window.localStorage.setItem('group', JSON.stringify(group));
      }).catch(() => {
        commit({ type: 'getError', message: '获取数据字典请求失败,请重新登录' });
        dispatch('updateLoading', { isLoading: false });
      });
    },

    // 请假保存
    getLeaveSave({ dispatch, commit }, payload) {
      dispatch('updateLoading', { isLoading: true });
      requestApis.getLeaveSave({ ...payload.param }).then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getLeaveSave', data: res.data });
      }).catch(() => {
        commit({ type: 'getError', message: '保存信息请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },

    // 下一步信息
    getNextInfo({ dispatch, commit }, payload) {
      dispatch('updateLoading', { isLoading: true });
      console.log('payload', payload);
      requestApis.getNextStepInfo({ ...payload.param }).then((res) => {
        dispatch('updateLoading', { isLoading: false });
        commit({ type: 'getNextStepInfo', data: res.nextInstNode });
      }).catch(() => {
        commit({ type: 'getError', message: '获取下一步信息请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },

    // 下一步流转
    getNextSave({ dispatch, commit }, payload) {
      dispatch('updateLoading', { isLoading: true });
      const { router } = payload;
      console.log('payload', payload);
      requestApis.getNextSave({ ...payload.param }).then((res) => {
        console.log('res', res);
        dispatch('updateLoading', { isLoading: false });
        router.push('/leave');
      }).catch(() => {
        commit({ type: 'getError', message: '下一步流转请求失败' });
        dispatch('updateLoading', { isLoading: false });
      });
    },

  },
};

export default apis;

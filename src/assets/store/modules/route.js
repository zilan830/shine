/*
用来判断页面跳转方向，从而添加转场效果
*/
const router = {
  state: {
    style: 'in', // 设定初始方向：向前
    routerIndex: 10,
    name: '消息',
  },
  mutations: {
    transitionStyle(state, payload) {
      let style = 'out'; // 向后
      const fromIndex = payload.fromIndex.toString();
      const toIndex = payload.toIndex.toString();
      if (fromIndex.length < toIndex.length) {
        style = 'in';
      } else if (fromIndex.length === toIndex.length) {
        const fromNum = fromIndex.charAt(fromIndex.length - 1);
        const toNum = toIndex.charAt(toIndex.length - 1);
        if (fromNum < toNum) {
          style = 'in';
        }
      }
      state.style = style;
    },

  },
  actions: {
    transitionStyle({ commit }, payload) {
      commit({ type: 'transitionStyle', ...payload });
    },
  },
};

export default router;

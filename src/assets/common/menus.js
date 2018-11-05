// 保存头部标题显示数据
const menus = {
  menuList: [
    {
      label: '首页',
      path: '/home',
      index: 10,
      children: [
        {
          label: 'test',
          path: '/test',
          index: 101,
        },
      ],
    },
    {
      label: '消息',
      path: '/news',
      index: 11,
    },
    {
      label: '应用',
      path: '/apply',
      index: 12,
    },
    {
      label: '我的',
      path: '/mine',
      index: 13,
    },
  ],
  tabColumn: {
    selectedLabelDefault: '首页',
    tabs: [
      {
        label: '首页',
        icon: 'cubeic-like',
        path: '/home',
      },
      {
        label: '消息',
        icon: 'cubeic-like',
        path: '/news',
      },
      {
        label: '应用',
        icon: 'cubeic-home',
        path: '/apply',
      },
      {
        label: '我的',
        icon: 'cubeic-person',
        path: '/mine',
      },
    ],
  },
};

export default menus;

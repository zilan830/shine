// 保存头部标题显示数据
const menus = {
  menuList: [
    {
      label: '首页',
      path: '/home',
      index: 10,
    },
    {
      label: '应用',
      path: '/apply',
      index: 11,
      children: [
        {
          label: '请假',
          path: '/leave',
          index: 110,
          children: [
            {
              path: '/leaveform',
              label: '请假流程',
              index: 1100,
              // children: [
              //   {
              //     path: '/leaveform',
              //     label: '草稿',
              //     index: 11000,
              //   },
              // ],
            },
            {
              path: '/nextapprove',
              label: '下一步',
              index: 1101,
            },
          ],
        },
      ],
    },
    {
      label: '消息',
      path: '/news',
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
        icon: 'cubeic-home',
        path: '/home',
      },
      {
        label: '应用',
        icon: 'cubeic-mobile-phone',
        path: '/apply',
      },
      {
        label: '消息',
        icon: 'cubeic-email',
        path: '/news',
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

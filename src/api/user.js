

export default [
  {
    name: 'getUserInfo',
    method: 'GET',
    desc: '获取当前用户信息',
    path: '/user/getUserInfo'
  },
  {
    name: 'getLoginStatus',
    method: 'GET',
    desc: '获取登录状态',
    path: '/user/getLoginStatus'
  },
  {
    name: 'getCurrentUser',
    method: 'GET',
    desc: '获取当前角色',
    path: '/user/checkClassAdmin'
  }
];

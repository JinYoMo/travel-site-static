import { getViewPage } from '../router-tools'

const staticRouters = [
  {
    path: '/coreBusiness',
    name: 'coreBusiness',
    component: getViewPage('coreBusiness/index')
  },
  {
    path: '/advantageService',
    name: 'advantageService',
    component: getViewPage('advantageService/index')
  },
  {
    path: '/newsCenter',
    name: 'newsCenter',
    component: getViewPage('newsCenter/index')
  },
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: getViewPage('newsCenter/newsDetail')
  },
  {
    path: '/jobOffers',
    name: 'jobOffers',
    component: getViewPage('jobOffers/index')
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    component: getViewPage('contactUs/index')
  },
  {
    path: '/home',
    name: 'home',
    component: getViewPage('home/index')
  },
  {
    path: '/',
    redirect:'/home',
    component: getViewPage('home/index')
  },
  {
    path: '/404',
    name: 'notFound',
    component: getViewPage('not-found')
  },
  {
    path: '/noPermission',
    name: 'noPermission',
    component: getViewPage('no-permission')
  },
  {
    path: '*',
    redirect: {
      name: 'notFound'
    }
  }
]
export default staticRouters

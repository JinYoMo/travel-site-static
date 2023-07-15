import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.less'
// import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// import moment from 'moment';
// import APlayer from '@moefe/vue-aplayer';

// Vue.use(APlayer, {
//   defaultCover: require('@/assets/images/preview/not-preview.png'),
//   productionTip: true,
// });

import plugins from '@/plugins/index'

import '@/directives/index';

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/filters/index'

Vue.use(plugins)
Vue.use(ElementUI)
// Vue.prototype.$moment = moment;
// window.$moment = moment;
// Vue.prototype.$videojs = videojs;
window.$message = Vue.prototype.$message;

import { i18n } from "./i18n";

// 地图
import AMap from 'vue-amap';
Vue.use(AMap);
 
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key-高德开放平台注册申请key https://lbs.amap.com/
  key: '47d8647c76f3b15f10299e7781d2f991',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});

// 动画 animate.css 用类名即可
import '@/assets/styles/animate.min.css'
 
// 滚动动画 wow.js
import { WOW } from 'wowjs'
Vue.prototype.$wow = new WOW({
  boxClass: 'wow', // default
  animateClass: 'animated', // default
  offset: 150, // default
  mobile: true, // default
  live: false,
  // live为true时，控制台会提示：MutationObserver is not supported by your browser. & WOW.js cannot detect dom mutations, please call .sync() after loading new content.
  callback: function (box) {
    console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
  }
})



async function setup() {
  try {
    new Vue({
      i18n,
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  } catch (err) {
    console.log(err);
  }
}

setup();

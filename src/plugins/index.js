
import eventBus from './eventBus'
import api from './api';

export default {
  install: (Vue, options) => {
    Vue.prototype.$bus = eventBus
    Vue.prototype.$api = api;
  }
}

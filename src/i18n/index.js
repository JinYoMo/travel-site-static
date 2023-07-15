import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {lang as i18nMessages} from '../lang';
Vue.use(VueI18n);
// sessionStorage.lang || 'zh',
const language = 'zh';
export const i18n = new VueI18n({
  silentFallbackWarn: true,
  locale: sessionStorage.lang || 'zh',
  messages: i18nMessages
});

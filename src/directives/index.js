import Vue from 'vue';
import mulLineEllipsis from './mul-line-ellipsis';
const directives = Object.assign({}, mulLineEllipsis);
for (const [key, value] of Object.entries(directives)) {
  Vue.directive(key, value);
}

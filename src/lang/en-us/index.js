/*
 * @Author: fanjinkun
 * @Date: 2022-09-08 10:19:50
 * @LastEditors: fanjinkun
 * @LastEditTime: 2022-09-08 16:26:19
 * @Description: 
 */
import _ from "underscore";

// 检索多语言
import home from "./home";
import coreBusiness from "./coreBusiness";
import advantageService from "./advantageService";
import newsCenter from "./newsCenter";
import jobOffers from "./jobOffers";
import contactUs from "./contactUs";

import En from './en.js'


var en = {};
en = _.extend(en, home);
en = _.extend(en, coreBusiness);
en = _.extend(en, advantageService);
en = _.extend(en, newsCenter);
en = _.extend(en, jobOffers);
en = _.extend(en, contactUs);
en = _.extend(en, En);

export const en_ = en;

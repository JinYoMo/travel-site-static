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
import zg from "./zg";

var zh = {};

zh = _.extend(zh, home);
zh = _.extend(zh, coreBusiness);
zh = _.extend(zh, advantageService);
zh = _.extend(zh, newsCenter);
zh = _.extend(zh, jobOffers);
zh = _.extend(zh, contactUs);
zh = _.extend(zh, zg);

export const zh_ = zh;

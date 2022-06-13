import Vue from "vue";
import "./autoRegisterCom.js" //引入自动注册全局组件
import "./request"; //引入http请求
import { resetUrl } from "./resetUrl.js"; //修改图片路径
import {
    getStorage,
    setStorage,
    removeStorageItem,
    clearStorage
} from "./storage"; //设置localStorage的方法
import { toFixed } from "./money.js" //引入过滤两位小数的方法


Vue.prototype.$resetUrl = resetUrl;
Vue.prototype.$getStorage = getStorage;
Vue.prototype.$setStorage = setStorage;
Vue.prototype.$removeStorageItem = removeStorageItem;
Vue.prototype.$clearStorage = clearStorage;

Vue.prototype.$toFixed = toFixed;
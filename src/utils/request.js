import Vue from "vue";
import axios from "axios";
// 轻提示语弹框
import { Toast } from "vant";
import { getStorage } from "@/utils/storage.js";

Vue.use(Toast);

// 创建一个请求本体
let http = axios.create({
    baseURL: "http://vt.ossjk.com/",
    timeout: 10000,
    headers: { "content-type": "application/json" },
});

// 添加请求拦截器
http.interceptors.request.use(
    function(config) {
        Toast.loading({
            message: "加载中...",
            forbidClick: true,
        });
        let token = getStorage("jwtToken");
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    function(error) {
        // 对错误请求做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
http.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        return response;
    },
    function(error) {
        // 对相应错误做点什么
        return Promise.reject(error);
    }
);

// 给Vue添加一个叫$http的实例的方法
Vue.prototype.$http = http;
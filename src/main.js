import Vue from 'vue';
import App from './App.vue';
import router from "@/router"; //路由
import store from "@/store"; //vuex



import "@/utils/index.js"; //引入工具函数

import "@/plugins/index.js"; //引入插件

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
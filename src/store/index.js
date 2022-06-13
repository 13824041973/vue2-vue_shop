import Vue from "vue";
import Vuex from "vuex";
import shopcar from "./modules/shopcar";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        shopcar,
    },
});
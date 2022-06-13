import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./commonRoutes";

Vue.use(VueRouter);

export default new VueRouter({
    routes,
})
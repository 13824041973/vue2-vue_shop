<template>
  <van-tabbar route>
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="shop-o" to="/list">列表页</van-tabbar-item>
        <van-tabbar-item icon="cart-o" :badge="goodsLength" to="/shopcar">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/user">会员中心</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {mapState,mapMutations}=createNamespacedHelpers("shopcar");
export default {
    name:"tabBar",
    computed:{
        ...mapState(["goodsLength"]),
    },
    methods:{
        ...mapMutations(["getGoodsLength"]),
    },
    created(){
        this.getGoodsLength();
    }
}
</script>
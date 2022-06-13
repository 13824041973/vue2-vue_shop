<template>
  <div>
      <!-- 搜索栏 -->
      <search />
      
      <!-- 轮播图 -->
      <swiper :data="data"/>

      <!-- 分类 category -->
      <category :data="data"/>

      <!-- 广告栏 -->
      <ad :data="data"/>

      <!-- 推荐 -->
      <recommend :data="data" class="recommend"/>

      <!-- 底部tabbar栏 -->
      <tabBar/>
  </div>
</template>

<script>
import search from "./searchName.vue";
import swiper from "./swiperName.vue";
import category from "./categoryName.vue";
import ad from "./adName.vue";
import recommend from "./recommendName.vue";
import { getIndexInfo } from "@/apis/home";
export default {
    components:{
        search,
        swiper,
        category,
        ad,
        recommend,
    },
    data(){
        return {
            data:{},//首页的数据
        }
    },
    async created(){
        let res = await this.$http.request({
            url:getIndexInfo,
            method:"GET",
        });
        this.data=res.data.data;
        // console.log(res);
        console.log(this.data);
    }
}
</script>

<style scoped>
.recommend {
    margin-bottom: 50px;
}
</style>
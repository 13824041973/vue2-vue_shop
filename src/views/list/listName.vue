<template>
  <div>
      <!-- 标题 -->
      <div class="navBar">类别列表</div>
      <!-- 内容 -->
      <div class="content">
          <!-- 左边大类栏 -->
          <div class="leftList">
                <div v-for="(item,index) in leftList" :key="index" class="leftSelect" :class="{'leftSelectingBgc':index==leftCurrent}" @click="leftCurrent=index">
                    <span :class="{'leftSelectingBorder':index==leftCurrent}">{{item.mallCateforyName}}</span>
                </div>
          </div>
          <!-- 右边 -->
          <div class="rightAll">
              <!-- 小类栏，上方 -->
              <div class="topList">
                  <div v-for="(item,index) in topList" :key="index" class="topListItem" :class="{'topListItemSelecting':index==topCurrent}" @click="topCurrent=index">{{item.mallSubName}}</div>
              </div>
              <!-- 展示列表栏 -->
              <div class="showList">
                  <div class="showListItem" v-for="(items,index) in list" :key="index">
                      <!-- <img :src="items.pictureComperssPath"> -->
                      <router-link :to="{path:'/details',query:{id:items.id}}">
                        <van-image
                        :src="items.pictureComperssPath"
                        class="van-image"
                        lazy-load
                        >
                            <template v-slot:error>图片失效</template>
                        </van-image>
                      </router-link>
                      <router-link :to="{path:'/details',query:{id:items.id}}">
                        <div>
                            <span>{{items.name}}</span>
                            <p>{{items.presentPrice}}</p>
                        </div>
                      </router-link>
                  </div>
              </div>
          </div>
      </div>

      <!-- 底部导航栏 -->
      <tabBar/>
  </div>
</template>

<script>
// import tabBar from "@/components/tabBar.vue"
import {
    getCategoryList,
    getCategorySubList,
    getGoodsListByCategorySubID,
} from "@/apis/list";
export default {
    // components:{tabBar},
    props:{
        idx:{
            type:String,
        },
    },
    data(){
        return {
            leftList:[],
            topList:[],
            list:[],
            leftCurrent:this.idx || 0,
            topCurrent:0,
        }
    },
    methods: {
        API_getDetailGoodsInfo(){
            // 大类接口
            return this.$http.request({
                url:getCategoryList,
            });
        },
        API_getCategorySubList(categoryId){
            // 小类接口
            return this.$http.request({
                url:getCategorySubList,
                method:"POST",
                data:{
                    categoryId,
                },
            });
        },
        API_getGoodsListByCategorySubID(categorySubId) {
            // 列表接口
            return this.$http.request({
                url:getGoodsListByCategorySubID,
                method:"POST",
                data:{
                    categorySubId,
                },
            });
        },
        async showList(leftCurrent=0,topCurrent=0) {
            let res = await this.API_getDetailGoodsInfo();
            this.leftList=res.data.data;

            let res2 = await this.API_getCategorySubList(
                this.leftList[leftCurrent].id
            );
            this.topList = res2.data.data;

            let res3 = await this.API_getGoodsListByCategorySubID(
                this.topList[topCurrent].id
            );
            this.list = res3.data.data;
            // console.log(res3);
            console.log(this.list);
        },
    },
    watch: {
        leftCurrent:{
            async handler(val) {
                this.topCurrent=0;
                this.showList(val);
            },
            immediate:true,
        },
        topCurrent:{
            async handler(val) {
                this.showList(this.leftCurrent,val);
            },
            immediate:true,
        },
    },
};
</script>

<style lang="scss" scoped>
.navBar {
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 0.5px solid rgb(245, 245, 245);
}

.content{
    // position: fixed;
    // left: 0;
    // width: 100%;
    // height: 100%;
    display: flex;
    align-items: start;
    overflow: hidden;
    // margin-left: -8px;

    .leftList {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .leftSelect {
            width: 80px;
            padding: 20px 0;
            font-size: 14px;
            background-color: #f7f8fa;

            span {
                padding-left: 10px;
            }

            .leftSelectingBorder {
                border-left: 5px solid red;
            }
        }
        .leftSelectingBgc {
            background-color: #fff;
        }
    }

    .rightAll {
        // position: absolute;
        // left: 80px;
        // width: 300px;
        flex: 1;

        .topList {
            display: flex;

            .topListItem {
                width: 72px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: 14px;
            }
            .topListItemSelecting {
                border-bottom: 4px solid red;
            }
        }

        .showList {
            
            .showListItem {
                display: flex;
                align-items: center;

                a {
                    color: black;
                }

                .van-image {
                    width: 100px;
                    height: 100px;
                    // background-color: #f7f8fa;
                    // text-align: center;
                    // line-height: 100px;
                    // color: gray;
                }

                div {
                    width: 190px;
                    height: 100px;
                }
            }
        }
    }
}

</style>
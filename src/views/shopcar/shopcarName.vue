<template>
  <div>
      <!-- 顶部navBar  标题 -->
      <div class="navBar">
          <div class="title">购物车</div>
          <div>
              <button @click="removeAll">清空购物车</button>
          </div>
      </div>

      <!-- 中间内容区  item栏 -->
      <div v-if="!this.shopCarList.length">暂无商品</div>
      <div v-else style="margin-bottom: 100px;">
        <div class="centerItem" v-for="(item,index) in shopCarList" :key="index">
            <input type="checkbox" class="selectOne" v-model="item.isChecked" @change="removeAndSetStorage(index,item.num)">
            <img :src="item.image">
            <div class="contentArea">
                <span>{{item.name}}<b>({{item.sku.type}})</b></span>
                <div>
                    <button @click="item.num--,removeAndSetStorage(index,item.num)">-</button>
                    <input type="number" v-model="item.num" @change="removeAndSetStorage(index,item.num)"> 
                    <button @click="item.num++,removeAndSetStorage(index,item.num)">+</button>
                </div>
            </div>
            <div class="priceArea">
                <span>￥{{item.sku.price}}</span>
                <span>*{{item.num}}</span>
                <span>￥{{$toFixed(item.num*item.sku.price)}}</span>
            </div>
        </div>
      </div>

      <!-- 底部全选栏 合计金额 -->
      <div class="bottomAll">
          <div class="AllSelect">
              <input type="checkbox" class="selectAll" v-model="allChecked">
              <span>全选</span>
          </div>
          <div class="AllPrice">
              合计：
              <span>
                  ￥
                  <b>{{(allTotal+"").split(".")[0]}}</b>
                  .
                  {{(allTotal+"").split(".")[1]}}
              </span>
              <button>提交订单</button>
          </div>
      </div>

      <!-- 底部tarbar栏 -->
      <tabBar/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("shopcar");
export default {
    data(){
        return {
            shopCarList:[],
        }
    },
    computed:{
        allChecked:{
            get(){
                let allSelectChecked = false;
                if(this.shopCarList.length){
                    allSelectChecked = this.shopCarList.every(item=>item.isChecked);
                }
                return allSelectChecked;
            },
            set(allSelectChecked){
                this.shopCarList.map(item=>item.isChecked=allSelectChecked);
            }
        },
        allTotal(){
            let sum =0 ;
            this.shopCarList.forEach(item=>{
                if(item.isChecked){
                    sum += item.num*item.sku.price
                }
            });
            return this.$toFixed(sum);          
        }
    },
    methods:{
        ...mapMutations(["getGoodsLength"]),
        removeAndSetStorage(index,num) {
            if(num<=0){
                this.shopCarList.splice(index,1);
            }
            this.$setStorage("shopCarList",this.shopCarList);
            this.getGoodsLength();
        },
        removeAll(){
            this.shopCarList=[];
            this.$setStorage("shopCarList",this.shopCarList);
            this.getGoodsLength();
        }
    },
    activated(){
        this.shopCarList=this.$getStorage("shopCarList") || [];
        // console.log(this.shopCarList);
    },
}
</script>

<style lang="scss" scoped>
// 标题
.navBar {
    
    border-bottom: 0.5px solid rgb(245, 245, 245);

    .title {
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-bottom: 0.5px solid rgb(245, 245, 245);
    }
    div {
        height: 45px;
        line-height: 45px;
        button {
            float: right;
            // width: 90px;
            height: 45px;
            color: white;
            border-radius: 10px;
            border: none;
            background-color: #f34d1f;
        }
    }    
}

// 中间内容区  item栏
.centerItem {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-right: 0.5px solid red;
    height: 100px;

    .selectOne {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }

    img {
        width: 100px;
        height: 100px;
    }

    // 内容文字区
    .contentArea {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        width: 185px;
        // margin: 0 5px;

        span {
            b{
                font-weight: normal;
            }
        }
        input {
            width: 25px;
            height: 25px;
            text-align: center;
            border: none;
            outline: none;
            background-color: #f7f8fa;
            margin: 0 5px;
        }
        button {
            width: 25px;
            height: 25px;
            background-color: #f7f8fa;
            border: none;
        }
    }

    // 单商品金额区
    .priceArea {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 63px;

        span {
            width: 63px;
        }
    }
}

// 底部 全选 合计金额
.bottomAll {
    position: fixed;
    bottom: 49px;
    left: 0;
    z-index: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 15px;
    width: 345px;
    height: 50px;
    background-color: #fff;

    .AllSelect {
        display: flex;
        align-items: center;

        .selectAll {
            // border-radius: 50%;
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        
    }

    .AllPrice {
        font-size: 14px;
        span {
            font-size: 12px;
            color: #ee0a24;

            b {
                font-size: 20px;
                font-weight: normal;
            }
        }
        button {
            width: 110px;
            height: 40px;
            margin-left: 12px;
            color: white;
            background-color: #f34d1f;
            border: none;
            border-radius: 20px;
        }
    }
}
</style>
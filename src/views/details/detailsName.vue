<template>
  <div>
    <!-- 内容区 -->
    <div class="contentArea">
      <!-- 导航栏 -->
      <van-nav-bar
        title="详情"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 图片 -->
      <div class="img">
        <img :src="detailsData.image1">
      </div>
      <!-- 文字介绍 价格 区 -->
      <div class="text">
        {{detailsData.name}}
      </div>
      <div class="price">
        价格：{{detailsData.presentPrice}}
      </div>
      <!-- 商品详情区 -->
      <div class="itemDetail">
        商品详情
      </div>
      <!-- 图片详情区 -->
      <div class="showImg" v-html="detailsData.detail"></div>
      <!-- 底部 actionBar -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="goodsLength" @click="toShopcar" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="show=!show"
        />
      </van-goods-action>
    </div>
    <!-- popup弹起框 -->
    <van-popup
      v-model="show" 
      round position="bottom" 
      :style="{ height: '290px', width:'335px', padding:'20px' }"
    >
      <!-- 图片 文字内容 -->
      <div class="popupTop">
        <!-- 图片 -->
        <img :src="detailsData.image1">
        <!-- 文字内容 价格 -->
        <div>
          <p>{{detailsData.name}}</p>
          <p>价格：￥{{detailsData.presentPrice}}</p>
        </div>
      </div>
      <!-- 商品规格 -->
      <div class="popupcontent">
        <p style="font-size:14px">商品的规格：</p>
        <div>
          <van-button
            size="normal"
            plain round type="info"
            v-for="(item,index) in detailsData.type"
            :key="item.id"
            :class="index==selectTypeIndex?'selectingType':null"
            @click="selectType(item.id,index)"
          >
            {{item.name}}
          </van-button>
        </div>
        <van-button @click="addShopCar" class="setShopcar" type="danger" size="large">
          添加到购物车
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getDetailGoodsInfo } from "@/apis/details";
import {createNamespacedHelpers} from "vuex";
const { mapState,mapMutations } = createNamespacedHelpers("shopcar");
export default {
  props:{
    id:{
      type:String,
      required:true,
    },
  },
  computed:{
    ...mapState(["goodsLength"]),
  },
  methods:{
    ...mapMutations(["getGoodsLength"]),
    toShopcar(){
      this.$router.push("/shopcar");
    },
    // 选择的商品规格,传入的参数id
    // 111表示大 222表示中 333表示小
    selectType(id,index){
      // 控制选中的规格的按钮背景色
      this.selectTypeIndex=index;
      // 获取选中的规格的数据
      let selectData;
      this.detailsData.skuComb.forEach(items => {
        if(items.s1===id){
          selectData = items;
        }
      });
      // console.log(selectData);
      this.selectTypeData = Object.assign({},selectData,{
        type:this.detailsData.type[index].name,
      });
      // console.log(this.selectTypeData);
    },
    // 添加到购物车
    addShopCar(){
      this.currentGoodsItem = Object.assign({},this.selectTypeData,{
        id:this.detailsData.id,
        name:this.detailsData.name,
        num: 1,
        image: this.detailsData.pictureComperssPath,
        isChecked: false,
        sku: {
          id: this.selectTypeData.id,
          price: this.selectTypeData.price,
          stock_num: this.selectTypeData.stock_num,
          type: this.selectTypeData.type,
        },
      });
      //   删除多余的属性（可选）
      this.$delete(this.currentGoodsItem, "s1");
      this.$delete(this.currentGoodsItem, "stock_num");
      this.$delete(this.currentGoodsItem, "type");
      this.$delete(this.currentGoodsItem, "price");
      // console.log(this.currentGoodsItem);
      this.getShopCarList(this.currentGoodsItem);
      this.getGoodsLength();//重新获取商品数量
      this.$toast.success("添加成功");
      this.show=false;
    },
    getShopCarList(item){
      // 把单个商品整合成数组
      let shopCarList = this.$getStorage("shopCarList") || [];
      // 获取购物车列表
      if (shopCarList.length === 0) {
        // 空数组
        shopCarList.push(item);
      } else {
        let newArr = shopCarList.filter(items =>{
          return items.id === item.id && items.sku.id === item.sku.id;
        });
        // 当加入购物车的商品已经在购物车时,newArr有值
        // console.log(newArr);
        if(newArr.length) {
          newArr[0].num++;
          shopCarList.concat(newArr);
        }else {
          shopCarList.push(item);
        }
      }
      this.$setStorage("shopCarList",shopCarList);
    },
  },
  data(){
    return {
      detailsData:"",//详情页数据
      show:false,//popup弹起框是否弹起
      selectTypeIndex:0,//选择的商品的规格 0大 1中 2小
      selectTypeData:{},//选中的规格的数据
      currentGoodsItem:{},//当前选中的商品所有数据
    }
  },
  async created(){
    let res = await this.$http.request({
      url:getDetailGoodsInfo,
      method:"POST",
      data:{
        goodsId:this.id,
      },
    });
    // console.log(res);
    this.detailsData=res.data.data;
    console.log(this.detailsData);
    this.getGoodsLength();
    // 给selectTypeData sku赋值默认值
    this.selectTypeData = Object.assign({},this.detailsData.skuComb[0],{
      type:this.detailsData.type[0].name,
    });
  }
}
</script>

<style lang="scss" scoped>
.contentArea {

  .img {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .text,
  .price {
    // text-align: center;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
  }

  .itemDetail{
    height: 40px;
    text-align: center;
    font-size: 20px;
    color: #f00;
    border-bottom: 1px solid #f00;
  }
}

.popupTop {
  display: flex;
  align-items: center;
  padding: 0 0 10px;
  margin: 0 0 10px;
  border-bottom: 0.4vw solid rgb(211, 207, 207);

  img {
    width: 100px;
    height: 100px;
  }
}

.popupcontent {
  div {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;

    button {
      display: flex;
      justify-content: center;
      width: 75px;
      color: black;
      border: 1px solid black;
    }

    .selectingType {
      background-color: #ffc0cb;
    }
  }

  .setShopcar {
    display: flex;
    justify-content: center;
  }
}
</style>
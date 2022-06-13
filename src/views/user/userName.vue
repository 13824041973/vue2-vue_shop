<template>
  <div class="user">
      <!-- 未登录状态 -->
      <template v-if="!token">
          <div class="noLogin">
                <button>注册</button>
                <div>
                  已有账号?
                  <router-link to="/login">登录</router-link>
                </div>
          </div>
      </template>
      <!-- 登录状态 -->
      <template v-if="token">
          <div class="isLogin">
              <div class="topWelcome">
                  欢迎
              </div>
              <div class="centerList">
                  <div>待付款</div>
                  <div>待接单</div>
                  <div>待发货</div>
                  <div>已发货</div>
              </div>
              <div class="bottomList">
                    <div>
                        <span>地址管理</span>
                        <span>></span>
                    </div>
                    <div>
                        <span>我的积分</span>
                        <span>></span>
                    </div>
                    <div>
                        <span>我的优惠券</span>
                        <span>></span>
                    </div>
                    <div>
                        <span>我收到的礼物</span>
                        <span>></span>
                    </div>
              </div>
              <button @click="getOut">退出账号</button>
          </div>
      </template>

      <tabBar/>
  </div>
</template>

<script>
// import tabBar from "@/components/tabBar";
export default {
    // components:{tabBar},
    data(){
        return {
            token:false,
        };
    },
    methods:{
        getOut(){
            this.$router.replace("/login");
        },
    },
    async activated(){
        if(this.$getStorage("jwtToken")){
            this.token=true;
        }
    }
}
</script>

<style lang="scss" scoped>
.user {
    height: 100%;
    position: relative;
}

.noLogin {
    position: absolute;
    top: 334px;
    transform: translateY(-50%);
    text-align: center;
    width: 100%;

    button {
        width: 50px;
        height: 25px;
        background-color: #07c160;
        color: white;
        border-style: none;
        border-radius: 3px;
        margin-bottom: 20px;
    }
    a {
        text-decoration-line: none;
    }
}

.isLogin {
    // width: 100%;
    .topWelcome {
        width: 100%;
        height: 200px;
        text-align: center;
        line-height: 200px;
        background-color: yellowgreen;
    }

    .centerList {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 30px;
        font-size: 12px;
        border-bottom: 0.5px solid rgb(245, 245, 245);
    }

    .bottomList {
        color: #323233;

        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 45px;
            border-bottom: 0.5px solid rgb(245, 245, 245);
            border-top: 0.5px solid rgb(245, 245, 245);
        }
    }

    button {
        width: 100%;
        height: 50px;
        color: white;
        background-color: red;
        border: none;
        border-radius: 5px;
    }
}
</style>
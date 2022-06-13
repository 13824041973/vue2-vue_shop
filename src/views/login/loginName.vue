<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="loginTop">
      <span class="topBack" @click="goBack">返回</span>
      <span>登陆</span>
    </div>
    <!-- 表单栏 -->
    <form @submit.prevent>
      <div class="formInput">
        <span><span class="red">*</span>用户名</span><input type="text" v-model="name" placeholder="用户名" required>
      </div>
      <div class="formInput">
        <span><span class="red">*</span>密码</span><input type="password" v-model="pwd" placeholder="密码" required>
      </div>
      <button  @click="loginForm(name,pwd)" type="button" class="btn">提交</button>
      <!-- <input  @click="onSubmit(name,pwd)" type="submit" value="提交" class="btn"> -->
    </form>
  </div>
</template>

<script>
import {login} from "@/apis/login";
export default {
    name:"loginName",
    data(){
      return {
        name:"",
        pwd:"",
      };
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      async loginForm(name,pwd){
        let res = await this.$http.request({
          url:login,
          method:"POST",
          data:{
            name,
            pwd,
          },
        });
        console.log(res);
        if(res.data.code === 1000){
          // 登录成功
          // console.log(res);
          this.$toast.success(res.data.msg);
          this.$setStorage("jwtToken",res.data.token)
          this.$router.push("/user")
        }else{
          alert("信息有误");
        }
      },
    },
};
</script>

<style lang="scss" scoped>
// 顶部导航栏
.loginTop {
  text-align: center;
  position: relative;
  padding: 10px 0;
  border-bottom: 0.5px solid rgb(230, 226, 226);

  .topBack {
    position: absolute;
    left: 5px;
    color: rgb(34, 192, 255);
  }
}
// 表单栏
form {
  position: relative;

  .formInput {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 0.5px solid rgb(238, 235, 235);
    font-size: 14px;

    .red {
      color: red;
    }

    input {
      width: 70%;
      height: 24px;
      border-style: none;
      outline: none;
    }
    ::-webkit-input-placeholder {
        color: rgb(196, 191, 191);
    }
  }

  .btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    height: 44px;
    width: 95%;
    color: white;
    background-color: #1989fa;
    border-radius: 20px;
    border: 1px solid #1989fa;
  }
}

</style>
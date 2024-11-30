<template>
  <div class="background">
    <div class="login">
      <div><h1 class="Title">
        外卖商户登录
      </h1></div>
      <div class="enter">
        <el-input v-model="shopNum" style="height: 6vh;font-size: large; width: 25vw" placeholder="请输入商铺编号" @input="msg = false"/>
      </div>
      <div class="enter">
        <el-input v-model="password" style="height: 6vh;font-size: large;width: 25vw" placeholder="请输入密码" show-password @input="msg = false"/>
      </div>
      <h3 v-if="msg" style="font-family: 爱奇艺黑体;color: red">商铺编号或密码错误</h3>
      <el-button type="primary" @click="getShop">登录</el-button>  </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, inject, provide} from "vue";
const password = ref("")
const shopNum = ref("");
const msg = ref(false)
import { useRouter } from 'vue-router' // 引入 useRouter

const router = useRouter() // 使用 useRouter 获取 router 实例

function jump() {
  router.push({ path: '/1/main',query:{ shopNum: shopNum.value}});
}

const $http = inject("$axios");

function getShop() {
  const encryptedPassword = sha256(password.value);
  $http.get("http://127.0.0.1:8000/shop/login", {
    params: {
      shopNum: shopNum.value,
      password: encryptedPassword,
    }
  }).then(res => {
    if (res.data){
      jump();
    }else {
      msg.value = true
    }
  }).catch(error => {
       msg.value = false
  });

}




import {sha256} from "js-sha256";
import * as path from "path";

</script>

<style scoped>
.login{
  position: absolute; /* 绝对定位 */
  top: 50%; /* 上边界距离父元素顶部一半 */
  left: 50%; /* 左边界距离父元素左侧一半 */
  transform: translate(-50%, -50%); /* 通过transform属性将元素水平垂直居中 */
  background-color: rgba(255, 255, 255, 1); /* 设置登录模块背景色及透明度 */
  padding: 20px; /* 设置内边距 */
  border-radius: 10px; /* 设置圆角边框 */
}

.enter{
  margin: 10vh auto;
}

.Title{
  font-family: 爱奇艺黑体;
  text-align: center;
  margin: auto 20px;
}

.background {
  background-image: url('src/static/img_5.png'); /* 替换为你的图片路径 */
  background-size: cover; /* 让背景图全屏显示并保持比例 */
  background-position: center; /* 将背景图居中显示 */
  background-attachment: fixed; /* 使背景图固定不随滚动而移动 */
  height: 100vh; /* 设置高度为视窗高度 */
  /* 其他样式 */
}
</style>
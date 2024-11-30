<template>
  <div class="background">
    <div class="login">
      <div><h1 class="Title">
        用户登录
      </h1></div>
      <div class="enter">
        <el-input v-model="stuPhone" style="height: 6vh;font-size: large; width: 25vw" placeholder="请输入注册的电话号码"/>
      </div>
      <el-button type="primary" @click="jump()">登录</el-button></div>
  </div>
</template>

<script lang="ts" setup>
import {provide, ref} from "vue";
import {useRouter} from "vue-router";

const stuPhone = ref("");
const router = useRouter()


function jump() {
  router.push({ path: '/2/main',query:{'stuPhone': stuPhone.value}});
}




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
  background-image: url('src/static/img_6.png'); /* 替换为你的图片路径 */
  background-size: cover; /* 让背景图全屏显示并保持比例 */
  background-position: center; /* 将背景图居中显示 */
  background-attachment: fixed; /* 使背景图固定不随滚动而移动 */
  height: 100vh; /* 设置高度为视窗高度 */
  /* 其他样式 */
}
</style>
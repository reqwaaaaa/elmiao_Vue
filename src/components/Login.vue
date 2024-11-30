<template>
  <div class="background">
    <div class="login">
      <div class="Title"><span>管理员登录</span></div>
      <div class="enter">
        <el-input v-model="employeeNum" class="input" placeholder="请输入工号" @input="msg=false"/>
      </div>
      <div class="enter">
        <el-input v-model="password" class="input" placeholder="请输入密码" show-password @input="msg=false"/>
      </div>
      <span v-if="msg" class="error-message">工号或密码错误</span>
      <el-button type="primary" @click="getManager" class="login-button">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from 'vue-router';
import { sha256 } from "js-sha256";

const msg = ref(false);
const password = ref("");
const employeeNum = ref("");
const router = useRouter();

const $http = inject("$axios");

function jump() {
  router.push({ path: '/0/main' });
}

function getManager() {
  const encryptedPassword = sha256(password.value);
  $http.get("http://127.0.0.1:8000/manager/login", {
    params: {
      employeeNum: employeeNum.value,
      password: encryptedPassword
    }
  }).then(res => {
    if (res.data) {
      jump();
    } else {
      msg.value = true;
    }
  }).catch(error => {
    msg.value = true;
  });
}
</script>

<style scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 10px;
}

.enter {
  margin: 2vh auto; /* 调整垂直间距 */
}

.Title {
  font-family: 爱奇艺黑体;
  text-align: center;
  margin: 2vh auto; /* 调整标题上下间距 */
  font-size: 5vh;
}

.background {
  background-image: url('src/static/img_4.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}

.input {
  height: 6vh;
  font-size: 2vh;
  width: 90vw; /* 使用视窗宽度的 90% */
  max-width: 25rem; /* 设置最大宽度为 25rem */
}

.error-message {
  font-size: 2vh;
  color: red;
  font-family: 爱奇艺黑体;
  text-align: center;
  display: block; /* 将错误信息显示为块级元素 */
  margin-top: 2vh; /* 调整上边距 */
}

.login-button {
  width: 90vw; /* 使用视窗宽度的 90% */
  max-width: 25rem; /* 设置最大宽度为 25rem */
  margin-top: 2vh; /* 调整上边距 */
}
</style>
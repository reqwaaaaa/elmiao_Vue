<template>
  <el-input
      v-model="msg"
      style="width: 50vw"
      :rows="6"
      type="textarea"
      placeholder="请输入通知信息"
  />
  <div class="button">
  <el-button type="primary" @click="addNotice">提交</el-button>
  </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue'
const msg = ref("")
const $http = inject("$axios");

async function addNotice(){
  const result = {
    msg: msg.value
  };
  $http.post("http://127.0.0.1:8000/add/notice",
      result
  ).then(res=>{
    if(res.data) {
      msg.value = ''
    }else {
    }
  }).catch(error=>{
  })

}



</script>

<style scoped>

</style>

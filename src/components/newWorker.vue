<template>
  <br />
  <el-form
      ref="form"
      style="max-width: 600px;margin: auto;border-width: 2px;background-color: white;
      border-style: solid;
      border-color: dimgray;"
      label-width="auto"
      :label-position="labelPosition"
      :size="size"
  >
    <el-form-item label="工号">
      <el-input v-model="employeeNum" />
    </el-form-item>

    <el-form-item label="姓名">
      <el-input v-model="name" />
    </el-form-item>

    <el-form-item label="联系电话">
      <el-input v-model="phoneNum" />
    </el-form-item>

    <el-form-item label="性别">
      <el-input v-model="gender" />
    </el-form-item>

    <el-form-item label="月薪">
      <el-input v-model="salary" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addWorker">新增外卖员</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>
import {  ref } from 'vue'
import {inject} from "vue";

const size = ref('large')
const labelPosition = ref('top')

const employeeNum = ref("")
const name = ref("")
const phoneNum = ref("")
const gender = ref("")
const salary = ref(0)


const $http = inject("$axios");

async function addWorker(){
  const data = {
    employeeNum: employeeNum.value,
    name: name.value,
    phoneNum: phoneNum.value,
    gender: gender.value,
    salary: salary.value
  };
    $http.post("http://127.0.0.1:8000/add/worker",
        data
    ).then(res=>{
      if(res.data) {
      }else {
      }
    }).catch(error=>{
    })

  }






</script>

<style>

</style>



<style scoped>

</style>
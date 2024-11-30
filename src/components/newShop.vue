<template>
<!--  <div>-->
<!--    <el-radio-group v-model="size" label="size control">-->
<!--      <el-radio-button value="large">large</el-radio-button>-->
<!--      <el-radio-button value="default">default</el-radio-button>-->
<!--      <el-radio-button value="small">small</el-radio-button>-->
<!--    </el-radio-group>-->
<!--    <el-radio-group v-model="labelPosition" label="position control">-->
<!--      <el-radio-button value="left">Left</el-radio-button>-->
<!--      <el-radio-button value="right">Right</el-radio-button>-->
<!--      <el-radio-button value="top">Top</el-radio-button>-->
<!--    </el-radio-group>-->
<!--  </div>-->
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
    <el-form-item label="入驻日期">
      <el-date-picker
          v-model="enterData"
          type="date"
          placeholder="Pick a date"
          clearable
      />
    </el-form-item>

    <el-form-item label="店铺编号">
      <el-input v-model="shopNum" />
    </el-form-item>

    <el-form-item label="店铺名称">
      <el-input v-model="name" />
    </el-form-item>

    <el-form-item label="店铺负责人联系电话">
      <el-input v-model="phoneNum" />
    </el-form-item>

    <el-form-item label="法人姓名">
      <el-input v-model="legalPerson" />
    </el-form-item>

    <el-form-item label="店铺地址">
      <el-input v-model="address" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addShop">新增商铺</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>






import {  ref } from 'vue'
import {inject} from "vue";
import {useRouter} from "vue-router";

const size = ref('large')
const labelPosition = ref('top')


const enterData = ref("")
const name = ref("")
const phoneNum = ref("")
const shopNum = ref("")
const legalPerson = ref("")
const address = ref("")

const $http = inject("$axios");
const router = useRouter() // 使用 useRouter 获取 router 实例
async function addShop(){
  const data = {
    enterData: enterData.value,
    name: name.value,
    phoneNum: phoneNum.value,
    shopNum: shopNum.value,
    address: address.value,
    legalPerson: legalPerson.value
  };
    $http.post("http://127.0.0.1:8000/add/shop",
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
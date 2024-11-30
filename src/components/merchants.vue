<template>
  <el-button type="primary" size="large" plain @click="dialogVisible = true" style="width: 6vw;height: 5vh;font-size: larger">
    <el-icon><CirclePlus /></el-icon>
    新增商户
  </el-button>
    <el-input v-model="searchText" placeholder="请输入搜索关键字" @input="search()" clearable style="width: 20vw;height: 5vh;font-size: larger;margin-left: 3vw"></el-input>
  <el-table :data="filteredList" class="w" style="font-size: large">
    <el-table-column fixed prop="name" label="店铺名称" width="150" />
    <el-table-column prop="shopNum" label="店铺编号" width="120" />
    <el-table-column prop="enterData" label="入驻日期" width="300" />
    <el-table-column prop="legalPerson" label="店铺管理者" width="120" />
    <el-table-column prop="phoneNum" label="店铺管理者联系电话" width="200" />
    <el-table-column prop="address" label="店铺地址" width="600" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="danger" :icon="Delete" circle @click="remove(scope.row)"/>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="新增商铺" width="500" draggable>
    <el-form
        ref="form"
        style="max-width: 600px;margin: auto;background-color: white;"
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


    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addShop()">
          确认新增
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>



const size = ref('large')
const labelPosition = ref('top')


const enterData = ref("")
const name = ref("")
const phoneNum = ref("")
const legalPerson = ref("")
const address = ref("")
const shopNum = ref("")


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
      getShops()
    }else {
    }
  }).catch(error=>{
  })

}






const dialogVisible = ref(false)
import {CirclePlus, Delete} from '@element-plus/icons-vue'
import {inject, onMounted, ref, watchEffect} from 'vue';




const shopList = ref([])
const shopNum2 = ref("")

const $http = inject("$axios");
function remove(row){
  shopNum2.value = row.shopNum
  $http.delete("http://127.0.0.1:8000/remove/shop?shopNum="+shopNum2.value).
  then(res => {
    if (res.data) {
      getShops();
    }else {
    }
  }).catch(error=>{
  })
}


import { ElNotification } from 'element-plus'



const searchText = ref('')
const filteredList = ref([])
const search = ()=>{
  if(!searchText.value){
    filteredList.value = shopList.value;
  }else {
    filteredList.value = shopList.value.filter(shop =>
        Object.values(shop).some(val => String(val).toLowerCase().includes(searchText.value.toLowerCase()))
    );
  }
}
onMounted(async () => {
  getShops();
  await shopList;

  watchEffect(() => {
    searchText.value = ''
    filteredList.value = shopList.value;
  });
});

async function getShops(){
  $http.get("http://127.0.0.1:8000/show/shops").then(res=>{
    shopList.value = res.data
  }).catch(error=>{

  })
}
</script>

<style scoped>
.w{
  height: 60vh;
  width: 80vw;
}
</style>

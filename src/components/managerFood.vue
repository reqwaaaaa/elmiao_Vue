<template>
  <el-input v-model="searchText" placeholder="请输入搜索关键字" @input="search()" clearable style="width: 20vw;height: 5vh;font-size: larger;"></el-input>
  <tr></tr>
    <el-table  :data="filteredList" class="w" style="font-size: large">
      <el-table-column prop="name" label="商品名称" width="200" />
      <el-table-column prop="explain" label="商品详细信息" width="300" />
      <el-table-column prop="price" label="商品单价" width="200" />
      <el-table-column prop="sellOut" label="是否售罄" width="100" >
        <template v-slot="{ row }">
          {{ row.sellOut ? '售罄' : '未售罄' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">

        <template #default="scope">
          <el-button type="primary" @click="updateSellOut(scope.row)">售罄 / 恢复</el-button>
          <el-button type="danger" @click="remove(scope.row)">商品下架</el-button>
        </template>
      </el-table-column>
    </el-table>

</template>

<script lang="ts" setup>
onMounted(()=>{
  getFoods();
})
const shopNum = inject('shopNum')
const foodList = ref([]);
// 获取路由参数并在组件加载时更新shopNum
// 发送 HTTP 请求获取食品列表
async function getFoods() {
  try {
    const response = await $http.get('http://127.0.0.1:8000/show/foods?shopNum=' + shopNum);
    foodList.value = response.data;
  } catch (error) {
  }
}
import {inject, onMounted, ref, watchEffect} from "vue";




const name = ref('')




// const foodList = inject('foodList');

const $http = inject("$axios");
function remove(row){
  $http.delete("http://127.0.0.1:8000/remove/food?id="+row.id).
  then(res => {
    if (res.data) {
      getFoods()
    }else {
    }
  }).catch(error=>{
  })
}



import { ElNotification } from 'element-plus'



async function updateSellOut(row){
  const data = {
    id: row.id
  }
  $http.put("http://127.0.0.1:8000/update/sellout",
      data
  ).then(res=>{
    getFoods()
  }).catch(error=>{
  })
}

const searchText = ref('')
const filteredList = ref([])
const search =()=>{
  if (!searchText.value){
    filteredList.value = foodList.value;
  }else {
    filteredList.value = foodList.value.filter(food=>
      Object.values(food).some(val => String(val).toLowerCase().includes(searchText.value.toLowerCase()))
    );
  }
}

onMounted(async ()=>{
  await foodList;

  watchEffect(()=>{
    searchText.value = '';
    filteredList.value = foodList.value;
  })
})

</script>

<style scoped>
.w{
  height: 60vh;
  width: 80vw;
}
</style>
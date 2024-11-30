<template>

  <el-button type="primary" plain @click="dialogVisible = true" style="width: 8vw;height: 5vh;font-size: larger">
    <el-icon><CirclePlus /></el-icon>
    新增外卖员
  </el-button>
    <el-input v-model="searchText" placeholder="请输入搜索关键字" @input="search()" clearable style="width: 20vw;height: 5vh;font-size: larger;margin-left: 3vw"></el-input>
  <el-table  :data="filteredWorkerList" class="w" style="font-size: large">
    <el-table-column prop="employeeNum" label="外卖员工号" width="120" />
    <el-table-column prop="name" label="外卖员姓名" width="120" />
    <el-table-column prop="phoneNum" label="外卖员联系电话" width="300" />
    <el-table-column prop="gender" label="性别" width="120" />
    <el-table-column prop="salary" label="外卖员工资(日结)" width="180" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button type="danger" :icon="Delete" circle @click="remove(scope.row)"/>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="新增外卖员" width="500" draggable>
    <el-form
        ref="form"
        style="max-width: 600px;margin: auto;background-color: white;"
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
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addWorker()">
          确认新增
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// 导入Vue相关的功能
import { ElNotification } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import { CirclePlus } from '@element-plus/icons-vue';
import { inject, onMounted, ref } from "vue";
import {watchEffect} from "vue";

// 声明组件内部的响应式变量
const $http = inject('$axios')
const name = ref("");
const phoneNum = ref("");
const gender = ref("");
const salary = ref(0);
const employeeNum = ref('');
const size = ref('large');
const labelPosition = ref('top');
const dialogVisible = ref(false);
const employeeNum1 = ref('');
const searchText = ref('');
const filteredWorkerList = ref([]);

// 从父组件中注入workerList数据
const workerList = ref([])
async function getWorkers(){
  $http.get("http://127.0.0.1:8000/show/workers").then(res=>{
    workerList.value = res.data
  }).catch(error=>{

  })
}
onMounted(()=>{
  getWorkers();
})



// 新增外卖员的函数
async function addWorker() {
  const data = {
    employeeNum: employeeNum.value,
    name: name.value,
    phoneNum: phoneNum.value,
    gender: gender.value,
    salary: salary.value
  };
  $http.post("http://127.0.0.1:8000/add/worker", data).then(res => {
    if (res.data) {
      getWorkers()
    } else {
    }
  }).catch(error => {
  });
}



// 删除外卖员的函数
function remove(row) {
  employeeNum1.value = row.employeeNum;
  $http.delete("http://127.0.0.1:8000/remove/worker?employeeNum=" + employeeNum1.value).then(res => {
    if (res.data) {
      getWorkers()
    } else {
    }
  }).catch(error => {
  });
}



// 搜索函数
const search = () => {
  if (!searchText.value) {
    // 如果搜索关键字为空，则显示所有的workerList数据
    filteredWorkerList.value = workerList.value;

  } else {
    // 否则根据搜索关键字过滤数据
    filteredWorkerList.value = workerList.value.filter(worker =>
        Object.values(worker).some(val => String(val).toLowerCase().includes(searchText.value.toLowerCase()))
    );
  }
};

onMounted(async () => {
  // Wait for shopList to be injected and ready
  await workerList;

  watchEffect(() => {
    searchText.value = '';
    filteredWorkerList.value = workerList.value;
  });
});

</script>

<style scoped>
.w{
  height: 60vh;
  width: 80vw;
}
</style>

<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
  <div class="card-container" v-for="order in orders">
    <el-card v-if="order.status" style="max-width: 480px;margin-right: 2vw;margin-left: 1vw"  :key="order.orderNum">
      <template #header>
        <div class="card-header">
          <span style="margin: auto;font-size: large">历史订单</span>
          <h3>订单编号:{{order.orderNum}}</h3>
        </div>
      </template>
      <el-table :data="order.foods" style="width: 100%">
        <el-table-column prop="name" label="品名" width="180" />
        <el-table-column prop="num" label="数量" width="180" />
        <el-table-column prop="subtotal" label="小计" />
      </el-table>
      <h1>在线支付:￥{{order.total}}</h1>
      <h3>配送地址:{{order.address0}}</h3>
      <h2>客户联系电话:{{order.stuPhone}}</h2>
      <template #footer>
        <div><h2>备注:</h2></div>
        <h3>{{order.note}}</h3>
        <el-icon class="custom-icon"><CircleCheckFilled /></el-icon>
        <h1>订单已完成</h1>
      </template>
    </el-card>
  </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import { ElCard,ElTable, ElTableColumn} from "element-plus";
const shopNum = inject('shopNum')
const $http = inject('$axios')
const orders = ref([])
async function getOrders(){
  $http.get("http://127.0.0.1:8000/get/orders?shopNum=" + shopNum).then(res=>{
    orders.value = res.data
  }).catch(error=>{
  })
}
onMounted(()=>{
  getOrders();
});
// 在这里添加订单确认完成后的提示


</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: nowrap; /* 禁止换行 */
  overflow-x: auto; /* 如果卡片超出容器宽度，启用水平滚动 */
  flex-shrink: 0;
}

.custom-icon {
  font-size: 30px; /* 设置图标大小为24像素 */
}
.scrollbar-flex-content {
  display: flex;
}

el-card {
  flex: 0 0 auto; /* 不允许卡片伸缩 */
  margin-right: 2vw;
  margin-left: 1vw;
  width: 40vw; /* 设置卡片宽度 */
}

.scrollbar-flex-content {
  display: flex;
  overflow-x: auto;
}

.scrollbar-flex-content {
  display: flex;
}
</style>
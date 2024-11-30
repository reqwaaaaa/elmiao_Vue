<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <div class="card-container" v-for="order in orders" >
        <el-card  v-if="!order.status" style="margin-right: 2vw;margin-left: 1vw;margin-top: 2vh;margin-bottom: 2vh"  :key="order.orderNum">
          <template #header>
            <div>
              <h1 style="text-align: center">待处理订单</h1>
              <h3>订单编号:{{order.orderNum}}</h3>
            </div>
          </template>
          <el-table :data="order.foods" style="width: 100%;font-size: larger">
            <el-table-column prop="name" label="品名" width="180" />
            <el-table-column prop="num" label="数量" width="180" />
            <el-table-column prop="subtotal" label="小计" />
          </el-table>
          <h1>在线支付:￥{{order.total}}</h1>
          <h3>配送地址:{{order.address1}}</h3>
          <h2>客户联系电话:{{order.stuPhone}}</h2>
          <template #footer>
            <div><h2>备注:</h2></div>
            <h3>{{order.note}}</h3>
            <el-button type="success" style="margin: auto" @click="confirmOrder(order.orderNum);getOrders()">订单确认完成</el-button>
          </template>
        </el-card>
      </div>
    </div>
  </el-scrollbar>

</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {ElButton, ElCard, ElNotification, ElTable, ElTableColumn} from "element-plus";
const shopNum = inject('shopNum')

const orders = ref([])
async function getOrders(){
  $http.get("http://127.0.0.1:8000/get/orders?shopNum=" + shopNum).then(res=>{
    orders.value = res.data
  }).catch(error=>{
  })
}
onMounted(()=>{
  getOrders();
})
// const orders = inject('orders');
const $http = inject("$axios")

const confirmOrder = (orderNum) => {
  // 这里可以编写订单确认完成的逻辑，比如向后端发送请求等
  const data = {
    orderNum: orderNum
  };
  console.log('确认订单:', orderNum);
  $http.put("http://127.0.0.1:8000/update/status", data).then(res=>{
    // ElNotification.success({
    //   title: '订单确认完成',
    //   message: `订单 ${orderNum} 已确认完成`
    // })
    getOrders();
  }).catch(error=>{
    ElNotification.error({
      title: '订单确认失败',
      message: `订单 ${orderNum} 确认失败`
    })
  })
  // 在这里添加订单确认完成后的提示
}


</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: nowrap; /* 禁止换行 */
  overflow-x: auto; /* 如果卡片超出容器宽度，启用水平滚动 */
  flex-shrink: 0;
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

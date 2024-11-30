<template>
  <div style="height: 30vh;width: 96vw;display: flex;">
          <img :src="shop.img" alt="图片加载失败" style="width: 25vw;height: 30vh">

          <el-card style="width: 74vw;text-align: center;height: 30vh">
            <template #header>
              <div class="card-header">
                <span style="font-size: 8vh">{{shop.name}}</span>
              </div>
            </template>
            <h2>店铺地址:{{shop.address}}</h2>
            <h3 style="color: green">温馨提示:用餐高峰期请提前下单</h3>
          </el-card>
        </div>

  <div>
    <div v-for="food in foodList">
        <div v-if="!food.sellOut">
          <el-card style="width: 80vw; height: 30vh; margin: auto; margin-top: 3vh; margin-bottom: 12vh; display: flex; align-items: center;">
            <img :src="food.img" alt="图片加载失败" style="width: 20vw; height: 28vh;float: left">
            <div style="display: flex; flex-direction: column; margin-left: 20vw;float: right">
              <h1 style="font-size: 6vh">{{ food.name }}</h1>
              <h3>{{ food.explain }}</h3>
              <div class="container" >
                <h3 style="color: red">￥{{ food.price }}</h3>
                <span style="margin-left: 25vw;font-size: 5vh">
                    <el-icon style="color: gold;" @click="increaseQuantity(food)"><CirclePlusFilled /></el-icon>
                      {{ food.quantity }}
                    <el-icon style="color: gold;" @click="decreaseQuantity(food)"><RemoveFilled /></el-icon>
                  </span>
              </div>
            </div>
          </el-card>
        </div>

          </div>
  </div>


  <div class="footer">
    <span style="font-size: 8vh;color: red">共计:￥{{total}}</span>
    <el-button type="danger" style="margin-right: 0;height: 8vh;width: 8vw;font-size: 2vw;margin-bottom: 2vh;position: fixed;
  bottom: 0;
  right: 0;" plain @click="getOrder();dialogTableVisible = true;" :disabled="address1 === '收货地址'">结算</el-button>
  </div>



  <el-dialog v-model="dialogTableVisible" title="订单详情" width="800">

    <el-table :data="foods" style="font-size: 2.5vh">
      <el-table-column property="name" label="商品" width="150" />
      <el-table-column property="quantity" label="数量" width="200" />
      <el-table-column label="小计">
        <template #default="{ row }">
          {{ calculateSubtotal(row) }}
        </template>
      </el-table-column>
    </el-table>
    <h1>配送至: {{address1}}</h1>
    <el-input
        v-model="note"
        style="width: 20vw;height: 20vh;font-size: 3vh"
        placeholder="备注"
        clearable
    />
    <span style="font-size: 5vh;margin-left: 5vw;color: red">总计:￥{{total}}</span>
    <el-button type="danger" style="margin-left: 25vw" @click="addOrder();">提交订单</el-button>
  </el-dialog>

</template>
<script setup>
async function updateBalance(){
  const data = {
    'change': total.value,
    'phone': stuPhone
  }
  $http.put("http://127.0.0.1:8000/update/balance",
    data
  ).then(res=>{

  }).catch(error=>{

  })
}
const increaseQuantity = (food) => {
  food.quantity++;
  calculateTotalPrice();
};

const decreaseQuantity = (food) => {
  if (food.quantity > 0) {
    food.quantity--;
    calculateTotalPrice();
  }
};
import {
  CirclePlusFilled,
  RemoveFilled,
} from '@element-plus/icons-vue';
import {onMounted, ref, inject, watch, onBeforeUnmount} from "vue";

import {useRoute, useRouter} from "vue-router";


const shop = ref({});
const $http = inject('$axios');
const route = useRoute();
// 创建响应式变量
const shopNum = route.query.shopNum;
const result = ref({})
// 定义一个响应式的变量，用于存储定时器的 ID

function getShopInfo() {
  $http.get("http://127.0.0.1:8000/get/shop?shopNum=" + shopNum)
      .then(res => {
        shop.value = res.data;
        result.value = shop;
      })
      .catch(error => {
        console.error('Failed to fetch shop information:', error);
      });
}


onMounted(async () => {
  await getShopInfo();
  await getFoods();
  // timerInterval = setInterval(getFoods, 1000); // 10毫秒等于0.01秒
});
// 在组件卸载前停止调用函数，防止内存泄漏
// onBeforeUnmount(() => {
//   clearInterval(timerInterval);
// });
// let timerInterval;


const foodList = ref([])
async function getFoods() {
  try {
    const response = await $http.get('http://127.0.0.1:8000/show/foods?shopNum=' + shopNum);
    foodList.value = response.data.map(food => ({ ...food, quantity: 0 }));
  } catch (error) {

  }
}






const total = ref(0)
const calculateTotalPrice = () => {
  total.value = foodList.value.reduce((acc, food) => acc + (food.price * food.quantity), 0);
};

const dialogTableVisible = ref(false)
const foods = ref([])
function getOrder(){
  foods.value = foodList.value.filter(food=> food.quantity !== 0)
}
function calculateSubtotal(row) {
  return row.quantity * row.price;
}
const router = useRouter()
const stuPhone = route.query.stuPhone
const address1 = route.query.address1
const balance = route.query.balance
function jump(){
  router.push({path: '/2/main',query:{stuPhone: stuPhone}})
}


const note = ref('')
async function addOrder(){
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 2024
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 04
  const day = String(currentDate.getDate()).padStart(2, '0'); // 10

  const orderNum = `${year}${month}${day}${String(shop.value.sale).padStart(4, '0')}`;
  const order = {
    'orderNum': orderNum,
    'shopNum': shopNum,
    'shopName': shop.value.name,
    'shopPhone': shop.value.phoneNum,
    'address0': shop.value.address,
    'address1': address1,
    'stuPhone': stuPhone,
    'note': note.value,
    'total': total.value,
    'balance': balance,
  }
  $http.post("http://127.0.0.1:8000/add/order",order).then(res=>{
    if(res.data){
      addSale();
      addFoodsOfOrder(orderNum);
      updateBalance();
      jump()
    }else {
      dialogTableVisible.value = false
    }
  }).catch(error=>{

  })
}

async function addSale(){
  $http.put("http://127.0.0.1:8000/add/sale?shopNum="+shopNum).then(res=>{
    if(res.data){
    }else {

    }
  }).catch(error=>{

  })
}

async function addFoodsOfOrder(orderNum){
  const data = {
    'foods': foods.value,
    'orderNum': orderNum
  }
  $http.post("http://127.0.0.1:8000/add/foods",
    data
  ).then(res=>{

  }).catch(error=>{

  })
}
</script>



<style scoped>

.footer {
  position: fixed;
  bottom: 0;
  width: 99vw;
  height: 10vh;
  position: fixed;
  background-color: white;
  opacity: 1;
  z-index: 20;
}

.container {
  display: flex;
}


</style>
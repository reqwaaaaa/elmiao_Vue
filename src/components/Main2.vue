<template>
  <div class="common-layout" v-if="stu.phone">
    <el-container>
      <div v-if="area === 0">
        <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
      >
        <el-menu-item index="0">
          <div style="display: flex; align-items: center;">
            <div v-if="!sign">
              <el-button type="primary" style="height: 6vh;width: 6vw;margin-right: 2vw;font-size: 3vh;margin-left: 0" @click="sign=true;getShops()">返回</el-button>
            </div>

            <img
                style="width: 3vw; margin-right: 5px;"
                src="@/static/elm.png"
                alt="Element logo"
            />
            <span style="font-size: 2vw;color: 	#00BBFF;margin-left: 6vw">饿了么</span>
          </div>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">
          <el-input v-model="searchText" placeholder="请输入搜索关键字"  clearable style="width: 20vw;height: 5vh;font-size: larger;" @input="search()"></el-input>
        </el-menu-item>
          <el-icon style="font-size: 5vh"><Location /></el-icon>
        <el-sub-menu index="2">
          <template #title >
            <h2>{{address}}</h2>
          </template>
          <el-menu-item index="2-1" @click="select('北都大学西苑')" >
            <h3>北都大学西苑</h3>
          </el-menu-item>
          <el-menu-item index="2-2" @click="select('北都大学东苑')">
            <h3>北都大学东苑</h3>
          </el-menu-item>
          <el-menu-item index="2-3" @click="select('北都大学南苑')">
            <h3>北都大学南苑</h3>
          </el-menu-item>
          <el-menu-item index="2-4" @click="select('北都大学华苑')">
            <h3>北都大学华苑</h3>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      </el-header>


        <el-main>
          <div v-if="sign">
            <el-row :gutter="20" style="margin: auto">
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(1)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/breakfast.png" alt="图片加载失败" style="height: 16vh">
                  <h2>早餐</h2>
                </div></el-col>
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(2)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/chicken.png" alt="图片加载失败" style="height: 16vh">
                  <h2>汉堡炸鸡</h2>
                </div>
              </el-col>
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(3)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/drinks.png" alt="图片加载失败" style="height: 16vh">
                  <h2>奶茶饮料</h2>
                </div>
              </el-col>
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(4)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/congee.png" alt="图片加载失败" style="height: 16vh">
                  <h2>包子粥铺</h2>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: auto">
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(5)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/malatang.png" alt="图片加载失败" style="height: 16vh">
                  <h2>麻辣烫冒菜</h2>
                </div></el-col>
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(6)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/fruits.png" alt="图片加载失败" style="height: 16vh">
                  <h2>水果捞</h2>
                </div>
              </el-col>
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(7)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/pjsk.png" alt="图片加载失败" style="height: 16vh">
                  <h2>啤酒烧烤</h2>
                </div>
              </el-col>
              <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="checkShops(8)">
                <div class="grid-content ep-bg-purple">
                  <img src="@/static/noodles.png" alt="图片加载失败" style="height: 16vh">
                  <h2>粉面</h2>
                </div>
              </el-col>
            </el-row>
            <div style="display: flex; align-items: center; width: 80vw; text-align: left; height: 20vh;">
              <el-icon style="font-size: 5vh"><BellFilled /></el-icon>
              <div style="text-align: center; float: none;">
                <h1>通知信息:{{notice}}</h1>
              </div>
            </div>
          </div>


        <div v-for="shop in shopList">
          <el-card style="width: 95vw;margin-top: 2vh;height: 36vh;margin-bottom: 10vh" @click="shopNum = shop.shopNum;jump()">
            <div style="height: 35vh;margin-left: 0;width: 25vw;float: left">
            <img :src="shop.img" alt="图片加载失败" style="height: 35vh;width: 25vw;">
            </div>

            <div style="margin-left: 20vw">
              <div style="margin-left: 36vw;font-size: 5vh;">{{shop.name}}</div>
              <div style="margin-left: 32vw;font-size: 3vh;">店铺地址: {{shop.address}}</div>
            </div>



            <div style="font-size: 3vh;font-family: 'Agency FB';margin-top: 5vh">
              <span style="margin-left: 30vw;color: gold">起送价25</span>
              <span style="color: red;font-size: large;margin-left: 3vw"> 免配送费以及打包费</span>
            </div>
          </el-card>
        </div>

      </el-main>

      </div>


      <div v-else-if="area === 1">
        <el-scrollbar style="margin-bottom: 13vh">
          <div class="scrollbar-flex-content">
            <div class="card-container" v-for="order in orders">
              <el-card v-if="!order.status" style="max-width: 480px;margin-right: 2vw;margin-left: 1vw"  :key="order.orderNum">
                <template #header>
                  <div class="card-header">
                    <h1 style="color: red">订单未完成</h1>
                    <span>预计配送时间59分钟</span>
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
                </template>
              </el-card>
            </div>
          </div>
        </el-scrollbar>


      </div>

      <div v-else-if="area === 2">
        <el-scrollbar style="margin-bottom: 13vh">
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
                <el-button type="primary" @click="dialogVisible3 = true ;shopNumEval = order.shopNum">点击评价</el-button>
              </el-card>

            </div>
          </div>
        </el-scrollbar>
      </div>

      <div v-else-if="area === 3" >
        <el-descriptions
            title="我的资料"
            direction="vertical"
            :column="4"
            size="large"
            border
        >
          <el-descriptions-item label="账号">
            <span style="font-size: 2vh">{{stu.account}}</span>
          </el-descriptions-item>
          <el-descriptions-item label="联系电话">
            <span style="font-size: 2vh">{{stu.phone}}</span>
          </el-descriptions-item>
          <el-descriptions-item label="默认配送地址" :span="2" >
            <span style="font-size: 2vh">{{stu.address}}</span>
          </el-descriptions-item>
          <el-descriptions-item label="余额">
            <el-tag size="large" style="font-size: 3vh;color: gold">{{stu.balance}}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <div style="text-align: center">
          <el-button type="primary" style="height: 8vh;font-size: 5vh" @click="dialogVisible2=true">点击修改</el-button>
        </div>

      </div>

      <el-footer class="footer" style="border-top: solid 0.6vh lightskyblue; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 9999;background-color: white;height: 12vh">
        <div>
          <el-row :gutter="24" style="margin: auto">
            <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="updateArea(0)">
              <div class="grid-content ep-bg-purple">
                <el-icon style="font-size: 3.6vw"><HomeFilled /></el-icon>
                <div style="font-size: 1.2vw">首页</div>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="updateArea(1);getOrders()">
              <div class="grid-content ep-bg-purple">
                <el-icon style="font-size: 3.6vw"><Document /></el-icon>
                <div style="font-size: 1.2vw">待处理订单</div>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="updateArea(2);getOrders()">
              <div class="grid-content ep-bg-purple">
                <el-icon style="font-size: 3.6vw"><Checked /></el-icon>
                <div style="font-size: 1.2vw">历史订单</div>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: center;font-family: 宋体"  @click="updateArea(3)">
              <div class="grid-content ep-bg-purple">
                <el-icon style="font-size: 3.6vw"><User /></el-icon>

                <div style="font-size: 1.2vw">我的</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
  </div>

  <div v-if="!stu.phone" style="display: flex; justify-content: center;">
    <el-button type="primary" style="height: 5vh" @click="dialogVisible = true">点击注册</el-button>
  </div>


  <el-dialog v-model="dialogVisible" title="新用户注册" width="500" draggable>
    <el-form
        ref="form"
        style="max-width: 600px;margin: auto;background-color: white;"
        label-width="auto"
        :label-position="labelPosition"
        :size="size"
    >
      <el-form-item label="账户名">
        <el-input v-model="account" />
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="password" />
      </el-form-item>

      <el-form-item label="默认配送地址">
        <el-input v-model="address8" />
      </el-form-item>

      <el-form-item label="余额">
        <el-input v-model="balance" />
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addStu()">
           注册
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="用户信息修改" width="500" draggable>
    <el-form
        ref="form"
        style="max-width: 600px;margin: auto;background-color: white;"
        label-width="auto"
        :label-position="labelPosition"
        :size="size"
    >
      <el-form-item label="新账户名">
        <el-input v-model="stu.account" />
      </el-form-item>


      <el-form-item label="新默认配送地址">
        <el-input v-model="stu.address" />
      </el-form-item>

      <el-form-item label="新余额">
        <el-input v-model="stu.balance" />
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateStuInfo();dialogVisible2 = false;">
          确认修改
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible3" title="新增商品" width="500" draggable>
    <div style="max-width: 600px;margin: auto;background-color: white;
      height: 19vh;
" >

      <el-upload
          class="upload-demo"
          drag
          action="http://127.0.0.1:8000/api/upload/"
          multiple
          :on-success="handleUploadSuccess"
          :limit="1"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽图片文件到此处或者   <em style="color: lightskyblue">  点击浏览文件夹</em>
        </div>
      </el-upload>

    </div>
    <br>
    <el-form
        ref="form"
        style="max-width: 600px;margin: auto;background-color: white;"
        label-width="auto"
        :label-position="labelPosition"
        :size="size"
    >
      <el-form-item label="请输入评价" >
        <el-input v-model="msg" />
      </el-form-item>

      <el-form-item label="评分">
        <el-rate v-model="value2" :colors="colors"  />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addEval();dialogVisible3 = false">提交评价</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</template>

<script lang="ts" setup>
const shopNumEval = ref('')
const value2 = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
const msg = ref('')
const dialogVisible3 = ref(false)
const img = ref('')
const handleUploadSuccess = (response) => {
  // 处理上传成功后的逻辑，response 参数即为后端返回的数据
  img.value = response.img
};
async function addEval(){
  const data = {
    'shopNum': shopNumEval.value,
    'img': img.value,
    'msg': msg.value,
    'starNum': value2.value
  }
  $http.post("http://127.0.0.1:8000/add/eval",
    data
  ).then(res=>{

  }).catch(error=>{

  })
}

async function getAllFitShops(check){
  $http.get("http://127.0.0.1:8000/check/shops?main="+check).then(res=>{
    shopList.value = res.data
  }).catch(error=>{
  })
}

function checkShops(check) {
  sign.value = false
  getAllFitShops(check);
}



const stu = ref({})
async function getInfo(){
  $http.get("http://127.0.0.1:8000/get/stu/info?phoneNum="+stuPhone).then(res=>{
    stu.value = res.data;
    address.value = res.data.address
  }).catch(error=>{

  })
}


const dialogVisible2 = ref(false)

async function updateStuInfo(){
  const data =  {
    'phone': stuPhone,
    'balance': stu.value.balance,
    'account': stu.value.account,
    'address': stu.value.address
  }
  $http.put("http://127.0.0.1:8000/update/stu/info",
    data
  )
}

const sign = ref(true)
const infos = ref([]);

async function getAllInfo() {
  try {
    const res = await $http.get("http://127.0.0.1:8000/get/all/shop/info");
    infos.value = res.data;
  } catch (error) {
    console.error("Error fetching all shop info:", error);
  }
}

async function search() {
  await getAllInfo(); // 等待获取所有商店信息完成

  const searchTextLowerCase = searchText.value.toLowerCase();
  if (!searchTextLowerCase) {
    sign.value = true;
    shopList.value = infos.value;
    return; // 空搜索文本，直接返回原始数据
  }

  sign.value = false;
  shopList.value = infos.value.filter(info =>
      isMatch(info) || info.foods.some(food => isMatch(food))
  );

  function isMatch(obj) {
    return Object.values(obj).some(val =>
        String(val).toLowerCase().includes(searchTextLowerCase)
    );
  }
}



const notice = ref('')
async function getNotice(){
  $http.get("http://127.0.0.1:8000/get/notice").then(res=>{
    notice.value = res.data.msg
  })
}
const account = ref('')
const password = ref('')
const address8 = ref('')
const balance = ref(0)
async function addStu(){
  const data = {
    'balance': balance.value,
    'account': account.value,
    'address': address8.value,
    'password': password.value,
    'phone': stuPhone
  }
  $http.post("http://127.0.0.1:8000/new/stu",
    data
  ).then(res=>{
    getShops();
    getInfo();
    getNotice();
  }).catch(error=>{

  })
}

import {BellFilled, Document, HomeFilled, Location, Checked, User, UploadFilled} from '@element-plus/icons-vue';
import {inject, onMounted, provide, ref} from 'vue'
import { ElCard, ElNotification, ElTable, ElTableColumn} from "element-plus";
const orders = ref([])
const dialogVisible = ref(false);
const size = ref('large');
const labelPosition = ref('top');
async function getOrders(){
  $http.get("http://127.0.0.1:8000/get/orders/by/phone?phone="+stuPhone).then(res=>{
    orders.value = res.data
  }).catch(error=>{

  })
}

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const searchText = ref('')


const address = ref('')
function select(result){
  address.value = result
}
provide('address',address)


const $http = inject('$axios')
const shopList = ref([])

async function getShops(){
  $http.get("http://127.0.0.1:8000/show/shops").then(res=>{
    shopList.value = res.data
  }).catch(error=>{

  })
}



onMounted(()=>{
  getShops();
  getInfo();
  getNotice();
})

const area = ref(0)
function updateArea(num){
  area.value = num;
}

import {useRoute, useRouter} from 'vue-router' // 引入 useRouter

const router = useRouter() // 使用 useRouter 获取 router 实例
const shopNum = ref('')
function jump() {
  router.push({ path: '/2/office',query:{ shopNum: shopNum.value,stuPhone: stuPhone,address1: address.value,balance: stu.value.balance}});
}
const route = useRoute()
const stuPhone = route.query.stuPhone


</script>

<style>
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


.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
}

.flex-grow {
  flex-grow: 1;
}

el-row {
  margin-bottom: 20px;
}
el-row:last-child {
  margin-bottom: 0;
}
el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

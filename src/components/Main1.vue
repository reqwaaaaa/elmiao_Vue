<template>
  <el-row class="tac">
    <el-col :span="6">
      <div class="fixed-component">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Tickets/>
              </el-icon>
              <h2>订单管理</h2>
            </template>
            <el-menu-item-group title="订单">
              <el-menu-item index="1-1" style="font-size: large" @click="updateActiveItem('1-1');getOrders()">
                <el-icon>
                  <Document/>
                </el-icon>
                待处理订单
              </el-menu-item>
              <el-menu-item index="1-2" style="font-size: large" @click="updateActiveItem('1-2');getOrders()">
                <el-icon>
                  <Checked/>
                </el-icon>
                历史订单
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Food/>
              </el-icon>
              <h2>菜品管理</h2>
            </template>
            <el-menu-item-group title="菜品">
              <el-menu-item index="2-1" style="font-size: large" @click="dialogVisible1 = true;">
                <el-icon>
                  <CirclePlusFilled/>
                </el-icon>
                新增产品
              </el-menu-item>
              <el-menu-item index="2-2" style="font-size: large" @click="updateActiveItem('2-2');getFoods()">
                <el-icon>
                  <WarnTriangleFilled/>
                </el-icon>
                下架与售罄设置
              </el-menu-item>

            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <BellFilled/>
              </el-icon>
              <h2>数据统计</h2>
            </template>
            <el-menu-item-group title="数据">
              <el-menu-item index="3-1" style="font-size: large"
                            @click="updateActiveItem('3-1');getOrders();getAllDayTotal()">
                <el-icon>
                  <Money/>
                </el-icon>
                营业额统计
              </el-menu-item>
              <el-menu-item index="3-2" style="font-size: large" @click="updateActiveItem('3-2');getEval()">
                <el-icon>
                  <Comment/>
                </el-icon>
                顾客评价
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-menu-item index="4" @click="dialogVisible = true;getShop()">
            <el-icon>
              <EditPen/>
            </el-icon>
            <h3>修改商家信息</h3>
          </el-menu-item>

          <el-menu-item index="5" @click="dialogVisible2 = true;">
            <el-icon>
              <EditPen/>
            </el-icon>
            <h3>添加或修改商铺头像</h3>
          </el-menu-item>

        </el-menu>
      </div>
    </el-col>


    <el-col :span="18" style="background-color: whitesmoke">
      <div v-if="activeItem === '0'">
        <img src="/src/static/img.png" alt="" class="photo">
      </div>
      <div v-else-if="activeItem === '1-1'">
        <!-- Table for menu item 1-2 -->
        <orders0/>
        <!-- Table content -->
      </div>

      <div v-else-if="activeItem === '1-2'">
        <!-- Table for menu item 1-2 -->
        <orders1/>
        <!-- Table content -->
      </div>

      <div v-else-if="activeItem === '2-2'">
        <!-- Table for menu item 2-2 -->
        <manager-food/>
        <!-- Table content -->
      </div>

      <div v-else-if="activeItem === '2'">
        <!-- Table for menu item 1-2 -->

        <!-- Table content -->
      </div>

      <div v-else-if="activeItem === '3-1'">
        <income/>
      </div>

      <div v-else-if="activeItem === '3-2'">
        <assessment/>
      </div>
      <!-- Add more conditions for other menu items as needed -->
    </el-col>
  </el-row>


  <el-dialog v-model="dialogVisible" title="商家信息修改" width="500" draggable>
    <el-form
        ref="form"
        style="max-width: 600px;margin: auto;border-width: 2px;background-color: white;"
        label-width="auto"
        :label-position="labelPosition"
        :size="size"
    >
      <el-form-item label="店铺名称">
        <el-input v-model="shop.name"/>
      </el-form-item>

      <el-form-item label="店铺负责人联系电话">
        <el-input v-model="shop.phoneNum"/>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="shop.password"/>
      </el-form-item>

      <el-form-item label="法人姓名">
        <el-input v-model="shop.legalPerson"/>
      </el-form-item>

      <el-form-item label="店铺地址">
        <el-input v-model="shop.address"/>
      </el-form-item>

      <el-form-item label="主营部分">
        <el-select v-model="select" placeholder="请选择主营内容" style="width: 16vw">
          <el-option label="早餐" value="1"/>
          <el-option label="汉堡炸鸡" value="2"/>
          <el-option label="奶茶饮料" value="3"/>
          <el-option label="包子粥铺" value="4"/>
          <el-option label="麻辣烫冒菜" value="5"/>
          <el-option label="水果捞" value="6"/>
          <el-option label="啤酒烧烤" value="7"/>
          <el-option label="粉面" value="8"/>
        </el-select>
      </el-form-item>


    </el-form>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;updateInfo();">
          确认修改
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible1" title="新增商品" width="500" draggable>
    <div style="max-width: 600px;margin: auto;background-color: white;
      height: 19vh;
">

      <el-upload
          class="upload-demo"
          drag
          action="http://127.0.0.1:8000/api/upload/"
          multiple
          :on-success="handleUploadSuccess"
          :limit="1"
      >
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">
          拖拽图片文件到此处或者 <em style="color: lightskyblue"> 点击浏览文件夹</em>
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
      <el-form-item label="商品名称">
        <el-input v-model="name"/>
      </el-form-item>

      <el-form-item label="商品详细信息">
        <el-input v-model="explain"/>
      </el-form-item>

      <el-form-item label="商品单价">
        <el-input v-model="price"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addFood();dialogVisible1=false;">新增商品</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>

  <el-dialog
      v-model="dialogVisible2"
      title="添加或修改头像"
      width="500"
      draggable
  >
    <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:8000/update/head/"
        multiple
        :on-success="handleSuccess"
        :limit="1"
        :data="{shopNum: shopNum}"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        拖拽图片文件到此处或者 <em style="color: lightskyblue"> 点击浏览文件夹</em>
      </div>
    </el-upload>

  </el-dialog>


</template>

<script lang="ts" setup>
const select = ref()
const dialogVisible2 = ref(false);

async function updateInfo() {
  if (!select.value) {
    select.value = shop.value.main
  }
  const data = {
    'shopNum': shopNum,
    'name': shop.value.name,
    'phoneNum': shop.value.phoneNum,
    'legalPerson': shop.value.legalPerson,
    'address': shop.value.address,
    'password': shop.value.password,
    'main': select.value,
  }
  $http.put("http://127.0.0.1:8000/update/shopinfo",
      data
  ).then(res => {

  }).catch(error => {

  })
}

async function getShop() {
  try {
    const response = await $http.get("http://127.0.0.1:8000/get/shop?shopNum=" + shopNum);
    // 请求成功，更新 shop 值和 select 值
    shop.value = response.data;
    // select.value = response.data.main;
  } catch (error) {
    // 请求失败，可以在这里处理错误，比如输出错误信息或者进行其他操作
    console.error('Failed to fetch shop information:', error);
  }
}

const handleSuccess = (response: any, file: any, fileList: any) => {
  // 处理上传成功的逻辑

};


const imgSrc = ref('') // 定义一个响应式变量存储图片地址
const explain = ref("")
const name = ref("")
const price = ref(0)


const handleUploadSuccess = (response) => {
  // 处理上传成功后的逻辑，response 参数即为后端返回的数据
  imgSrc.value = response.img
};

async function addFood() {
  const data = {
    explain: explain.value,
    name: name.value,
    price: price.value,
    shopNum: shopNum,
    img: imgSrc.value
  };
  $http.post("http://127.0.0.1:8000/add/food",
      data
  ).then(res => {
    if (res.data) {

      imgSrc.value = ''
      explain.value = ''
      name.value = ''
      price.value = 0
    } else {

    }
  }).catch(error => {

  })

}


const dialogVisible = ref(false)
const size = ref('large')
const labelPosition = ref('top')
const dialogVisible1 = ref(false)


import {ref, provide, inject} from 'vue';
import {useRoute} from 'vue-router';

// 导入需要的图标组件
import {
  WarnTriangleFilled,
  EditPen,
  CirclePlusFilled,
  Document,
  Checked,
  BellFilled,
  Comment,
  Money,
  Food,
  Tickets,
  UploadFilled,

} from '@element-plus/icons-vue';


import ManagerFood from '@/components/managerFood.vue';
import Orders0 from "@/components/orders0.vue";
import Orders1 from "@/components/orders1.vue";
import Assessment from "@/components/assessment.vue";
import Income from "@/components/income.vue";

// 获取路由信息
const route = useRoute();
// 创建响应式变量
const shopNum = route.query.shopNum;
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

// // 提供 foodList 变量给子组件使用
// provide('foodList', foodList);
// 注入 $http
const $http = inject('$axios');
// 处理打开菜单的方法
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// 处理关闭菜单的方法
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// 当前激活项
const activeItem = ref('0');
// 更新当前激活项的方法
const updateActiveItem = (key: string) => {
  activeItem.value = key;
};


const orders = ref([])

async function getOrders() {
  $http.get("http://127.0.0.1:8000/get/orders?shopNum=" + shopNum).then(res => {
    orders.value = res.data
  }).catch(error => {
  })
}

provide('orders', orders)
provide('shopNum', shopNum)

const total = ref(0)

async function getAllDayTotal() {
  try {
    const response = await $http.get('http://127.0.0.1:8000/get/day/total?shopNum=' + shopNum);
    total.value = response.data.total;
  } catch (error) {
  }
}

// 提供 foodList 变量给子组件使用
provide('total', total);

const evs = ref({})

async function getEval() {
  $http.get("http://127.0.0.1:8000/get/evals?shopNum=" + shopNum).then(res => {
    evs.value = res.data
    console.log(evs)
  }).catch(error => {
  })
}

provide('evs', evs)


const shop = ref({})
</script>


<style scoped>
.fixed-component {
  position: fixed;
  /* 其他样式 */
}
</style>
<template>
  <el-row class="tac">
  <el-col :span="6">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"

    >
      <el-sub-menu index="1" >
        <template #title>
          <el-icon><ElemeFilled /></el-icon>
          <h2 @click="updateActiveItem('0')">管理员</h2>
        </template>
        <el-menu-item-group title="操作">
          <el-menu-item index="1-1" @click="updateActiveItem('1-1');getWorkers()"><h2>
            <el-icon><Avatar /></el-icon>
            外卖员管理</h2></el-menu-item>
          <el-menu-item index="1-2" @click="updateActiveItem('1-2');getShops()"><h2>
            <el-icon><Shop /></el-icon>
            商家管理</h2></el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>
      <el-menu-item index="2" @click="updateActiveItem('2')">
        <el-icon><Document /></el-icon>
        <span><h2>平台通知</h2></span>
      </el-menu-item>
    </el-menu>
  </el-col>

  <el-col :span="18" style="background-color: whitesmoke">
    <div v-if="activeItem === '0'">
      <img src="/src/static/img.png" alt="" class="photo">
    </div>
    <div v-else-if="activeItem === '1-1'">
      <!-- Table for menu item 1-2 -->
      <workers/>
      <!-- Table content -->
    </div>

    <div v-else-if="activeItem === '1-2'">
      <!-- Table for menu item 1-2 -->
      <merchants/>
      <!-- Table content -->
    </div>

    <div v-else-if="activeItem === '2'">
      <!-- Table for menu item 1-2 -->
      <msg/>

      <!-- Table content -->
    </div>

    <!-- Add more conditions for other menu items as needed -->
  </el-col>
  </el-row>
</template>

<script lang="ts" setup>



import {ref, inject, provide} from "vue";
import {ElemeFilled,Avatar,Shop} from '@element-plus/icons-vue'
import merchants from '@/components/merchants.vue'
import workers from '@/components/workers.vue'
import msg from '@/components/msg.vue'


import {
  Document
} from '@element-plus/icons-vue'

import Merchants from "@/components/merchants.vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const activeItem = ref('0')
const updateActiveItem = (key: string) => {
  activeItem.value = key
}



const $http = inject("$axios");




</script>


<style>
.el-menu-vertical-demo{
  width: 20vw;
  height: 100vh;
}

.photo{
  width: 100%;
  height: 100vh;
}
</style>
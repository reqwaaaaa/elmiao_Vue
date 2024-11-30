<script setup>

import {inject, ref} from "vue";

const evs = inject('evs')


</script>

<template>

    <el-card v-for="ev in evs" style="margin-bottom: 3vh">
      <template #header>
        <el-rate
            v-model="ev.starNum"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} 分"
            size="large"
        />
      </template>

      <div class="demo-image__lazy">
        <!--      <el-image src="@/static/kfc002.jpg" lazy />-->
        <img :src="ev.img" alt="图片加载失败" style="width: 20vw">
      </div>
      <h1>顾客评价: {{ev.msg}}</h1>
    </el-card>


</template>

<style scoped>

.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}


</style>
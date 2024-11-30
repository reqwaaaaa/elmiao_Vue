<template>
  <el-card style="width: 30vw;margin-left: 15vw">
    <template #header>
      <div style="text-align: center">
        <h2>营业额汇总</h2>
      </div>
    </template>
    <div >
    <el-table :data="orders" style="width: 100%;font-size: larger">
      <el-table-column v-if="orders.length > 0" label="订单号" width="180">
        <template v-slot="{ row }">
          <span v-if="row.status">{{ row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="orders.length > 0" label="小计">
        <template v-slot="{ row }">
          <span v-if="row.status">{{ row.total }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <template #footer>
      <h1>共计:{{total}}元</h1>
    </template>
  </el-card>
</template>

<script setup>
import {computed, inject, ref} from "vue";
import {ElTable, ElTableColumn} from "element-plus";

const orders = inject('orders');

const total = inject('total')

// const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
// const filteredOrders = computed(() => orders.filter(order => today in order.data));
</script>

<style scoped>
.card-container{
  max-width: 36vw;
  margin: auto;
}


</style>
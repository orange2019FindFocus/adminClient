<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>焦点商城数据管理</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/mall/goods">商品列表</v-btn>
      <v-btn flat to="/mall/category">分类管理</v-btn>
      <v-btn flat to="/mall/payment">账单记录</v-btn>
      <v-btn flat to="/mall/orderItems">评价记录</v-btn>
      <v-btn flat to="/mall/order/afters">售后申请</v-btn>
      <v-btn flat to="/mall/order/export">导出订单</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {};
</script>

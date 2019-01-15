<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>用户管理</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/user/dailySign">VIP充值记录</v-btn>
      <v-btn flat to="/user/dailySign">签到记录</v-btn>
      <v-btn flat to="/user/shareApply">评测人审核</v-btn>
      <v-btn flat to="/user/address">地址管理</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {};
</script>

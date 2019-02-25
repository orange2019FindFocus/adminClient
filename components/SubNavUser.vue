<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>用户管理</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/user/dailySign">签到</v-btn>
      <v-btn flat to="/user/share">分享</v-btn>
      <v-btn flat to="/user/collection">收藏</v-btn>
      <v-btn flat to="/user/address">地址管理</v-btn>
      <v-btn flat to="/user/apply">品牌申请</v-btn>
      <v-btn flat to="/user/moneyOut">提现申请</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {};
</script>

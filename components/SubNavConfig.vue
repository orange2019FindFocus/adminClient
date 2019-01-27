<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>系统设置</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/config/album">图册</v-btn>
      <v-btn flat to="/config/task">收益任务配置</v-btn>
      <v-btn flat to="/config/notice">系统公告</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {};
</script>

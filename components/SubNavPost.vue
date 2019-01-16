<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>资讯管理</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/posts/update">添加</v-btn>
      <v-btn flat to="/posts/view">阅读</v-btn>
      <v-btn flat to="/posts/like">点赞</v-btn>
      <v-btn flat to="/posts/comment">评论</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="item.router" v-for="(item,i) in navs" :key="i">{{ item.name }}</v-btn>
      <!-- <v-btn flat to="/user/share">分享</v-btn>
      <v-btn flat to="/user/collection">收藏</v-btn>
      <v-btn flat to="/user/address">地址管理</v-btn>
      <v-btn flat to="/user/apply">品牌申请</v-btn>
      <v-btn flat to="/user/moneyOut">提现申请</v-btn> -->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    rules: {
      type: Array,
      default: []
    },
    pid: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      title: '',
      navs:[]
    }
  },
  created(){
    console.log('rules' , this.rules)
    this.rules.forEach(rule => {
      if(rule.id == this.pid){
        console.log('rule' , rule)
        this.title = rule.name
        this.navs = rule.childs || []
      }
    });
  }
};
</script>

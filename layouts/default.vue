<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
      dark
    >
      <v-list v-if="items.length">
        <v-list-tile v-for="(item, i) in items" :to="item.to" :key="i" router exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app dark>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn color="primary" @click="goBack">返回</v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>-->
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer :right="right" v-model="rightDrawer" temporary fixed>
      <v-list>
        <!-- <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>-->
        <v-list-tile @click.native="logout">
          <v-list-tile-action>
            <v-icon light>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>退出</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app dark>
      <span v-html="copyright"></span>
    </v-footer>
  </v-app>
</template>

<script>
import "material-design-icons-iconfont/dist/material-design-icons.css";

export default {
  async created(){
    console.log('page init')
    let ret = await this.$store.dispatch('adminGroupInfo', {})
    let rules = ret.data.rules || []
    rules.forEach(rule => {
      this.items.push({
        icon: rule.icon,
        title: rule.name,
        to: rule.router      
      })
    });
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        // { icon: "apps", title: "首页", to: "/" },
        // { icon: "people", title: "用户管理", to: "/user" },
        // { icon: "rss_feed", title: "资讯管理", to: "/posts" },
        // { icon: "shopping_cart", title: "商城管理", to: "/mall" },
        // { icon: "account_circle", title: '账户管理', to: '/account' },
        // { icon: "settings", title: "系统设置", to: "/config" }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "发现焦点管理后台",
      copyright: "&copy; 2019 橙子网络-聚仁传媒-发现焦点"
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/auth/login");
    },
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  <v-layout row wrap>
    <sub-nav :pid="2" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-subheader>用户列表</v-subheader>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入手机号进行搜索"
            single-line
            hide-details
            @keypress.enter="searchList"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="exportData">导出</v-btn>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.user_id }}</td>
            <td>{{ props.item.mobile }}</td>
            <td>{{ props.item.nickname }}</td>
            <td>{{ dateFormat(props.item.create_time) }}</td>
            <td>{{ props.item.balance }}</td>
            <td>{{ props.item.score }}</td>
            <td>
              <span class="blue--text" v-if="props.item.isVip">是</span>
              <span class="" v-else>否</span>
            </td>
            <td>{{ props.item.alipay }}</td>
            <td>{{ props.item.status }}</td>
            <td>{{ props.item.last_signin_time ? dateFormat(props.item.last_signin_time) : '' }}</td>
            <td>{{ props.item.last_signin_ip }}</td>
            <td>
              <v-btn-toggle>
                <v-btn
                  flat
                  small
                  color="blue"
                  :to="{path:'/user/dailySign' , query:{user_id: props.item.id}}"
                >签到</v-btn>
                <v-btn
                  flat
                  small
                  color="blue"
                  :to="{path:'/user/share' , query:{user_id: props.item.id}}"
                >分享</v-btn>
                <v-btn
                  flat
                  small
                  color="blue"
                  :to="{path:'/user/address' , query:{user_id: props.item.id}}"
                >地址</v-btn>
              </v-btn-toggle>
            </td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="page" :length="listPageLength" @input="pageChange"></v-pagination>
          <label for="">
              <input type="text" placeholder="页数" :value="page" ref="pageNum" style="height: 40px;line-height: 40px;padding-left: 10px;width: 100px;vertical-align: bottom;" @keypress.enter="pageChangeNum">
          </label>
          
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../components/SubNav";
import dateUtils from "./../../utils/date_utils.js";
export default {
  components: {
    SubNav
  },
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("userListGet", { page: page });
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", value: "user_id", sortable: false },
          { text: "手机号", value: "mobile", sortable: false },
          { text: "用户昵称", value: "nickname", sortable: false },
          { text: "注册时间", value: "create_time", sortable: false },
          { text: "余额", value: false, sortable: false },
          { text: "积分", value: false, sortable: false },
          { text: "VIP", value: false, sortable: false },
          { text: '支付宝账号', value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "上次使用时间", value: false, sortable: false },
          { text: "上次使用ip", value: false, sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1
    };
  },
  computed: {
    listDatas() {
      return this.$store.state.user.list;
    },
    listCount() {
      return this.$store.state.user.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.user.count / this.$store.state.user.limit
      );
    }
  },
  methods: {
    ...dateUtils,
    pageChangeNum(){
      let page = this.$refs.pageNum.value
      this.pageChange(parseInt(page))
    },
    pageChange(page) {
      console.log("pageChange：", page);
      this.page = page;
      // this.$route.query.page = page;
      // this.$router.push({ path: "/user", query: { page: page } });
      // this.$store.dispatch("userListGet", { page: page });
      this.getList();
    },
    searchList() {
      this.page = 1;
      this.getList();
    },
    getList() {
      let search = this.search;
      let page = this.page;
      // this.page = 1;

      let body = { page: page };
      if (search) body.search = search;

      this.$router.push({ path: "/user", query: body });
      this.$store.dispatch("userListGet", body);
    },
    async exportData(){
      let ret = await this.$store.dispatch('userExport')
      if (ret.code == 0) {
        let url = ret.data.url;
        window.open(url);
      }
    }
  }
};
</script>

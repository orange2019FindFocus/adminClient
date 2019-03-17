<template>
  <v-layout row wrap>
    <sub-nav :pid="4" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-alert
      v-model="alert.show"
      dismissible
      :type="alert.type"
    >{{ alert.text}}
    </v-alert>
      <v-card color="light">
        <v-card-title>用户提现申请记录
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入手机号进行搜索"
            single-line
            hide-details
            @keypress.enter="searchList"
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.user_info.nickname }}</td>
            <td>{{ props.item.user_info.mobile }}</td>
            <td class="red--text">{{ props.item.balance }}</td>
            <td >{{ dateFormat(props.item.create_time) }}</td>
            <td >
              <span v-if="props.item.status == 0" class="red--text">未审核</span>
              <span v-if="props.item.status == 1">已提取</span>
            </td>
            <td class="pt-3">
              <v-btn color="error" @click="itemUpdate(props.item)" v-if="props.item.status == 0">确认</v-btn>
            </td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="page" :length="listPageLength" @input="pageChange"></v-pagination>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../components/SubNav";
import dateUtils from "./../../utils/date_utils.js";
import { setTimeout } from 'timers';
export default {
  components: {
    SubNav
  },
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    let userId = route.query.user_id || 0;
    store.dispatch("userTransactionListGet", { page: page, user_id: userId });
  },
  data() {
    return {
      alert: {
        show: false,
        type: 'success',
        text: ''
      },
      search: "",
      table: {
        headers: [
          { text: "ID", value: "id", sortable: false },
          { text: "用户", value: false, sortable: false },
          { text: "", value: false, sortable: false },
          { text: "提现金额", value: false, sortable: false },
          { text: "时间", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1
    };
  },
  computed: {
    userId() {
      return this.$route.query.user_id || 0;
    },
    listDatas() {
      return this.$store.state.userShare.list;
    },
    listCount() {
      return this.$store.state.userShare.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.userShare.count / this.$store.state.userShare.limit
      );
    }
  },
  methods: {
    ...dateUtils,
    pageChange(page) {
      console.log("pageChange：", page);
      this.page = page;
      this.getList();
    },
    searchList() {
      this.page = 1;
      this.getList();
    },
    getList() {
      let search = this.search;
      let page = this.page;
      let userId = this.userId;

      let body = { page: page, user_id: userId };
      if (search) body.search = search;

      this.$router.push({ path: "/user/share", query: body });
      this.$store.dispatch("userTransactionListGet", body);
    },
    async itemUpdate(item) {
      // item[type] = !item[type];
      if(confirm('确认对用户进行的提现申请进行操作？')){
        console.log("userShareInfoUpdate", item);
        let ret = await this.$store.dispatch("userTransactionUpdate", item);
        if(ret.code == 0){
          item.status = 1
          this.alertShow('success' , '操作成功')
        }else {
          this.alertShow('error' , ret.message)
        }
      }else {
        
      }
      
    },
    alertShow(type = 'success' , text = ''){
      this.alert.show = true
      this.alert.type = type
      this.alert.text = text

      setTimeout(() => {
        this.alert.show = false
      }, 3000)
    }
  }
};
</script>

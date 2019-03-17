<template>
  <v-layout row wrap>
    <sub-nav :pid="2" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-card-title>用户签到记录
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入手机号进行搜索"
            single-line
            hide-details
            @keypress="searchList"
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.user_info.nickname }}</td>
            <td>{{ props.item.user_info.mobile }}</td>
            <td>{{ dateFormat(props.item.create_time) }}</td>
            <td>{{ props.item.continues_num }}</td>
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
export default {
  components: {
    SubNav
  },
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    let userId = route.query.user_id || 0;
    store.dispatch("userDailySignListGet", { page: page, user_id: userId });
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", value: "id", sortable: false },
          { text: "用户", value: false, sortable: false },
          { text: "", value: false, sortable: false },
          { text: "日期", value: false, sortable: false },
          { text: "连续天数", value: false, sortable: false }
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
      return this.$store.state.userDailySign.list;
    },
    listCount() {
      return this.$store.state.userDailySign.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.userDailySign.count /
          this.$store.state.userDailySign.limit
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

      this.$router.push({ path: "/user/dailySign", query: body });
      this.$store.dispatch("userDailySignListGet", body);
    }
  }
};
</script>

<template>
  <v-layout row wrap>
    <sub-nav :pid="2" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-card-title>用户地址管理
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
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.mobile }}</td>
            <td>{{ props.item.address + props.item.info }}</td>
            <td>{{ dateFormat(props.item.update_time) }}</td>
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
    store.dispatch("userAddressListGet", { page: page, user_id: userId });
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", value: "id", sortable: false },
          { text: "姓名", value: false, sortable: false },
          { text: "电话", value: false, sortable: false },
          { text: "详细地址", value: false, sortable: false },
          { text: "时间", value: false, sortable: false }
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
      return this.$store.state.userAddress.list;
    },
    listCount() {
      return this.$store.state.userAddress.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.userAddress.count /
          this.$store.state.userAddress.limit
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

      this.$router.push({ path: "/user/address", query: body });
      this.$store.dispatch("userAddressListGet", body);
    }
  }
};
</script>

<template>
  <v-layout row wrap>
    <sub-nav :pid="2" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-card-title>用户分享记录
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
            <td>{{ props.item.uuid }}</td>
            <td>{{ props.item.category }}</td>
            <td>{{ props.item.post ? props.item.post.title : '无' }}</td>
            <td>{{ props.item.goods ? '资讯' : '评测' }}</td>
            <td>{{ props.item.goods ? props.item.goods.title : '无' }}</td>
            <td>{{ props.item.user_info.nickname }}</td>
            <td>{{ props.item.user_info.mobile }}</td>
            <td>{{ dateFormat(props.item.create_time) }}</td>
            <td class="pt-3">
              <v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '禁用' :'正常' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('status' , props.item)"
              ></v-switch>
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
export default {
  components: {
    SubNav
  },
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    let userId = route.query.user_id || 0;
    store.dispatch("userShareListGet", { page: page, user_id: userId });
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", value: "id", sortable: false },
          { text: "分享类型", value: false, sortable: false },
          { text: "文章", value: false, sortable: false },
          { text: "", value: false, sortable: false },
          { text: "商品", value: false, sortable: false },
          { text: "用户", value: false, sortable: false },
          { text: "", value: false, sortable: false },
          { text: "时间", value: false, sortable: false },
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
      this.$store.dispatch("userShareListGet", body);
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      console.log("userShareInfoUpdate", item);
      this.$store.dispatch("userShareInfoUpdate", item);
    }
  }
};
</script>

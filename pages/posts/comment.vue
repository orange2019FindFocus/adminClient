<template>
  <v-layout row wrap>
    <sub-nav :pid="4" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-card-title>文章阅读记录
          <v-spacer></v-spacer>
          <!-- <v-text-field
            v-model="search"
            append-icon="search"
            label="输入文章标题进行搜索"
            single-line
            hide-details
            @keypress="searchList"
          ></v-text-field>-->
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.info }}</td>
            <td>{{ props.item.post.title }}</td>
            <td>{{ props.item.user_info.mobile }}</td>
            <td>{{ props.item.user_info.nickname }}</td>
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
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("postsCommentListGet", {
      page: page
    });
  },
  components: {
    SubNav
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "评论内容", value: false, sortable: false },
          { text: "文章标题标题", value: false, sortable: false },
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
    listDatas() {
      return this.$store.state.postsComment.list;
    },
    listCount() {
      return this.$store.state.postsComment.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.postsComment.count /
          this.$store.state.postsComment.limit
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
      // this.page = 1;

      let body = { page: page };
      if (search) body.search = search;

      this.$router.push({ path: "/posts/comment", query: body });
      this.$store.dispatch("postsCommentListGet", body);
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      console.log("postsCommentUpdate", item);
      this.$store.dispatch("postsCommentUpdate", item);
    }
  }
};
</script>

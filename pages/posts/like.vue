<template>
  <v-layout row wrap>
    <sub-nav :pid="3" :rules="this.$store.state.adminGroupRules" />
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
        <v-data-table :headers="table.headers" :items="likesList" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.post ? props.item.post.title : '【未知文章】' }}</td>
            <td>{{ props.item.user_info.nickname }}</td>
            <td>{{ props.item.user_info.mobile }}</td>
            <td>{{ props.item.ip }}</td>
            <td>{{ dateFormat(props.item.create_time) }}</td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="table.page" :length="listPageLength" @input="pageChange"></v-pagination>
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
    store.dispatch("postsLikeListGet", {
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
          { text: "文章标题", value: false, sortable: false },
          { text: "用户昵称", value: false, sortable: false },
          { text: "用户手机号", value: false, sortable: false},
          { text: "IP地址", value: false, sortable: false },
          { text: "点赞时间", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1
    };
  },
  computed: {
    likesList() {
      return this.$store.state.postsLike.list;
    },
    listCount() {
      return this.$store.state.postsLike.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.postsLike.count / this.$store.state.postsLike.limit
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

      this.$router.push({ path: "/posts/like", query: body });
      this.$store.dispatch("postsLikeListGet", body);
    }
  }
};
</script>

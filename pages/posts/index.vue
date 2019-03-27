<template>
  <v-layout row wrap>
    <sub-nav :pid="3" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-card-title>
          <v-btn-toggle class>
            <v-btn flat small color="primary" @click="typeChange(1)">焦点资讯</v-btn>
            <v-btn flat small color="primary" @click="typeChange(2)">故事&活动</v-btn>
            <v-btn flat small color="primary" @click="typeChange(3)">用户评测</v-btn>
            <v-btn flat small color="primary" @click="typeChange(4)">广告流</v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入文章标题进行搜索"
            single-line
            hide-details
            @keypress.enter="searchList"
          ></v-text-field>
          <!-- <v-btn color="blue" to="/posts/update">添加</v-btn> -->
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ getPostsType(props.item.type) }}
              <span v-if="props.item.category == 'story'">(故事)</span>
              <span v-if="props.item.category == 'activity'">(活动)</span>
            </td>
            <td>{{ props.item.title }}</td>
            <td>{{ dateFormat(props.item.pub_date) }}</td>
            <td>{{ props.item.views }}</td>
            <td class="pt-3">
              <v-switch
                v-model="props.item.recommend"
                :label="props.item.recommend == 0 ? '否' :'是' "
                :color="props.item.recommend == 0 ? 'error' :'blue' "
                @change="itemUpdate('recommend' , props.item)"
              ></v-switch>
            </td>
            <td class="pt-3">
              <div v-if="props.item.status >= 0">
                <v-switch
                  v-model="props.item.status"
                  :label="props.item.status == 0 ? '禁用' :'正常' "
                  :color="props.item.status == 0 ? 'error' :'blue' "
                  @change="itemUpdate('status' , props.item)"
                ></v-switch>
              </div>
              <div v-else class="text--error">已删除</div>
            </td>

            <td>
              <div >
                <v-btn small color="blue" @click="infoModify(props.item)">编辑/详情</v-btn>
                <!-- <v-btn small color="error" @click="itemDeleteDialog(props.item)">删除</v-btn> -->
              </div>
            </td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="page" :length="listPageLength" @input="pageChange"></v-pagination>
        </div>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">确认删除?</v-card-title>

        <v-card-text></v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">取消</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="itemDelete">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import SubNav from "./../../components/SubNav";
import dateUtils from "./../../utils/date_utils.js";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("postsListGet", {
      page: page,
      type: store.state.posts.type
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
          { text: "类型", value: "type", sortable: false },
          { text: "标题", value: "title", sortable: false },
          { text: "发布时间", value: "post_date", sortable: false },
          { text: "阅读次数", value: "views", sortable: false },
          { text: "是否推荐", value: "views", sortable: false },
          { text: "状态", value: "status", sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1,
      dialog: false,
      deleleItem: {}
    };
  },
  computed: {
    listType() {
      return this.$store.state.posts.type;
    },
    listDatas() {
      return this.$store.state.posts.list;
    },
    listCount() {
      return this.$store.state.posts.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.posts.count / this.$store.state.posts.limit
      );
    }
  },
  methods: {
    ...dateUtils,
    getPostsType(type = 1) {
      return ["", "头条新闻", "故事&活动", "用户评测", "广告流"][type];
    },
    typeChange(type) {
      this.$store.state.posts.type = type;
      this.page = 1;
      this.getList();
    },
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

      this.$router.push({ path: "/posts", query: body });
      this.$store.dispatch("postsListGet", body);
    },
    infoModify(item) {
      this.$store.state.posts.info = item;
      this.$router.push({
        path: "/posts/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      item.recommend = item.recommend ? 1 : 0
      console.log("postsItemUpdate", item);
      this.$store.dispatch("postsInfoUpdate", item);
    },
    itemDeleteDialog(item) {
      this.dialog = true;
      this.deleleItem = item;
    },
    async itemDelete() {
      let item = this.deleleItem;
      item.status = -1;
      let ret = await this.$store.dispatch("postsInfoUpdate", item);
      if (ret.code == 0) {
        this.$store.dispatch("postsListGet");
        this.dialog = false;
      }
    }
  },
  created() {
    console.log("page=========", this.$route.query.page);
    // this.page = parseInt(this.$route.query.page);
  }
};
</script>

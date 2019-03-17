<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <!-- <v-subheader></v-subheader> -->
        <v-card-title primary-title>系统公告
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/config/notice/update">添加</v-btn>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td>
              <img :src="props.item.cover" alt height="50">
            </td>
            <td>{{ props.item.info }}</td>
            <td>{{ props.item.push ? '可' : '否' }}</td>
            <td class="pt-3">
              <!-- {{ props.item.status ? '已推送':'未推送' }} -->
              <v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '禁用' :'正常' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('status' , props.item)"
                v-if="props.item.status >= 0"
              ></v-switch>
            </td>
            <td>
              <v-btn small color="blue" @click="infoModify(props.item)">编辑</v-btn>
              <v-btn
                small
                color="error"
                @click="itemSendDialog(props.item)"
                v-if="props.item.status == 0 && props.item.push == 1"
              >发送</v-btn>
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
        <v-card-title class="headline">确认发送?</v-card-title>

        <v-card-text>
          <!-- Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running. -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">取消</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="itemSend">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import SubNav from "./../../../components/SubNav";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("noticeListGet", { page: page });
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
          { text: "标题", value: "title", sortable: false },
          { text: "封面图", value: "cover", sortable: false },
          { text: "详情", value: "info", sortable: false },
          { text: "可否推送", value: "push", sortable: false },
          { text: "状态", value: "status", sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      dialog: false,
      page: parseInt(this.$route.query.page) || 1,
      sendItem: {}
    };
  },
  computed: {
    listDatas() {
      return this.$store.state.notice.list;
    },
    listCount() {
      return this.$store.state.notice.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.notice.count / this.$store.state.notice.limit
      );
    }
  },
  methods: {
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

      this.$router.push({ path: "/config/notice", query: body });
      this.$store.dispatch("noticeListGet", body);
    },
    infoModify(item) {
      this.$store.state.notice.info = item;
      this.$router.push({
        path: "/config/notice/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      console.log("noticeItemUpdate", item);
      this.$store.dispatch("noticeInfoUpdate", item);
    },
    itemSendDialog(item) {
      this.dialog = true;
      this.sendItem = item;
    },
    async itemSend() {
      let item = this.sendItem;

      let ret = await this.$store.dispatch("noticeInfoUpdate", item);
      if (ret.code == 0) {
        item.status = 1;
        this.$store.dispatch("noticeSend", { notice_id: item.id });
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>

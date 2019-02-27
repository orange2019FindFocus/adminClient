<template>
  <v-layout row wrap>
    <nav-sub-mall/>
    <v-flex xs12>
      <v-card>
        <!-- <v-subheader></v-subheader> -->
        <v-card-title primary-title>
          售后申请列表
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.after_no }}</td>
            <td>
              {{ props.item.order.order_no}}
            </td>
            <td>{{ props.item.category }}</td>
            <td>{{ props.item.type }}</td>
            <td >
             <span v-if="props.item.status == 0" class="red--text" >未处理</span>
             <span v-if="props.item.status == 1" >已处理</span>
            </td>
            <td>
              <v-btn color="info" small :to="{path:'/mall/order/afterDetail' , query:{id: props.item.id}}">详情/处理</v-btn>
            </td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination v-model="page" :length="listPageLength" @input="pageChange"></v-pagination>
        </div>
      </v-card>
    </v-flex>
 
  </v-layout>
</template>

<script>
import NavSubMall from "./../../../components/SubNavMall";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("orderAftersGet", { page: page });
  },
  components: {
    NavSubMall
  },

  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", sortable: false, value: false },
          { text: "售后编号", value: false, sortable: false },
          { text: "订单编号", value: false, sortable: false },
          { text: "类型", value: false, sortable: false },
          { text: "原因", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "操作", value: false, sortable: false },
        ]
      },
      dialog: false,
      page: parseInt(this.$route.query.page) || 1,
      sendItem: {}
    };
  },
  computed: {
    listDatas() {
      return this.$store.state.orderAfter.list;
    },
    listCount() {
      return this.$store.state.orderAfter.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.orderAfter.count / this.$store.state.orderAfter.limit
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

      this.$router.push({ path: "/mall/order/afters", query: body });
      this.$store.dispatch("orderAftersGet", body);
    },
    infoModify(item) {
      this.$store.state.notice.info = item;
      this.$router.push({
        path: "/mall/order/afterUpdate",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      console.log("itemUpdate", item);
      this.$store.dispatch("orderAfterUpdate", item);
    },
    itemSendDialog(item) {
      this.dialog = true;
      this.sendItem = item;
    },
    async itemSend() {
      let item = this.sendItem;

      let ret = await this.$store.dispatch("orderAfterUpdate", item);
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

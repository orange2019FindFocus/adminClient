<template>
  <v-layout row wrap>
    <nav-sub-mall/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>商城账单数据
          <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.uuid }}</td>
            <td>{{ props.item.user_info.nickname}} / {{ props.item.user_info.mobile}}</td>
            <td>{{ props.item.pay_type }}</td>
            <td>{{ props.item.pay_method }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.ecard }}</td>
            <td>{{ props.item.balance }}</td>
            <td>{{ props.item.score }}</td>
            <td>
              <v-btn flat small color="primary" v-if="props.item.status == 1">已支付</v-btn>
              <v-btn flat small color="red" v-if="props.item.status == 0">未支付</v-btn>
            </td>
            <td>
              <v-btn
                flat
                small
                color="primary"
                :to="{path:'/mall' , query: {order_ids:props.item.order_ids}}"
              >关联订单</v-btn>
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
import dateUtils from "./../../../utils/date_utils.js";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    let userId = route.query.user_id || 0;
    let status = route.query.status || "";
    let data = { page: page, user_id: userId };
    if (status !== "") {
      data.status = status;
    }
    store.dispatch("mallPaymentListGet", data);
  },
  data() {
    return {
      table: {
        headers: [
          { text: "ID", value: false, sortable: false },
          { text: "用户信息", value: false, sortable: false },
          { text: "支付方式", value: false, sortable: false },
          { text: "支付类别", value: false, sortable: false },
          { text: "在线支付金额", value: false, sortable: false },
          { text: "代金券使用", value: false, sortable: false },
          { text: "余额使用", value: false, sortable: false },
          { text: "积分使用", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1,
      user_id: 0,
      status: ""
    };
  },
  components: {
    NavSubMall
  },
  computed: {
    listDatas() {
      return this.$store.state.mallPayment.list;
    },
    listCount() {
      return this.$store.state.mallPayment.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.mallOrder.count / this.$store.state.mallOrder.limit
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
      let userId = this.$route.query.user_id;
      let status = this.status;
      // this.page = 1;

      let body = { page: page };
      if (search) body.search = search;
      if (userId) body.user_id = userId;
      if (status !== "") body.status = status;

      this.$router.push({ path: "/mall/payment", query: body });
      this.$store.dispatch("mallPaymentListGet", body);
    },
    infoModify(item) {
      this.$store.state.mallPayment.info = item;
      this.$router.push({
        path: "/mall/payment/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      console.log("mallPaymentItemUpdate", item);
      this.$store.dispatch("mallPaymentInfoUpdate", item);
    }
  }
};
</script>

<style>
</style>

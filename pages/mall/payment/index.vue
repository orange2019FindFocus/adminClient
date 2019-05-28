<template>
  <v-layout row wrap>
    <sub-nav :pid="8" :rules="this.$store.state.adminGroupRules"/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>商城账单数据
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入订单号进行搜索"
            single-line
            hide-details
            @keypress="searchList"
          ></v-text-field>
        </v-card-title>

        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.user_info.nickname}} / {{ props.item.user_info.mobile}}</td>
            <td>
              <span v-if="props.item.pay_type == 1">代金券</span>
              <span v-if="props.item.pay_type == 2">账户余额</span>
              <span v-if="props.item.pay_type == 3">
                <span v-if="props.item.pay_method == 'alipay'">支付宝</span>
                <span v-if="props.item.pay_method == 'wxpay'">微信支付</span>
              </span>
            </td>
            <td>
              <span v-if="props.item.pay_type !== 3">
                <span v-if="props.item.pay_method == 'alipay'">支付宝</span>
                <span v-if="props.item.pay_method == 'wxpay'">微信支付</span>
              </span>
            </td>
            <td>{{ parseFloat(props.item.amount + props.item.ecard + props.item.balance).toFixed(2) }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.ecard }}</td>
            <td>{{ props.item.balance }}</td>
            <td>{{ props.item.score }}</td>
            <td>{{ props.item.price_cost }}</td>
            <td>{{ dateFormat(props.item.create_time) }}</td>
            <!-- <td>
              <v-btn flat small color="primary" v-if="props.item.status == 1">已支付</v-btn>
              <v-btn flat small color="red" v-if="props.item.status == 0">未支付</v-btn>
            </td>-->
            <td>
              <v-btn
                flat
                small
                color="primary"
                :to="{path:'/mall/order' , query: {order_ids:props.item.order_ids}}"
              >
                <span v-for="order in props.item.orders">{{order.order_no}} /</span>
              </v-btn>
            </td>
            <td>
              <span v-if="props.item.wxpay_type == 1">APP支付</span>
              <span v-if="props.item.wxpay_type == 2">小程序支付</span>
            </td>
          </template>
        </v-data-table>
        <div class="pt-2 pb-2">
          <v-pagination
            :total-visible="7"
            v-model="page"
            :length="listPageLength"
            @input="pageChange"
          ></v-pagination>
        </div>

        <v-flex xs12 class="pa-2">
          开始时间：
          <input type="date" v-model="startDate">
          结束时间
          <input type="date" v-model="endDate">
          <v-btn small @click="importData">导出</v-btn>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../../components/SubNav";
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
      startDate: "",
      endDate: "",
      search: "",
      table: {
        headers: [
          { text: "ID", value: false, sortable: false },
          { text: "用户信息", value: false, sortable: false },
          { text: "支付方式", value: false, sortable: false },
          { text: "在线支付补齐", value: false, sortable: false },
          { text: "账单总金额", value: false, sortable: false },
          { text: "在线支付金额", value: false, sortable: false },
          { text: "代金券使用", value: false, sortable: false },
          { text: "余额使用", value: false, sortable: false },
          { text: "积分使用", value: false, sortable: false },
          { text: "总成本", value: false, sortable: false },
          { text: "支付时间", value: false, sortable: false },
          { text: "订单号", value: false, sortable: false },
          { text: "备注", value: false, sortable: false },
        ]
      },
      page: parseInt(this.$route.query.page) || 1,
      user_id: 0,
      status: ""
    };
  },
  components: {
    SubNav
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
        this.$store.state.mallPayment.count /
          this.$store.state.mallPayment.limit
      );
    }
  },
  methods: {
    ...dateUtils,
    async importData() {
      console.log(this.startDate);
      console.log(this.endDate);
      if (this.startDate && this.endDate) {
        if (this.startDate > this.endDate) {
          alert("请选择正确的起始日期");
          return;
        }
      }

      let ret = await this.$store.dispatch("paymentExportData", {
        startDate: this.startDate,
        endDate: this.endDate
      });
      if (ret.code == 0) {
        let url = ret.data.url;
        window.open(url);
      }
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

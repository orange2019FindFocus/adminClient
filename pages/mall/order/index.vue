<template>
  <v-layout row wrap>
    <sub-nav :pid="5" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-subheader>
          <v-btn-toggle>
            <v-btn :color="(type == 1) ? 'primary' : ''" @click="chooseOrderType(1)">自营</v-btn>
            <v-btn :color="(type == 2) ? 'primary' : ''" @click="chooseOrderType(2)">京东</v-btn>
          </v-btn-toggle>
        </v-subheader>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入订单号进行搜索"
            single-line
            hide-details
            @keypress="searchList"
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-btn-toggle class>
            <v-btn
              flat
              color="primary"
              @click="statusChange(i)"
              v-for="(item,i) in orderStatus"
              :key="i"
              v-html="item"
            ></v-btn>
          </v-btn-toggle>
          <!-- <v-btn color="blue" to="/mall/goods/update">添加商品</v-btn> -->
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.order_no }}</td>
            <td>{{ props.item.user_info.nickname}} / {{ props.item.user_info.mobile}}</td>
            <td>{{ dateFormat(props.item.create_time)}}</td>
            <td>

              <span v-if="props.item.order_type == 0">VIP充值</span>
              <span v-if="props.item.order_type == 1">自营</span>
              <span v-if="props.item.order_type == 2">京东</span>
            </td>
            <td>
              <div v-for="item in props.item.goods_items" :key="item.id">
                <v-btn flat small color="blue">
                  <v-img :src="item.cover" height="30" width="30"></v-img>
                  &nbsp;&nbsp;{{ item.title }}
                </v-btn>
                x {{item.num}}
              </div>
            </td>
            <td>{{ props.item.vip ? (props.item.total_vip + props.item.score_vip).toFixed(2): (props.item.total + props.item.score).toFixed(2) }}</td>
            <td>{{ props.item.vip ? props.item.score_vip : props.item.score}}</td>
            <td>{{ props.item.vip ? '是' : '否' }}</td>
            <td v-html="getStatusText(props.item.status)"></td>
            <td>
              <v-btn-toggle class>
                <v-btn
                  color="primary"
                  small
                  :to="{path:'/mall/order/info' , query: {id: props.item.id }}"
                >详情</v-btn>
              </v-btn-toggle>
            </td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="page" :length="listPageLength" @input="pageChange" ></v-pagination>
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
    let orderIds = route.query.order_ids || "";
    let type = route.query.type || "";
    let data = { page: page, user_id: userId };
    if (orderIds) {
      data.order_ids = orderIds;
    }

    if (status !== "") {
      data.status = status;
    }
    if (type !== "") {
      data.type = type;
    }
    store.dispatch("mallOrderListGet", data);
  },
  components: {
    SubNav
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      date: new Date().toISOString().substr(0, 10),
      search: "",
      table: {
        headers: [
          { text: "订单号", sortable: false, value: false },
          { text: "用户信息", sortable: false, value: false },
          { text: "时间", value: false, sortable: false },
          { text: "类型", sortable: false, value: false },
          { text: "商品", value: false, sortable: false },
          { text: "金额", value: false, sortable: false },
          { text: "积分", value: false, sortable: false },
          { text: "vip", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1,
      user_id: 0,
      orderStatus: {
        "-2": `<span>已退款</span>`,
        "-1": `<span>已取消</span>`,
        "0": `<span class="red--text">待付款</span>`,
        "1": `<span class="orange--text">待发货</span>`,
        "2": `<span class="blue--text">待收货</span>`,
        "9": `<span class="green--text">已完成</span>`
        // "99": "已取消"
      },
      status: "",
      type: ""
    };
  },
  computed: {
    listDatas() {
      return this.$store.state.mallOrder.list;
    },
    listCount() {
      return this.$store.state.mallOrder.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.mallOrder.count / this.$store.state.mallOrder.limit
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

      let ret = await this.$store.dispatch("orderExportData", {
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
    chooseOrderType(type) {
      this.type = type;
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
      body.type = this.type;

      this.$router.push({ path: "/mall/order", query: body });
      this.$store.dispatch("mallOrderListGet", body);
    },
    getStatusText(status = 0) {
      // let statusText = {
      //   "-1": "已取消",
      //   "0": "待付款",
      //   "1": "代发货",
      //   "2": "待收货",
      //   "9": "已完成"
      //   // "99": "已取消"
      // };
      return this.orderStatus[status];
    },
    statusChange(status) {
      this.status = status;
      this.getList();
    }
  }
};
</script>

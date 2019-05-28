<template>
  <v-layout row wrap>
    <v-flex xs12 md12>
      <div class="display-1" style="margin-bottom: 20px;">{{ isVip ? "订单详情(VIP)" : "订单详情"}}</div>
    </v-flex>
    <v-flex
      v-for="(item, index) in textFieldsConfig"
      v-bind:key="index"
      xs12
      sm5
      style="margin: 10px 10px;"
    >
      <v-text-field
        v-if="item.editable"
        :label="item.label"
        v-model="item.data.value"
        :append-icon="item.icons[item.editable ? 1 : 0]"
        @click:append="onTextFieldClick(item)"
      ></v-text-field>
      <v-text-field
        v-else
        :label="item.label"
        v-model="item.data.value"
        :append-icon="item.icons[item.editable ? 1 : 0]"
        readonly
        @click:append="onTextFieldClick(item)"
      ></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-card-title>订单商品列表
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="goodsList.table.header"
        :items="goodsItems"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>
            <v-img
              :src="props.item.cover"
              style="height: 50px; width: 50px;"
              class="grey lighten-2"
            ></v-img>
          </td>
          <td>{{ props.item.title }}</td>
          <td>{{ calculatePrice(props.item) }}</td>
          <td>{{ props.item.num }}</td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 v-if="orderItems && orderItems.length">
      <v-card-title>订单返利信息
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="orderItemList.table.header"
        :items="orderItems"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.goods_id }}</td>
          <td>
            <v-img
              :src="props.item.goods_cover"
              style="height: 50px; width: 50px;"
              class="grey lighten-2"
            ></v-img>
          </td>
          <td>{{ props.item.goods_title }}</td>
          <td>{{ props.item.num_rabate }}</td>
          <td>{{ props.item.num_rabate_share }}</td>
          <td>{{ props.item.num_rabate_post}}</td>
          <td>{{ props.item.num_rabate_invite }}</td>
          <td>
            <span v-if="props.item.status == 1">已结算</span>
            <span v-if="props.item.status == 0" class="red--text">未结算</span>
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12>
      <v-card-title>发票信息
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="invoice.table.header"
        :items="invoiceItems"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.category == 1 ? '普通增值税发票' : 'Unknown'}}</td>
          <td>{{ props.item.type == 1 ? '个人' : '公司'}}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.company_title }}</td>
          <td>{{ props.item.company_no }}</td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 v-if="this.info.status >= 1" style="margin: 20px 0">
      <!-- when status === 1 (customer has paied) -->
      <v-card color="light" style="padding: 20px;" v-if="this.info.order_type == 1">
        <v-card-title>{{this.info.status === 1 ? '发货操作' : '物流信息'}}</v-card-title>
        <v-text-field v-model="expressData.company" label="物流公司" :readonly="this.info.status !== 1"></v-text-field>
        <v-text-field
          v-model="expressData.expressNo"
          label="订单号"
          :readonly="this.info.status !== 1"
        ></v-text-field>
        <v-btn v-if="this.info.status === 1" @click="dispatchGoods(expressData)">提交</v-btn>
      </v-card>

      <v-card color="light" style="padding: 20px;" v-if="this.info.order_type == 2">
        <v-card-title>{{this.info.status === 1 ? '京东下单' : '京东订单'}}</v-card-title>

        <v-btn
          v-if="this.info.status === 1"
          @click="dispatchGoods({company:'jd', expressNo: '0'})"
        >提交</v-btn>
        <div v-if="info.jdData && info.jdData.result">
          <div
            v-for="item in info.jdData.result.orderTrack"
            class="pl-3"
          >{{item.msgTime}} - {{ item.operator}}- {{item.content}}</div>
        </div>
      </v-card>

      <v-card color="light" style="padding: 20px;" v-if="this.info.status == 1">
        <v-card-title>已支付待发货订单取消操作</v-card-title>

        <v-btn v-if="this.info.status === 1" @click="cancelDeal">提交</v-btn>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-snackbar
        v-model="snackbar.model"
        :top="snackbar.pos === 'top'"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.mode === 'multi-line'"
        :vertical="snackbar.mode === 'vertical'"
      >
        {{snackbar.text}}
        <v-btn dark flat @click="snackbar.model = false">Close</v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import dateUtils from "../../../utils/date_utils.js";
import SubNav from "./../../../components/SubNav";
export default {
  asyncData({ store, route }) {
    let orderId = route.query.id;
    store.state.mallOrder.info.orderId = orderId; // 存起来,编辑express(物流信息)信息时使用
    store.dispatch("mallOrderInfoGet", { id: orderId }).then(response => {
      console.log("mallOrderInfoGet", store.state.mallOrder.info.express);
    });
  },
  components: {
    SubNav
  },
  data() {
    return {
      orderId: 0,
      snackbar: {
        model: false,
        color: "info",
        timeout: 2000,
        mode: "",
        text: "保存成功",
        pos: "top"
      },
      goodsList: {
        table: {
          header: [
            { text: "商品ID", value: "id", sortable: false },
            { text: "商品图片", value: "cover", sortable: false },
            { text: "商品名称", value: "title", sortable: false },
            { text: "价格", value: false, sortable: false },
            { text: "数量", value: "num", sortable: false }
          ]
        }
      },
      orderItemList: {
        table: {
          header: [
            { text: "商品ID", value: false, sortable: false },
            { text: "商品图片", value: false, sortable: false },
            { text: "商品名称", value: false, sortable: false },
            { text: "返利总数", value: false, sortable: false },
            { text: "分享返利", value: false, sortable: false },
            { text: "评测返利", value: false, sortable: false },
            { text: "邀请人返利", value: false, sortable: false },
            { text: "结算状态", value: false, sortable: false }
          ]
        }
      },
      invoice: {
        // 发票信息
        table: {
          header: [
            { text: "发票种类", value: "category" },
            { text: "发票类型", value: "type" },
            { text: "发票抬头", value: "title" },
            { text: "公司名", value: "company_title" },
            { text: "公司税务编号", value: "company_no" }
          ]
        },
        items: []
      },
      expressData: {
        company: "",
        expressNo: ""
      }
    };
  },
  computed: {
    info() {
      return this.$store.state.mallOrder.info;
    },
    isVip() {
      return this.info.vip === 1;
    },

    useScore() {
      return this.info.score_use === 1;
    },
    orderItems() {
      return this.info.items || [];
    },
    goodsItems() {
      return this.info.goods_items;
    },
    invoiceItems() {
      return [this.info.invoice || {}];
    },

    useScoreNum() {
      if (!this.useScore) {
        return 0;
      }

      if (this.isVip) {
        return this.info.score_vip;
      }

      return this.info.score;
    },

    payMethod() {
      if (!this.info.payment) {
        return "Unknown";
      }

      const paymentTypeConfig = [, "代金券", "账户余额", "在线支付"];
      const PaymentMethodConfig = {
        wxpay: "微信支付",
        alipay: "支付宝",
        ecard: "代金券",
        balance: "账户余额"
      };

      let { type, method } = this.info.payment;
      return paymentTypeConfig[type] + PaymentMethodConfig[method] || "Unknown";
    },

    textFieldsConfig() {
      if (this.$store.state.mallOrder.info.textFieldsConfig) {
        return this.$store.state.mallOrder.info.textFieldsConfig;
      }

      this.$store.state.mallOrder.info.textFieldsConfig = [
        {
          label: "订单号",
          data: { value: this.info.order_no },
          editable: false,
          icons: []
        },
        {
          label: "订单时间",
          data: { value: this.dateFormat(this.info.create_time) },
          editable: false,
          icons: []
        },
        {
          label: "订单类型",
          data: { value: this.orderType(this.info.order_type) },
          editable: false,
          icons: []
        },
        {
          label: "订单金额",
          data: { value: this.isVip ? this.info.total_vip : this.info.total },
          editable: false,
          icons: []
        },
        {
          label: "订单状态",
          data: { value: this.orderStatus(this.info.status) },
          editable: false,
          icons: []
        },
        {
          label: "使用积分数量",
          data: { value: this.useScoreNum },
          editable: false,
          icons: []
        },
        {
          label: "支付信息",
          data: { value: this.payMethod },
          editable: false,
          icons: []
        },
        {
          label: "消费者姓名",
          data: {
            value: this.info.address ? this.info.address.name : "Unknown"
          },
          editable: false,
          icons: []
        },
        {
          label: "消费者电话",
          data: {
            value: this.info.address ? this.info.address.mobile : "Unknown"
          },
          editable: false,
          icons: []
        },
        {
          label: "消费者地址",
          data: {
            value: this.info.address
              ? this.info.address.address + this.info.address.info
              : "Unknown"
          },
          editable: false,
          icons: []
        },
        {
          label: "备注",
          data: { value: this.info.remark ? this.info.remark : "空" },
          editable: false,
          icons: []
        },
        {
          label: "是否结算",
          data: { value: this.info.rabate === 1 ? "已结算" : "未结算" },
          editable: false,
          icons: []
        },
        {
          label: "是否使用积分",
          data: {
            value: this.useScore
              ? "使用了积分: " + this.useScoreNum
              : "未使用积分"
          },
          editable: false,
          icons: []
        }
      ];

      return this.$store.state.mallOrder.info.textFieldsConfig;
    }
  },

  created() {
    if (this.info.express) {
      this.expressData.company = this.info.express.company || "";
      this.expressData.expressNo = this.info.express.express_no || "";
    }
  },

  methods: {
    dateFormat(timestamp) {
      return dateUtils.dateFormat(timestamp);
    },

    calculatePrice(item) {
      // 非vip, 没有使用积分
      let price1 = item.price_sell; // 关联 vip
      let price2 = item.price_score_sell; // 关联 积分

      // 是vip
      if (this.isVip) {
        price1 = item.price_vip;

        if (this.useScore) {
          price2 = 0;
        } else {
          price2 = item.price_score_vip;
        }
      }

      if (!this.isVip) {
        // 使用了积分
        if (this.useScore) {
          price2 = item.price_score_sell;
        }
      }

      return price1 + price2;
    },

    orderType(orderType) {
      switch (orderType) {
        case 1:
          return "自营";
        case 2:
          return "京东";
        default:
          return "Unknown";
      }
    },

    orderStatus(status) {
      switch (status) {
        case 0:
          return "订单已拍（待支付）";
        case 1:
          return "支付完成";
        case 2:
          return "已发货";
        case 9:
          return "已收货";
        default:
          return "Unknown";
      }
    },

    onTextFieldClick(item) {
      console.log("onTextFieldClick: ", item);
      let editable = this.info.textFieldsConfig[10].editable;

      if (editable) {
        // update express information
        let orderId = this.$store.state.mallOrder.info.orderId;
        let express = item.data.value;
        this.$store
          .dispatch("updateOrderInfo", { orderId, express })
          .then(() => (this.snackbar.model = true));
      }

      this.info.textFieldsConfig[10].editable = !this.info.textFieldsConfig[10]
        .editable;
      this.$forceUpdate();
    },

    onTextFieldChanged(evt) {
      console.log("onTextFieldChanged");
      console.log(evt);
    },

    toastSuccess(msg) {
      this.snackbar.text = msg;
      this.snackbar.color = "info";
      this.snackbar.model = true;
    },

    toastError(error) {
      this.snackbar.text = error;
      this.snackbar.color = "error";
      this.snackbar.model = true;
    },

    // 发货
    dispatchGoods(expressData) {
      console.log("dispatchGoods: ", expressData);
      let orderId = this.info.id;
      let company = expressData.company;
      let expressNo = expressData.expressNo;
      if (!company || !expressNo || !orderId) {
        this.toastError("参数错误");
        return;
      }

      this.$store
        .dispatch("dispatchGoods", { orderId, company, expressNo })
        .then(response => {
          if (response.code === 0) {
            // 提交订单成功
            this.toastSuccess("提交成功");
            this.$store.state.mallOrder.info.status = 2; // 已发货
            this.$forceUpdate();
          } else {
            // 提交订单失败 //
            this.toastError(response.message || "订单提交失败");
          }
        });
    },

    async cancelDeal() {
      let orderId = this.info.id;
      if (!orderId) {
        this.toastError("参数错误");
        return;
      }

      let ret = await this.$store.dispatch("orderCancelDeal", { id: orderId });
      if (ret.code === 0) {
        // 提交订单成功
        this.toastSuccess("操作成功");
        this.$store.state.mallOrder.info.status = -1; // 已发货
        this.$forceUpdate();
      } else {
        // 提交订单失败 //
        this.toastError(ret.message || "操作失败");
      }
    }
  }
};
</script>

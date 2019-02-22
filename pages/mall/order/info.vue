<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="display-1 text-xs-center" style="margin-bottom: 20px;">{{ isVip ? "订单详情(VIP)" : "订单详情"}}</div>
    </v-flex>
    <v-flex v-for="(item, index) in textFieldsConfig" v-bind:key="index" xs12 sm5 style="margin: 10px 10px;">
      <v-text-field v-if="item.editable"
      :label="item.label"
      :value="item.data.value"
      :append-icon="item.icons[item.editable ? 1 : 0]"
      @click:append="onTextFieldClick(item)"
      ></v-text-field>
    <v-text-field v-else
      :label="item.label"
      :value="item.data.value"
      :append-icon="item.icons[item.editable ? 1 : 0]"
      readonly
      @click:append="onTextFieldClick(item)"
      ></v-text-field>

    </v-flex>

    <v-flex xs12>
      <v-card-title>订单商品列表
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table :headers="goodsList.table.header" :items="goodsItems" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>
              <v-img :src="props.item.cover" aspect-radio=1 class="grey lighten-2"></v-img>
            </td>
            <td>{{ props.item.title }}</td>
            <td>{{ calculatePrice(props.item) }}</td>
            <td>{{ props.item.num }}</td>
          </template>
        </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData ({store, route}) {
    let orderId = route.query.id;
    store.dispatch('mallOrderInfoGet', {id: orderId})
  },

  data () {
    return {
      vip: this.$store.state.mallOrder.info.vip === 1,
      // [{"id":5,"title":"正圆菩提子手链念珠把件佛珠文玩手串男女","cover":"http://kxm-img.oss-cn-shenzhen.aliyuncs.com/uploads/images/20190220/08a81b4d62134d76841c5d64c111fc7d.jpg","type":1,"price_sell":0.03,"price_vip":0.04,"price_score_sell":0.01,"price_score_vip":0,"price_cost":0.02,"price_market":0.05,"check":false,"share_id":0,"post_id":0,"num":1}]
      goodsList: {
        table: {
          header: [
            {text: '商品ID', value: 'id', sortable: false},
            {text: '商品图片', value: 'cover', sortable: false},
            {text: '商品名称', value: 'title', sortable: false},
            {text: '价格', value: false, sortable: false},
            {text: '数量', value: 'num', sortable: false}
          ]
        }
      }
    }
  },
  computed: {
    info () {
      return this.$store.state.mallOrder.info
    },
    isVip () {
      return this.info.vip === 1
    },

    useScore () {
      return this.info.score_use === 1
    },

    goodsItems () {
      return this.info.goods_items
    },

    useScoreNum () {
      if (!this.useScore) {
        return 0
      }

      if (this.isVip) {
        return this.info.score_vip
      }

      return this.info.score
    },

    payMethod () {
      if (!this.info.payment) {
        return 'Unknown'
      }

      const PaymentMethodConfig = {
        wxpay: '微信支付'
      }

      let {type, method} = this.info.payment
      return PaymentMethodConfig[method] || 'Unknown'
    },

    textFieldsConfig () {
      if (this.$store.state.mallOrder.info.textFieldsConfig) {
        return this.$store.state.mallOrder.info.textFieldsConfig
      }

      this.$store.state.mallOrder.info.textFieldsConfig = [
        {label: '订单号', data: {value: this.info.order_no}, editable: false , icons: []},
        {label: '订单时间', data: {value: this.info.create_time}, editable: false, icons: []},
        {label: '订单类型', data: {value: this.orderType(this.info.order_type)}, editable: false, icons: []},
        {label: '订单金额', data: {value: this.isVip ? this.info.total_vip : this.info.total}, editable: false, icons: []},
        {label: '订单状态', data: {value: this.info.status}, editable: false, icons: []},
        {label: '使用积分数量', data: {value: this.useScoreNum}, editable: false, icons: []},
        {label: '支付信息', data: {value: this.payMethod}, editable: false, icons: []},
        {label: '消费者姓名', data: { value: this.info.address ? this.info.address.name : 'Unknown'}, editable: false, icons: []},
        {label: '消费者电话', data: { value: this.info.address ? this.info.address.mobile : 'Unknown'}, editable: false, icons: []},
        {label: '消费者地址', data: {value: this.info.address ? this.info.address.info : 'Unknown'}, editable: false, icons: []},
        {label: '物流信息', data: {value: this.info.express ? this.info.express : '空'}, editable: true, icons: ['edit', 'check_circle']},
        {label: '发票信息', data: {value: this.info.invoice ? this.info.invoice : '空'}, editable: false, icons: []},
        {label: '备注', data: {value: this.info.remark ? this.info.remark : '空'}, editable: false, icons: []},
        {label: '是否结算', data: {value: this.info.rabate === 1 ? '已结算' : '未结算'}, editable: false, icons: []},
        {label: '是否使用积分', data: {value: this.useScore ? '使用了积分: ' + this.useScoreNum : '未使用积分'}, editable: false, icons: []},
      ]

      return this.$store.state.mallOrder.info.textFieldsConfig
    }
  },
  methods: {
    calculatePrice (item) {
      // 非vip, 没有使用积分
      let price1 = item.price_sell // 关联 vip
      let price2 = item.price_score_sell // 关联 积分

      // 是vip
      if (this.isVip) {
        price1 = item.price_vip

        if (this.useScore) {
          price2 = 0
        } else {
          price2 = item.price_score_vip
        }
      }

      if (!this.isVip) {
        // 使用了积分
        if (this.useScore) {
          price2 = item.price_score_sell
        }
      }

      return price1 + price2

    },

    orderType (orderType) {
      switch (orderType) {
        case 1:
          return '自营'
        case 2:
          return '京东'
        default:
          return 'Unknown'
      }
    },

    onTextFieldClick (item) {
      console.log('onTextFieldClick: ', item)
      this.info.textFieldsConfig[10].editable = !this.info.textFieldsConfig[10].editable
      this.$forceUpdate()
    }
  }
}
</script>

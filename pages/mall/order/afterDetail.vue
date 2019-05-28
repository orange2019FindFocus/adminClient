<template>
  <v-layout row wrap>
    <sub-nav :pid="5" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title></v-card-title>
        <v-container grid-list-xs fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <table class="v-table v-datatable">
                <tr>
                  <td>售后编号</td>
                  <td>{{ info.after_no }}</td>
                </tr>
                
                <tr>
                  <td>申请类型</td>
                  <td>{{ info.category }}</td>
                </tr>
                <tr>
                  <td>申请原因</td>
                  <td>{{ info.type }}</td>
                </tr>
                <tr>
                  <td>申请详情</td>
                  <td>{{ info.info }}</td>
                </tr>
                <tr>
                  <td>图片</td>
                  <td>
                    <img :src="img" alt v-for="img in info.imgs" width="50" height="50">
                  </td>
                </tr>
                <tr>
                  <td>申请人</td>
                  <td>{{ info.user.nickname }}</td>
                </tr>
                <tr>
                  <td>联系电话</td>
                  <td>{{ info.user.mobile }}</td>
                </tr>
                <tr>
                  <td>订单信息</td>
                </tr>
                <tr>
                  <td>关联订单</td>
                  <td>{{ info.order.order_no }}</td>
                </tr>
                <tr>
                  <td>订单金额</td>
                  <td>{{ info.total }}</td>
                </tr>
                <tr>
                  <td>订单使用积分</td>
                  <td>{{ info.score }}</td>
                </tr>
                <tr>
                  <td><strong>关联账单信息</strong></td>
                </tr>
                <tr>
                  <td>
                    账单id
                  </td>
                  <td>
                    {{info.payment.id}}
                  </td>
                </tr>
                <tr>
                  <td>
                    在线支付金额
                  </td>
                  <td>
                    {{info.payment.amount}}
                  </td>
                </tr>
                <tr>
                  <td>使用余额金额</td>
                  <td>{{ info.payment.balance }}</td>
                </tr>
                <tr>
                  <td>使用ecard金额</td>
                  <td>{{ info.payment.ecard }}</td>
                </tr>
                <tr>
                  <td>积分抵扣数目</td>
                  <td>{{ info.payment.score }}</td>
                </tr>
              </table>
            </v-flex>

            <v-flex xs6>
              <div>申请商品信息</div>
              <table class="v-table v-datatable">
                <thead>
                  <tr>
                    <th>图片</th>
                    <th>名称</th>
                    <th>购买价格</th>
                    <th>使用积分金额</th>
                    <th>数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in info.items">
                    <td><img :src="item.cover" height="50"></td>
                    <td>{{ item.title }}</td>
                    <td> {{ info.order.vip ? 
                      (info.order.score_use ? item.price_vip : parseFloat(item.price_vip + item.price_score_vip).toFixed(2) ) 
                      : (info.order.score_use ? item.price_sell : parseFloat(item.price_sell + item.price_score_sell).toFixed(2) )
                      }} </td>
                    <td> {{ info.order.score_use ? (info.order.vip ? item.price_score_vip : item.price_score_sell ) : 0 }}  </td>
                    <td>X {{ item.num }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="pt-5" v-if="info.status == 0">

                <div>
                  <v-textarea label="记录操作信息" placeholder="记录操作信息备注" v-model="remark"></v-textarea>
                </div>
                <v-btn color="success" @click="orderAfterDeal(info , 2)">完成售后</v-btn>
                <v-btn color="error" @click="orderAfterDeal(info , 1)">退款操作</v-btn>
                
                <div>
                  <small>若有退款操作，请选择退款操作，无则选择完成售后，记录操作信息，退款操作需谨慎</small>
                </div>
                
              </div>

            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../../components/SubNav";
export default {
  components: {
    SubNav
  },
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    if (id) {
      store.dispatch("orderAfterDetailGet", { id: id }).then(ret => {
        console.log("orderAfterDetailGet ret", ret);
        if (ret.code == 0) {
          store.state.orderAfter.info = ret.data;
        }
      });
    }
  },
  data(){
    return {
      remark:''
    }
  },
  computed: {
    info() {
      return this.$store.state.orderAfter.info;
    }
  },
  methods: {
    async orderAfterDeal(info , type = 1){
      if(confirm('确认' + ((type == 1) ? '退款' : '完成'))){
        let remark = this.remark
        if(!remark){
          alert('请填写操作备注信息')
          return
        }

        let data = {id: info.id, type: type, remark: remark}
        console.log('orderAfterDeal data' , data)
        let ret = await this.$store.dispatch('orderAfterDeal' , data)
        console.log(ret)
        if(ret.code == 0){
          this.$store.state.orderAfter.info.status = 1
        }else {
          alert(ret.message)
        }
      }
    }
  }
};
</script>

<style>
</style>

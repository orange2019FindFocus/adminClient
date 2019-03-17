<template>
  <v-layout row wrap>
    <sub-nav :pid="5" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card color="light">
        <v-card-title>
          评价记录
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search.keywords"
              append-icon="search"
              label="输入手机号进行搜索"
              single-line
              hide-details
              @keypress.enter="searchList"
            ></v-text-field>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="commentList" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{props.item.id}}</td>
            <td>{{dateFormat(props.item.create_time)}}</td>
            <td>{{props.item.status}}</td>
            <td>
              <nuxt-link :to="'/mall/order/info?id=' + props.item.order_id">{{props.item.order_id}}</nuxt-link>
            </td>
            <td>{{props.item.goods_title}}</td>
            <td><v-img :src="props.item.goods_cover" style="width: 50px; height: 50px;"></v-img></td>
            <td>{{props.item.goods_amount}}</td>
            <td>{{props.item.user_id}}</td>
            <td>{{props.item.rate_level}}</td>
            <td>{{props.item.rate_info}}</td>
            <td>{{dateFormat(props.item.rate_time)}}</td>
          </template>
        </v-data-table>
        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="table.page" :length="pages" @input="hitPage"></v-pagination>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../../components/SubNav"
import dateUtils from "./../../../utils/date_utils.js"

export default {
  asyncData ({store, route}) {
    store.state.mallOrderComment.page = route.query.page || 1
    store.dispatch('orderCommentList', {search: route.query.search || ''}).then(rsp => {

    })
  },
  components: {
    SubNav
  },
  data () {
    return {
      table: {
        headers: [
          {text: 'ID', value: 'id', sortable: false},
          {text: '创建时间', vlaue: 'create_time', sortable: false},
          {text: '状态', value: 'status', sortable: false},
          {text: '订单ID', value: 'order_id', sortable: false},
          {text: '商品标题', value: 'goods_title', sortable: false},
          {text: '商品封面', value: 'goods_cover', sortable: false},
          {text: '商品总额(元)', value: 'goods_amount', sortable: false},
          {text: '评论人用户ID', value: 'user_id', sortable: false},
          {text: '商品评价（几星）', value: 'rate_level', sortable: false},
          {text: '评论信息', value: 'rate_info', sortable: false},
          {text: '评论时间', value: 'rate_time', sortable: false}
        ],
        page: 1
      },

      search: {
        keywords: ''
      }
    }
  },
  computed: {
    state () {
      return this.$store.state.mallOrderComment
    },
    commentList () {
      return this.state.list
    },
    pages () {
      return Math.ceil(this.state.total / this.state.limit)
    }
  },
  methods: {
    hitPage (page) {
      let search = this.search.keywords
      this.state.page = page
      this.$store.dispatch('orderCommentList', {search: search})
    },
    dateFormat (timestamp) {
      return dateUtils.dateFormat(timestamp)
    }
  }
}
</script>

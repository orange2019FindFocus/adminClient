<template>
<v-layout row wrap>
  <sub-nav :pid="2" :rules="this.$store.state.adminGroupRules" />
  <v-flex xs12>
    <v-card color="light">
      <v-card-title>
        收藏列表
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
      <v-data-table :headers="table.headers" :items="collectionList" class="elevation-1" hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{props.item.id}}</td>
          <td>{{props.item.user_id}}</td>
          <td>{{props.item.status}}</td>
          <td>{{props.item.category}}</td>
          <td>{{props.item.type}}</td>
          <td>{{props.item.goods_id}}</td>
          <td>{{props.item.post_id}}</td>
          <td>{{dateFormat(props.item.create_time)}}</td>
          <td>{{dateFormat(props.item.update_time)}}</td>
          <td>
            <v-flex xs12 v-if="props.item.status == 0">
              <v-btn color="success" @click="audit(true, props.item.user_id)">通过</v-btn>
              <v-btn color="error" @click="audit(false, props.item.user_id)">拒绝</v-btn>
            </v-flex>
          </td>
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
import SubNav from "./../../components/SubNav"
import dateUtils from "./../../utils/date_utils.js";

export default {
  components: {
    SubNav
  },
  asyncData ({ store, route }) {
    let page = route.query.page || 1
    let search = route.query.search || ''
    store.dispatch('getUserCollectionList', {page, search})
  },

  data () {
    return {
      search: {
        keywords: '',
      },
      table: {
        headers: [
          {text: '收藏ID', value: 'id', sortable: false},
          {text: '用户ID', value: 'user_id', sortable: false},
          {text: '状态', value: 'status', sortable: false},
          {text: '分类', value: 'category', sortable: false},
          {text: '类型', value: 'type', sortable: false},
          {text: '商品ID', value: 'goods_id', sortable: false},
          {text: '文章ID', value: 'post_id', sortable: false},
          {text: '创建时间', value: 'create_time', sortable: true},
          {text: '更新时间', value: 'update_time', sortable: true},
        ],
        page: 1
      }
    }
  },
  computed: {
    collectionList () {
      return this.$store.state.userCollectionList.list
    },
    pages () {
      return Math.ceil(this.$store.state.userCollectionList.total / this.$store.state.userCollectionList.limit)
    }
  },
  methods: {
    ...dateUtils,
    searchList () {
      console.log('searchList')
      let page = 1
      let search = this.search.keywords

      // this.$router.push({path: '/user/shareApply', query: {page, search}})
      this.$store.dispatch('getUserCollectionList', {page, search})
    },

    hitPage (_page) {
      console.log('page: ', _page)
      let page = _page
      let search = this.search.keywords

      // this.$router.push({path: '/user/shareApply', query: {page, search}})
      this.$store.dispatch('getUserCollectionList', {page, search})
    }
  }

}
</script>


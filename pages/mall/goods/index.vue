<template>
  <v-layout row wrap>
    <sub-nav :pid="5" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-subheader>
          <v-btn-toggle >
            <v-btn  :color="(type == 1) ? 'primary' : ''" @click="chooseGoodsType(1)">自营</v-btn>
            <v-btn  :color="(type == 2) ? 'primary' : ''" @click="chooseGoodsType(2)">京东</v-btn>
          </v-btn-toggle>
        </v-subheader>
        <v-card-title primary-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入商品名称进行搜索"
            single-line
            hide-details
            @keypress="searchList"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/mall/goods/update">添加</v-btn>
        </v-card-title>

        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="pa-2">
              <v-img :src=" props.item.cover " height="50"></v-img>
            </td>
            <td>{{ props.item.title }}</td>

            <td>{{ props.item.price_market }}</td>
            <td>{{ props.item.price_cost }}</td>
            <td>
              {{ props.item.price_sell }} /
              <small>{{ props.item.price_score_sell}}</small>
            </td>
            <td>
              {{ props.item.price_vip }} /
              <small>{{ props.item.price_score_vip}}</small>
            </td>
            <td>
              <v-text-field
                v-model="props.item.sales"
                @keypress.enter="itemUpdateSales(props.item)"
              ></v-text-field>
            </td>
            <td class="pt-3">
              <v-switch
                v-model="props.item.is_share"
                :label="props.item.is_share == 0 ? '已关闭' :'开启中' "
                :color="props.item.is_share == 0 ? 'error' :'blue' "
                @change="itemUpdate('is_share' , props.item)"
                
              ></v-switch>
            </td>
            <td class="pt-3">
              <v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '已下架' :'已上架' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('status' , props.item)"
                v-if="props.item.status >= 0"
              ></v-switch>
              <span v-else>已删除</span>
            </td>
            <td>
              <v-btn small color="blue" @click="infoModify(props.item)">编辑</v-btn>
              <v-btn small color="error" @click="itemDeleteDialog(props.item)">删除</v-btn>
              <v-btn small color="primary" @click="goToAlbumList(props.item)">图册</v-btn>
            </td>
            <td>
              /pagesMall/mall/goods?id={{props.item.id}}
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
        <v-card-title class="headline">确认删除?</v-card-title>

        <v-card-text></v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">取消</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="itemDelete">确认</v-btn>
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
    let type = route.query.type || '';
    store.dispatch("mallGoodsListGet", { page: page , type: type });
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "封面图", value: false, sortable: false },
          { text: "商品名称", value: false, sortable: false },
          { text: "市场价格", value: false, sortable: false },
          { text: "成本价格", value: false, sortable: false },
          { text: "普通售价/积分", value: false, sortable: false },
          { text: "VIP售价/积分", value: false, sortable: false },
          { text: "销售量", value: false, sortable: false },
          { text: "开启代言", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "操作", value: false, sortable: false },
          { text: "链接", value: false, sortable: false },
        ]
      },
      page: parseInt(this.$route.query.page) || 1,
      dialog: false,
      deleleItem: {},
      type:''
    };
  },
  components: {
    SubNav
  },
  computed: {
    listDatas() {
      return this.$store.state.mallGoods.list;
    },
    listCount() {
      return this.$store.state.mallGoods.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.mallGoods.count / this.$store.state.mallGoods.limit
      );
    }
  },
  methods: {
    itemUpdateSales(item){
      console.log('itemUpdateSales' , item)
      this.itemUpdate('sales' , item)
    },
    chooseGoodsType(type = 1){
      this.type = type
      this.page = 1;
      this.getList();
    },
    goToAlbumList(item){
      this.$router.push({
        path: "/config/album",
        query: { type_id: item.id , type: 'goods', type_title: item.title }
      });
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
      let type = this.type
      // this.page = 1;

      let body = { page: page };
      if (search) body.search = search;
      if (type) body.type = type

      this.$router.push({ path: "/mall/goods", query: body });
      this.$store.dispatch("mallGoodsListGet", body);
    },
    infoModify(item) {
      this.$store.state.mallGoods.info = item;
      this.$router.push({
        path: "/mall/goods/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      item.is_share = item.is_share ? 1 : 0
      console.log("mallGoodsItemUpdate", item);
      this.$store.dispatch("mallGoodsInfoUpdate", item);
    },
    itemDeleteDialog(item) {
      this.dialog = true;
      this.deleleItem = item;
    },
    async itemDelete() {
      let item = this.deleleItem;
      item.status = -1;
      let ret = await this.$store.dispatch("mallGoodsInfoUpdate", item);
      if (ret.code == 0) {
        this.$store.dispatch("mallGoodsListGet");
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>

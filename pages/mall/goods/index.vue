<template>
  <v-layout row wrap>
    <nav-sub-mall/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>商品列表
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
              <small>{{ props.item.price_score_sell * 1000}}</small>
            </td>
            <td>
              {{ props.item.price_vip }} /
              <small>{{ props.item.price_score_vip * 1000}}</small>
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
            </td>
          </template>
        </v-data-table>
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
import NavSubMall from "./../../../components/SubNavMall";
export default {
  asyncData({ store, route }) {
    store.dispatch("mallGoodsListGet");
  },
  data() {
    return {
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "封面图", value: false, sortable: false },
          { text: "商品名称", value: false, sortable: false },
          { text: "市场价格", value: false, sortable: false },
          { text: "成本价格", value: false, sortable: false },
          { text: "普通售价/积分", value: false, sortable: false },
          { text: "VIP售价/积分", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      dialog: false,
      deleleItem: {}
    };
  },
  components: {
    NavSubMall
  },
  computed: {
    listDatas() {
      return this.$store.state.mallGoods.list;
    },
    listCount() {
      return this.$store.state.mallGoods.count;
    }
  },
  methods: {
    infoModify(item) {
      this.$store.state.mallGoods.info = item;
      this.$router.push({
        path: "/mall/goods/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
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

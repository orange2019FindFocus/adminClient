<template>
  <v-layout row wrap>
    <sub-nav-mall/>
    <v-flex xs12>
      <v-card color="light">
        <v-subheader>商城订单数据</v-subheader>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入文章标题进行搜索"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/mall/goods/update">添加商品</v-btn>
        </v-card-title>
        <v-data-table
          :headers="table.headers"
          :items="table.datas"
          class="elevation-1"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.type }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.post_date }}</td>
            <td>{{ props.item.views }}</td>
            <td></td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination v-model="table.page" :length="6" @input="pageChange"></v-pagination>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNavMall from "./../../components/SubNavMall";
export default {
  components: {
    SubNavMall
  },
  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "类型", value: "type", sortable: false },
          { text: "标题", value: "title", sortable: false },
          { text: "发布时间", value: "post_date", sortable: false },
          { text: "阅读次数", value: "views", sortable: false },
          { text: "操作", value: false, sortable: false }
        ],
        datas: [
          {
            id: 1,
            type: 2,
            title: "文章比套题",
            post_date: "2018-11-15",
            views: 1000
          }
        ],
        page: 1
      }
    };
  },
  methods: {
    pageChange(page) {
      console.log("pageChange：", page);
    }
  }
};
</script>

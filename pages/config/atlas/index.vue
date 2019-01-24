<template>
  <v-layout row wrap>
    <nav-sub-config/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>图册管理
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/config/atlas/update">添加</v-btn>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          
        </v-data-table>
      </v-card>
      
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        111
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import NavSubConfig from "./../../../components/SubNavConfig";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("noticeListGet", { page: page });
  },
  components: {
    NavSubConfig
  },
  data(){
    return {
      dialog: false,
      table: {
        headers: [
          { text: "ID", value: "id", sortable: 'false', align:'center'},
          { text: "标题", value: 'title', sortable: false, align:'center'},
          { text: "图片", value: 'img', sortable: false, align:'center'},
          { text: "缩略图", value: 'thumb',sortable: false, align:'center'},
          { text: "简介", value: 'description', sortable: false, align:'center'},
          { text: "关联的ID", value: 'type_id', sortable: false, align:'center'},
          { text: "类型", value: 'type', sortable: false, align:'center'},
          { text: "排序", value: 'sort', sortable: false, align:'center'},
          { text: "状态", value: 'status', sortable: false, align:'center'},
          { text: "操作", value: false, sortable: false, align:'center' }
        ]
      },
      deleleItem: {}
    }
  },
  computed: {
  },
  methods: {
   
  }
}
</script>
<style>
</style>
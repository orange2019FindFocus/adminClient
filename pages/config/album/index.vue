<template>
  <v-layout row wrap>
    <nav-sub-config/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>图册管理
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/config/album/update">添加</v-btn>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td><img :src=props.item.img height="120" width="280"/></td>
            <td>{{ props.item.thumb }}</td>
            <td>{{ props.item.url }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.type_id }}</td>
            <td>{{ props.item.sort }}</td>
            <td>{{ props.item.status }}</td>
          </template>
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
    store.dispatch("getAlbumList", { page: page });
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
          { text: "URL", value: 'url',sortable: false, align:'center'},
          { text: "简介", value: 'description', sortable: false, align:'center'},
          { text: "关联的ID", value: 'type_id', sortable: false, align:'center'},
          { text: "类型", value: 'type', sortable: false, align:'center'},
          { text: "排序", value: 'sort', sortable: false, align:'center'},
          { text: "状态", value: 'status', sortable: false, align:'center'},
          { text: "操作", value: false, sortable: false, align:'center' }
        ]
      },
      page: 1,
      deleleItem: {}
    }
  },
  computed: {
    listDatas(){
      return this.$store.state.album.list;
    },
    listCount(){
      return this.$store.state.album.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.album.count / this.$store.state.album.limit
      );
    }
  },
  methods: {
   getList() {
      let page = this.page;
      // this.page = 1;
      let body = { page: page };
      // if (search) body.search = search;
      this.$router.push({ path: "/config/album", query: body });
      this.$store.dispatch("getAlbumList", body);
    },
  }
}
</script>
<style>
</style>
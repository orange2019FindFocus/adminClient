<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          {{ this.$route.query.type_title || '' }} - 图册管理
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="goToAdd">添加</v-btn>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td class="pt-1"><img :src=props.item.img height="50" /></td>
            <td>{{ props.item.url }}</td>
            <td>{{ props.item.sort }}</td>
            <td class="pt-3"><v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '禁用' :'正常' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('status' , props.item)"
                v-if="props.item.status >= 0"
              ></v-switch></td>
            <td>
              <v-btn small color="blue" @click="infoModify(props.item)">编辑</v-btn>
            </td>
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
import SubNav from "./../../../components/SubNav";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    let type = route.query.type || 'banner'
    let typeId = route.query.type_id || 0
    store.dispatch("getAlbumList", { page: page , type: type , type_id : typeId });
  },
  components: {
    SubNav
  },
  data(){
    return {
      dialog: false,
      table: {
        headers: [
          { text: "ID", value: "id", sortable: 'false', align:'center'},
          { text: "标题", value: 'title', sortable: false, align:'center'},
          { text: "图片", value: 'img', sortable: false, align:'center'},
          { text: "跳转页面", value: 'url',sortable: false, align:'center'},
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
   goToAdd(){
     this.$store.state.album.info = {
       type : this.$route.query.type,
       type_id: this.$route.query.type_id
     };
      this.$router.push({
        path: "/config/album/update"
      });
   },
   getList() {
      let page = this.page;
      // this.page = 1;
      let body = { page: page };
      // if (search) body.search = search;
      this.$router.push({ path: "/config/album", query: body });
      this.$store.dispatch("getAlbumList", body);
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      console.log("alumItemUpdate", item);
      this.$store.dispatch("albumInfoUpdate", item);
    },
    infoModify(item) {
      this.$store.state.album.info = item;
      this.$router.push({
        path: "/config/album/update",
        query: { id: item.id }
      });
    },
  }
}
</script>
<style>
</style>
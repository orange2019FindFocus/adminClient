<template>
  <v-layout row wrap>
    <sub-nav :pid="6" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>管理员组别列表
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/account/groupUpdate">添加</v-btn>
        </v-card-title>

        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
           
            <td class="pt-3" v-if="props.item.id">
              <v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '禁用' :'开启' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('status' , props.item)"
              ></v-switch>
            </td>
            <td v-if="props.item.id">
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
import SubNav from "./../../components/SubNav";
export default {
  asyncData({ store, route }) {
    store.dispatch("groupListGet");
  },
  data() {
    return {
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "组别名称", value: false, sortable: false },
          { text: "状态", value: false, sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      dialog: false,
      deleleItem: {}
    };
  },
  components: {
    SubNav
  },
  computed: {
    listDatas() {
      return this.$store.state.adminGroups;
    },
    rootAdminId(){
      return this.$store.state.rootAdminId;
    }
  },
  methods: {
    infoModify(item){
      this.$router.push({path : '/account/groupUpdate' , query: {id: item.id}})
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      console.log("adminGroupUpdate", item);
      this.$store.dispatch("adminGroupUpdate", item);
    },
    itemDeleteDialog(item) {
      this.dialog = true;
      this.deleleItem = item;
    },
    async itemDelete() {
      let item = this.deleleItem;
      item.status = -1;
      let ret = await this.$store.dispatch("adminGroupUpdate", item);
      if (ret.code == 0) {
        // this.$store.dispatch("adminUpdate");
        this.$store.dispatch("groupListGet");
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>

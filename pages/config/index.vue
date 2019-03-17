<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>系统设置配置列表
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/config/update">添加</v-btn>
        </v-card-title>

        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ getConfigType(props.item.type) }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.title }}</td>
            <td>
              <div v-if="props.item.type != 'img'">{{ props.item.content }}</div>
              <div v-else class="pt-2 pb-2">
                <img :src="props.item.content" alt height="80">
              </div>
            </td>
            <td class="pt-3">
              <v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '禁用' :'开启' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('status' , props.item)"
              ></v-switch>
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
import SubNav from "./../../components/SubNav";
export default {
  asyncData({ store, route }) {
    store.dispatch("configListGet");
  },
  data() {
    return {
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "类型", value: "type", sortable: false },
          { text: "标识", value: "name", sortable: false },
          { text: "名称", value: "title", sortable: false },
          { text: "内容", value: "content", sortable: false, width: "200px" },
          { text: "状态", value: "status", sortable: false },
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
      return this.$store.state.config.list;
    },
    listCount() {
      return this.$store.state.config.count;
    }
  },
  methods: {
    getConfigType(type) {
      // if (type == "day") {
      //   return "每日任务";
      // } else {
      //   return "无";
      // }
      let types = {
        number: "数字",
        string: "字符",
        text: "文本",
        img: "图片"
      };

      return types[type] || "";
    },
    infoModify(item) {
      this.$store.state.config.info = item;
      this.$router.push({
        path: "/config/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      console.log("configItemUpdate", item);
      this.$store.dispatch("configInfoUpdate", item);
    },
    itemDeleteDialog(item) {
      this.dialog = true;
      this.deleleItem = item;
    },
    async itemDelete() {
      let item = this.deleleItem;
      item.status = -1;
      let ret = await this.$store.dispatch("configInfoUpdate", item);
      if (ret.code == 0) {
        this.$store.dispatch("configListGet");
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>

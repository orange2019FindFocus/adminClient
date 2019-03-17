<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <!-- <v-subheader></v-subheader> -->
        <v-card-title primary-title>收益任务配置
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/config/task/update">添加</v-btn>
          <v-btn color="blue" to="/config/task/logs">数据记录</v-btn>
        </v-card-title>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ getTaskType(props.item.type) }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.score }}</td>
            <td>{{ props.item.balance }}</td>
            <td>{{ props.item.limit_count }}</td>
            <td>{{ props.item.limit_id }}</td>
            <td>{{ props.item.limit_ip }}</td>
            <td class="pt-3">
              <!-- {{ props.item.display ? '是' : '否' }} -->
              <v-switch
                v-model="props.item.display"
                :label="props.item.display == 0 ? '否' :'是' "
                :color="props.item.display == 0 ? 'error' :'blue' "
                @change="itemUpdate('display' , props.item)"
              ></v-switch>
            </td>
            <td class="pt-3">
              <v-switch
                v-model="props.item.status"
                :label="props.item.status == 0 ? '关闭' :'开启' "
                :color="props.item.status == 0 ? 'error' :'blue' "
                @change="itemUpdate('display' , props.item)"
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

        <v-card-text>
          <!-- Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running. -->
        </v-card-text>

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
    store.dispatch("taskListGet");
  },
  components: {
    SubNav
  },

  data() {
    return {
      search: "",
      table: {
        headers: [
          { text: "ID", sortable: false, value: "id" },
          { text: "类型", value: "type", sortable: false },
          { text: "标识", value: "name", sortable: false },
          { text: "任务名称", value: "title", sortable: false },
          { text: "积分收益", value: "score", sortable: false },
          { text: "现金收益", value: "balance", sortable: false },
          { text: "数量限制", value: "limit_count", sortable: false },
          { text: "ID限制", value: "limit_id", sortable: false },
          { text: "IP限制", value: "limit_ip", sortable: false },
          { text: "是否每日任务显示", value: "display", sortable: false },
          { text: "状态", value: "status", sortable: false },
          { text: "操作", value: false, sortable: false }
        ]
      },
      dialog: false,
      deleleItem: {}
    };
  },
  computed: {
    listDatas() {
      return this.$store.state.task.list;
    },
    listCount() {
      return this.$store.state.task.count;
    }
    // listPageLength() {
    //   return Math.ceil(
    //     this.$store.state.task.count / this.$store.state.task.limit
    //   );
    // }
  },
  methods: {
    getTaskType(type) {
      if (type == "day") {
        return "每日任务";
      } else {
        return "无";
      }
    },
    infoModify(item) {
      this.$store.state.task.info = item;
      this.$router.push({
        path: "/config/task/update",
        query: { id: item.id }
      });
    },
    async itemUpdate(type, item) {
      // item[type] = !item[type];
      item.status = item.status ? 1 : 0
      item.display = item.display ? 1 : 0
      console.log("taskItemUpdate", item);
      this.$store.dispatch("taskInfoUpdate", item);
    },
    itemDeleteDialog(item) {
      this.dialog = true;
      this.deleleItem = item;
    },
    async itemDelete() {
      let item = this.deleleItem;
      item.status = -1;
      let ret = await this.$store.dispatch("taskInfoUpdate", item);
      if (ret.code == 0) {
        this.$store.dispatch("taskListGet");
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
</style>

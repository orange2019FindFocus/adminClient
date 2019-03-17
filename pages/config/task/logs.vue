<template>
  <v-layout row wrap>
    <sub-nav :pid="2" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>收益任务数据记录</v-card-title>

        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{props.item.id}}</td>
            <td>{{props.item.user_info.mobile}}</td>
            <td>{{props.item.user_info.nickname}}</td>
            <td>{{props.item.type}}</td>
            <td>{{ props.item.task.title}}</td>
            <td>{{props.item.balance}}</td>
            <td>{{props.item.score}}</td>
            <td>{{props.item.ip }}</td>
            <td>{{ props.item.log_date}}</td>
            <td>{{ props.item.status == 0 ? '未结算':'已结算' }}</td>
          </template>
        </v-data-table>

        <div class="pt-2 pb-2">
          <v-pagination :total-visible="7" v-model="page" :length="listPageLength" @input="pageChange"></v-pagination>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../../components/SubNav";
export default {
  asyncData({ store, route }) {
    let page = route.query.page || 1;
    store.dispatch("taskLogsGet", { page: page });
  },
  components: {
    SubNav
  },
  data() {
    return {
      table: {
        headers: [
          { text: "ID", value: false, sortable: false },
          { text: "手机号", value: false, sortable: false },
          { text: "用户昵称", value: false, sortable: false },
          { text: "类型", value: false, sortable: false },
          { text: "名称", value: false, sortable: false },
          { text: "收益金额", value: false, sortable: false },
          { text: "积分", value: false, sortable: false },
          { text: "ip", value: false, sortable: false },
          { text: "日期", value: false, sortable: false },
          { text: "是否结算", value: false, sortable: false }
        ]
      },
      page: parseInt(this.$route.query.page) || 1
    };
  },
  computed: {
    listDatas() {
      return this.$store.state.taskLogs.list;
    },
    listCount() {
      return this.$store.state.taskLogs.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.taskLogs.count / this.$store.state.taskLogs.limit
      );
    }
  },
  methods: {
    pageChange(page) {
      console.log("pageChange：", page);
      this.page = page;
      // this.$route.query.page = page;
      // this.$router.push({ path: "/config/task/logs", query: { page: page } });
      // this.$store.dispatch("taskLogsGet", { page: page });
      this.getList();
    },
    getList() {
      // let search = this.search;
      let page = this.page;
      // this.page = 1;

      let body = { page: page };
      // if (search) body.search = search;

      this.$router.push({ path: "/config/task/logs", query: body });
      this.$store.dispatch("taskLogsGet", body);
    }
  }
};
</script>

<style>
</style>

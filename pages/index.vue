<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-data-table :headers="table.headers" :items="listDatas" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ dateFormat(props.item.create_time, 'YYYY-MM-DD') }}</td>
            <td>{{ props.item.registration_amount }} </td>
            <td>{{ props.item.active_user }} </td>
            <td>{{ props.item.active_user_composition }} </td>
            <td>{{ props.item.order_quantity }} </td>
            <td>{{ props.item.new_vip_user }} </td>
            <td>{{ props.item.vip_user_amount }} </td>
            <td>{{ props.item.user_amount }} </td>
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
import dateUtils from "./../utils/date_utils.js";
export default {
  components: {

  },
  asyncData({store, route}){
    let page = route.query.page || 1;
    store.dispatch("dailyStatisticsGet", { page: page });
  },
  data(){
    return {
      search:"",
      table: {
        headers: [
          { text: "日期", value: false, sortable: false },
          { text: "当日注册量", value: false, sortable: false },
          { text: "活跃用户", value: "nickname", sortable: false },
          { text: "活跃用户构成", value: "create_time", sortable: false },
          { text: "下单量", value: false, sortable: false },
          { text: "新增VIP", value: false, sortable: false },
          { text: "总VIP", value: false, sortable: false },
          { text: "总用户量", value: false, sortable: false },
        ]
      },
      page: parseInt(this.$route.query.page) || 1
    }
  },
  computed: {
    listDatas() {
      return this.$store.state.dailyData.list;
    },
    listCount() {
      return this.$store.state.dailyData.count;
    },
    listPageLength() {
      return Math.ceil(
        this.$store.state.dailyData.count / this.$store.state.dailyData.limit
      );
    }
  },
  methods:{
    ...dateUtils,
    // pageChangeNum(){
    //   let page = this.$refs.pageNum.value
    //   this.pageChange(parseInt(page))
    // },
    pageChange(page) {
      console.log("pageChange：", page);
      this.page = page;
      // this.$route.query.page = page;
      // this.$router.push({ path: "/user", query: { page: page } });
      // this.$store.dispatch("userListGet", { page: page });
      this.getList();
    },
    getList() {
      let search = this.search;
      let page = this.page;
      // this.page = 1;

      let body = { page: page };
      if (search) body.search = search;

      this.$router.push({ path: "/", query: body });
      this.$store.dispatch("dailyStatisticsGet", body);
    },
  }

};
</script>

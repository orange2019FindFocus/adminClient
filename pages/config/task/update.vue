<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>收益任务配置编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>
              <v-text-field label="标题" type="text" placeholder="输入配置标题" v-model="postData.title"></v-text-field>
              <v-text-field label="标识" type="text" placeholder="输入配置标识" v-model="postData.name"></v-text-field>
              <v-select :items="taskTypes" label="类型" placeholder="选择配置类型" v-model="postData.type"></v-select>
              <v-text-field
                label="积分收益数目"
                type="number"
                placeholder="输入积分收益数目"
                v-model="postData.score"
              ></v-text-field>
              <v-text-field
                label="现金收益数目"
                type="number"
                placeholder="输入现金收益配置数目"
                v-model="postData.balance"
              ></v-text-field>
              <v-text-field
                label="配置限制数目，0为无限制"
                type="number"
                placeholder="输入配置限制数目"
                v-model="postData.limit_count"
              ></v-text-field>
              <v-text-field
                label="配置ip限制数目，0为无限制"
                type="number"
                placeholder="输入配置ip限制数目"
                v-model="postData.limit_ip"
              ></v-text-field>
              <v-text-field
                label="配置id限制数目，0为无限制"
                type="number"
                placeholder="输入配置id限制数目"
                v-model="postData.limit_id"
              ></v-text-field>
              <v-switch v-model="postData.display" label="是否每日任务显示"></v-switch>
              <v-btn color="blue" type="submit" class="ml-0">提交</v-btn>
            </v-flex>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../../components/SubNav";
export default {
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    if (id) {
      if (!store.state.task.info.id) {
        store.dispatch("taskInfoGet", { id: id });
      }
    } else {
      store.state.task.info = {};
    }
  },
  data() {
    return {
      taskTypes: [{ text: "无", value: "" }, { text: "每日任务", value: "day" }]
    };
  },
  components: {
    SubNav
  },
  computed: {
    postData() {
      return this.$store.state.task.info;
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      let ret = await this.$store.dispatch("taskInfoUpdate", postData);
      console.log("submit ret", ret);
      if (ret.code == 0) {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style>
</style>

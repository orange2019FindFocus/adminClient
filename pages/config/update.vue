<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>系统配置编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>
              <v-text-field label="标题" type="text" placeholder="输入配置标题" v-model="postData.title"></v-text-field>
              <v-text-field label="标识" type="text" placeholder="输入配置标识" v-model="postData.name"></v-text-field>
              <v-select
                :items="configTypes"
                label="类型"
                placeholder="选择配置类型"
                v-model="postData.type"
              ></v-select>
              <v-text-field
                label="详情"
                type="number"
                placeholder
                v-model="postData.content"
                v-if="postData.type == 'number'"
              ></v-text-field>
              <v-text-field
                label="详情"
                type="text"
                placeholder
                v-model="postData.content"
                v-if="postData.type == 'string'"
              ></v-text-field>
              <v-text-field
                label="详情"
                type="url"
                placeholder
                v-model="postData.content"
                v-if="postData.type == 'img'"
              ></v-text-field>
              <v-textarea
                label="详情"
                placeholder
                v-model="postData.content"
                v-if="postData.type == 'text'"
              ></v-textarea>
              <v-btn color="blue" type="submit" class="ml-0">提交</v-btn>
            </v-flex>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../components/SubNav";
export default {
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    if (id) {
      if (!store.state.config.info.id) {
        store.dispatch("configInfoGet", { id: id });
      }
    } else {
      store.state.config.info = {};
    }
  },
  data() {
    return {
      configTypes: [
        { text: "字符", value: "string" },
        { text: "数字", value: "number" },
        { text: "文本", value: "text" },
        { text: "图片地址", value: "img" }
        // { text: "编辑器", value: "editor" }
      ]
    };
  },
  components: {
    SubNav
  },
  computed: {
    postData() {
      return this.$store.state.config.info;
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      let ret = await this.$store.dispatch("configInfoUpdate", postData);
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

<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>系统消息编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>
              <v-text-field
                label="标题"
                type="text"
                placeholder="输入配置标题"
                v-model="postData.title"
                required
              ></v-text-field>
              <v-textarea label="系统消息详情" placeholder="请输入详细内容" v-model="postData.info" required></v-textarea>
              <v-switch v-model="postData.push" label="是否可以推送"></v-switch>

              <upload-box
                id="notice-cover"
                label="封面图"
                :uploadUrl="uploadUrl"
                @getUploadUrl="getUploadUrl"
              ></upload-box>

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
import UploadBox from "./../../../components/UploadBox";
export default {
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    if (id) {
      if (!store.state.notice.info.id) {
        store.dispatch("noticeInfoGet", { id: id });
      }
    } else {
      store.state.notice.info = {};
    }
  },
  data() {
    return {
      // uploadUrl: ""
    };
  },
  components: {
    SubNav,
    UploadBox
  },
  computed: {
    postData() {
      return this.$store.state.notice.info;
    },
    uploadUrl() {
      return this.$store.state.notice.info.cover || "";
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      let ret = await this.$store.dispatch("noticeInfoUpdate", postData);
      console.log("submit ret", ret);
      if (ret.code == 0) {
        this.$router.go(-1);
      }
    },
    getUploadUrl(url) {
      this.postData.cover = url;
    }
  }
};
</script>

<style>
</style>

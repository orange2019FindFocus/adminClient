<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>图片信息编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>

              <upload-box
                id="album-cover"
                label="封面图"
                :uploadUrl="uploadUrl"
                @getUploadUrl="getUploadUrl"
              ></upload-box>

              <v-text-field
      
                label="跳转页面"
                type="text"
                placeholder="输入跳转页面"
                v-model="postData.url"
                
              ></v-text-field>
              <v-text-field
                label="简介"
                type="text"
                placeholder="输入简介"
                v-model="postData.title"
                required
              ></v-text-field>
              <v-textarea label="描述" placeholder="请输入描述" v-model="postData.description" required></v-textarea>  

              <v-text-field
      
                label="排序数字"
                type="number"
                placeholder="输入排序数字，越小越前"
                v-model="postData.sort"
                
              ></v-text-field>

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
      if (!store.state.album.info.id) {
        store.dispatch("albumInfoGet", { id: id });
      }
    } else {
      // store.state.album.info = {
      //   type: 'banner'
      // };
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
      return this.$store.state.album.info;
    },
    uploadUrl() {
      return this.$store.state.album.info.img || "";
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      let ret = await this.$store.dispatch("albumInfoUpdate", postData);
      console.log("submit ret", ret);
      if (ret.code == 0) {
        this.$router.go(-1);
      }
    },
    getUploadUrl(url) {
      this.postData.img = url;
    }
  }
};
</script>

<style>
</style>

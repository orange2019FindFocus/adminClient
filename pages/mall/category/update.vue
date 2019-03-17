<template>
  <v-layout row wrap>
    <sub-nav :pid="5" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>商品分类编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>
              <v-text-field
                label="分类名称"
                type="text"
                placeholder="输入配置分类名称"
                v-model="postData.title"
                required
              ></v-text-field>
              <v-text-field
                label="分类标识"
                type="text"
                placeholder="输入配置分类标识"
                v-model="postData.name"
                required
              ></v-text-field>
              <v-text-field
                label="排序"
                type="number"
                placeholder="输入配置排序数字，越小越优先"
                v-model="postData.sort"
                required
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
export default {
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    if (id) {
      if (!store.state.mallCategory.info.id) {
        store.dispatch("mallCategoryInfoGet", { id: id });
      }
    } else {
      store.state.mallCategory.info = {};
    }
  },
  data() {
    return {};
  },
  components: {
    SubNav
  },
  computed: {
    postData() {
      return this.$store.state.mallCategory.info;
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      let ret = await this.$store.dispatch("mallCategoryInfoUpdate", postData);
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

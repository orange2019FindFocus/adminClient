<template>
  <v-layout row wrap>
    <sub-nav :pid="3" :rules="this.$store.state.adminGroupRules" />

    <v-flex xs12>
      <v-card color="light">
        <v-form>
          <v-container grid-list-xs fluid>
            <v-layout row wrap>
              <v-flex xs8>
                <v-text-field
                  label="标题"
                  type="text"
                  placeholder="输入标题"
                  v-model="postData.title"
                  required
                ></v-text-field>

                <v-textarea
                  label="文章简述"
                  name="name"
                  placeholder="请输入简述"
                  v-model="postData.description"
                  required
                ></v-textarea>

                <kind-editor
                  id="post-content"
                  :content="postData.content"
                  label="文章详情"
                  @get-html="getEditorHtml"
                  v-if="postData.type != 3"
                />
                <div v-else v-html="postData.content"></div>
              </v-flex>

              <v-flex xs4 pl-3>
                <v-select :items="postTypes.text" label="选择资讯类别" v-model="postType" disabled="" v-if="postData.type == 2"></v-select>

                <v-select
                  :items="categorys"
                  v-model="postData.category"
                  label=""
                  v-if="postData.type == 2"
                ></v-select>

                <v-select
                  :items="channels"
                  v-model="postData.channel"
                  label=""
                  v-if="postData.type == 4"
                  placeholder="选择广告所在栏目"
                ></v-select>

                <upload-box
                  id="post-cover"
                  label="封面图"
                  :uploadUrl="uploadUrl"
                  @getUploadUrl="getUploadUrl"
                ></upload-box>

                <v-menu
                  ref="datePicker"
                  :close-on-content-click="false"
                  v-model="datePicker.menu"
                  :nudge-right="40"
                  :return-value.sync="datePicker.date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                  class="mt-3"
                >
                  <v-text-field
                    slot="activator"
                    v-model="datePicker.date"
                    label="发布时间"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="datePicker.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePicker.menu = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.datePicker.save(datePicker.date)">确定</v-btn>
                  </v-date-picker>
                </v-menu>

                <v-divider></v-divider>

                <upload-box
                  id="post-audio"
                  label="上传音频"
                  :uploadUrl="uploadUrlAudio"
                  @getUploadUrl="getUploadUrlAudio"
                  uploadType="file"
                  v-if="postData.type == 2"
                ></upload-box>

                <upload-box
                  id="post-video"
                  label="上传视频"
                  :uploadUrl="uploadUrlVideo"
                  @getUploadUrl="getUploadUrlVideo"
                  uploadType="file"
                  v-if="postData.type == 2"
                ></upload-box>

                <v-text-field
                  label="搜索关联商品"
                  type="text"
                  placeholder="输入商品标题进行搜索"
                  v-model="searchGoodsText"
                  @keyup="searchGoods"
                  v-if="postData.type == 2"
                ></v-text-field>

                <div v-if="postData.goods_id">
                  已选择关联商品id:{{postData.goods_id}}
                </div>
                <v-list>
                  <v-list-tile
                    v-for="item in searchGoodsList"
                    :key="item.title"
                    avatar
                    @click="chooseGoods(item)"
                  >

                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-avatar>
                      <img :src="item.cover">
                    </v-list-tile-avatar>
                  </v-list-tile>
                </v-list>
              </v-flex>

              <v-flex xs12>
                <v-btn color="blue" @click="submit" class="ml-0 mt-3" v-if="postData.type != 3">提交</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import KindEditor from "./../../components/KindEditor";
import UploadBox from "./../../components/UploadBox";
import SubNav from "./../../components/SubNav";
import dateUtils from "./../../utils/date_utils.js";
export default {
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    let type = route.query.type || 2
    if (id) {
      store.dispatch("postsInfoGet", { id: id });
    }else {
      store.state.posts.info = {}
      store.state.posts.info.type = type
    }

    store.dispatch('postsChannelsGet')
  },
  data() {
    return {
      datePicker: {
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        modal: false
      },
      postTypes: {
        text: [
          { text: "头条新闻", value: 1 },
          { text: "品牌故事/活动", value: 2 },
          { text: "用户评测", value: 3 },
          { text: "广告流", value: 4}
        ],
        choose: 2
      },
      categorys:[
        // {text: '请选择文章类别' , value: ''},
        {text: '焦点故事', value:'story'},
        {text: '焦点活动', value:'activity'}
      ],
      searchGoodsText:'',
      searchGoodsList:[]
    };
  },
  components: {
    KindEditor,
    UploadBox,
    SubNav
  },
  computed: {
    channels(){
      return this.$store.state.channels
    },
    postType() {
      // return this.$route.query.type || 2;
      return this.$store.state.posts.info.type;
    },
    postData() {
      return this.$store.state.posts.info;
    },
    uploadUrl() {
      return this.$store.state.posts.info.cover || "";
    },
    uploadUrlVideo() {
      return this.$store.state.posts.info.video || "";
    },
    uploadUrlAudio() {
      return this.$store.state.posts.info.audio || "";
    }
  },
  methods: {
    chooseGoods(item){
      this.postData.goods_id = item.id
    },
    async searchGoods(){
      console.log(this.searchGoodsText)
      let data = {keyword: this.searchGoodsText}
      let ret = await this.$store.dispatch('postsUpdateSearchGoods' , data)
      this.searchGoodsList = ret.data.rows || []
    },
    async submit() {
      // console.log(this.content);
      this.postData.pub_date = dateUtils.getTimestamp(this.datePicker.date);
      this.postData.type = this.postType;
      console.log(this.postData);

      // return

      let ret = await this.$store.dispatch("postsInfoUpdate", this.postData);
      if (ret.code == 0) {
        this.$router.go(-1);
      }
    },
    getEditorHtml(html) {
      // this.content = html;
      // console.log(html);
      this.postData.content = html;
      // return html;
    },
    getUploadUrl(url) {
      // console.log("url", url);
      this.postData.cover = url;
      // return url
    },
    getUploadUrlVideo(url) {
      this.postData.video = url;
    },
    getUploadUrlAudio(url) {
      this.postData.audio = url;
    }
  }
};
</script>


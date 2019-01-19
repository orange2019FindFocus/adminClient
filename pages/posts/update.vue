<template>
  <v-layout row wrap>
    <sub-nav-post/>

    <v-flex xs12>
      <v-card color="light">
        <v-form>
          <v-container grid-list-xs fluid>
            <v-layout row wrap>
              <v-flex xs8>
                <v-text-field label="标题" type="text" placeholder="输入文章标题"></v-text-field>

                <v-textarea label="文章简述" name="name" placeholder="请输入文章简述" color="blue"></v-textarea>

                <kind-editor
                  id="content"
                  :content="content"
                  label="文章详情"
                  @get-html="getEditorHtml"
                />
              </v-flex>

              <v-flex xs4 pl-3>
                <v-select :items="postType.text" label="选择资讯类别" v-model="postType.choose"></v-select>

                <upload-box id="post-cover" label="封面图" :url="postData.cover"></upload-box>

                <div class></div>

                <v-menu
                  ref="post_date"
                  :close-on-content-click="false"
                  v-model="post_date.menu"
                  :nudge-right="40"
                  :return-value.sync="post_date.date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                  class="mt-3"
                >
                  <v-text-field
                    slot="activator"
                    v-model="post_date.date"
                    label="发布时间"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="post_date.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="post_date.menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.post_date.save(post_date.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-btn color="blue" @click="submit" class="ml-0 mt-3">提交</v-btn>
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
import SubNavPost from "./../../components/SubNavPost";

export default {
  data() {
    return {
      content: `<h1>editor</h1>`,
      post_date: {
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        modal: false
      },
      postType: {
        text: [
          { text: "头条新闻", value: 1 },
          { text: "品牌故事", value: 2 },
          { text: "用户评测", value: 3 }
        ],
        choose: 2
      }
    };
  },
  components: {
    KindEditor,
    UploadBox,
    SubNavPost
  },
  computed: {},
  methods: {
    submit() {
      // console.log(this.content);
      console.log(this.postType.choose);
    },
    getEditorHtml(html) {
      // this.content = html;
      console.log(html);
      return html;
    }
  }
};
</script>


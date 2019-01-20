<template>
  <div class="w-100 mt-3">
    <div class="mb-3">
      <label for class>{{ label }}</label>
    </div>

    <textarea :id="id" v-html="content" class="w-100 textarea-kindeditor"></textarea>
  </div>
</template>

<script>
// import "./../assets/kindeditor/kindeditor-all.js";
import "./../assets/kindeditor/themes/default/default.css";

export default {
  props: {
    id: String,
    label: String,
    content: String
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    console.log("id:", this.id);
    console.log("content", this.content);
    let self = this;

    this.editor = KindEditor.create("#" + this.id, {
      width: "100%",
      filterMode: false,
      allowFileManager: false,
      uploadJson: "/upload/adminEditor",
      //  fileManagerJson : '/file/data',
      formatUploadUrl: false,
      allowImageRemote: false,
      formatUploadUrl: false,
      urlType: "domain",
      afterBlur: () => {
        // this.sync();
        // console.log("afterBlur");
        // console.log("html:", editor.html());

        self.$emit("get-html", this.editor.html());
      },
      themeType: "simple"
    });
  },
  watch: {
    content(newVal) {
      // console.log("content new val", newVal);
      if (this.editor) {
        this.editor.html(newVal);
      }
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}

.textarea-kindeditor {
  min-height: 400px;
}
</style>


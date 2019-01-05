<template>
  <div class="w-100">
    <div class="mb-1">
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
  mounted() {
    console.log("id:", this.id);
    let self = this;

    let editor = KindEditor.create("#" + this.id, {
      width: "100%",
      filterMode: false,
      allowFileManager: false,
      uploadJson: "/upload",
      //  fileManagerJson : '/file/data',
      formatUploadUrl: false,
      allowImageRemote: true,
      afterBlur: () => {
        // this.sync();
        // console.log("afterBlur");
        // console.log("html:", editor.html());

        self.$emit("get-html", editor.html());
      },
      themeType: "simple"
    });
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


<template>
  <div class="w-100 mt-3">
    <label for>{{ label }}</label>
    <div class="mt-3">
      <v-uploader @done="uploadDone" :preview="false"></v-uploader>
      <div class="mt-3" v-if="uploadUrl" :style="preStyle">
        <img :src="uploadUrl" height="100px" v-if="uploadType == 'image'">
        <div v-else class="text-truncate">{{uploadUrl}}</div>
      </div>

      <div class="mt-1" v-if="returnUrl">
        <img :src="returnUrl" height="100px" v-if="uploadType == 'image'">
        <div v-else class="text-truncate">{{returnUrl}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    uploadUrl: String,
    uploadType: {
      type: String,
      default: "image"
    }
  },
  data() {
    return {
      uploader: null,
      returnUrl: "",
      preStyle: {
        display: "block"
      }
    };
  },
  mounted() {},
  methods: {
    uploadDone(files) {
      if (files && Array.isArray(files) && files.length) {
        console.log(files);
        // this.url = files[0].url;
        this.returnUrl = files[0].url;
        this.preStyle.display = "none";
        this.$emit("getUploadUrl", this.returnUrl);
      }
    }
  }
};
</script>

<style>
</style>

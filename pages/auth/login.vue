<template>
  <v-form ref="form" lazy-validation v-model="valid">
    <div class="title pb-3 text--darken-2">
      <v-icon>person</v-icon>
      <span>登录</span>
    </div>
    <v-divider class="pb-3"></v-divider>

    <v-text-field
      label="邮箱"
      type="email"
      v-model="postData.email"
      placeholder="请输入邮箱地址"
      :rules="[rules.required, rules.email]"
      required
    ></v-text-field>
    <v-text-field
      v-model="postData.password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :rules="[rules.required]"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      label="密码"
      @click:append="show = !show"
      placeholder="请输入密码"
    ></v-text-field>
    <v-btn color="success" class="ml-0" @click="submit">提交</v-btn>
    <v-btn color="warning" @click="reset">重置</v-btn>
  </v-form>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      valid: true,
      postData: {
        email: "",
        password: ""
      },
      show: false,
      rules: {
        required: value => !!value || "必填...",
        email: v => /.+@.+/.test(v) || "邮箱格式错误"
      }
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        console.log("validate true");
        let ret = await this.$store.dispatch("login", this.postData);
        if (ret.code == 0) {
          if (!this.$router.go(-1)) {
            this.$router.push("/");
          }
        }
      } else {
        console.log("validate fasle");
      }
    },
    async reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>

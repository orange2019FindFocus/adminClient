<template>
  <v-layout row wrap>
    <sub-nav :pid="6" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>管理员添加/编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>

              <v-text-field
      
                label="管理员邮箱"
                type="text"
                placeholder="输入管理员邮箱"
                v-model="postData.email"
                
              ></v-text-field>

              <v-text-field
      
                label="密码"
                type="text"
                placeholder="输入密码"
                v-model="postData.password"
                
              ></v-text-field>
              <v-text-field
                label="再次输入密码"
                type="text"
                placeholder="再次输入密码"
                v-model="postData.password_again"
                required
              ></v-text-field>

              <v-select
                  :items="groups"
                  v-model="postData.group_id"
                  label=""
                ></v-select>
             
              <v-btn color="blue" type="submit" class="ml-0">提交</v-btn>
            </v-flex>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from './../../components/SubNav';

export default {
  asyncData({ store, route }) {
    if(route.query.id){
        store.dispatch('adminInfoGet' , {id : route.query.id})
    }else {
      store.state.adminInfo = {}
    }
    
    store.dispatch('groupListGet')
  },
  data() {
    return {
      groups:[]
      // postData:{
      //   email:'',
      //   password:'',
      //   password_again:'',
      //   group_id: 0
      // }
    };
  },
  mounted(){
    let adminGroups = this.$store.state.adminGroups
    console.log('mounted  adminGroups ===' , adminGroups)
    adminGroups.forEach(group => {
      this.groups.push({
        text: group.name,
        value: group.id
      })
    });
    
  },
  components: {
    SubNav
  },
  computed: {
    // groups(){
    //   return [
    //     {text: '超级管理', value : 0}
    //   ]
    // },
    postData(){
      return this.$store.state.adminInfo 
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      // return
      if (!postData.password){
        alert('密码不能为空')
        return
      }
      if(postData.password != postData.password_again){
        alert('两次密码输入不一致')
        return
      }

      let ret = await this.$store.dispatch("adminUpdate", postData);
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

<template>
  <v-layout row wrap>
    <sub-nav :pid="6" :rules="this.$store.state.adminGroupRules" />
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>管理组添加/编辑</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs>
            <v-flex xs6>

              <v-text-field
      
                label="管理组名称"
                type="text"
                placeholder="输入管理员邮箱"
                v-model="postData.name"
                
              ></v-text-field>

              <div>
                权限选择
                
                <div  v-for="(item,index) in rulesList" :key="index">
                  <v-checkbox v-model="rules" :label="item.name" :value="item.id.toString()" v-if="item.pid == 0"></v-checkbox>
                  <v-layout row wrap class="pl-3">
                    <v-flex v-for="(item1,index1) in rulesList" :key="index1" xs2 v-if="item1.pid == item.id">
                      <v-checkbox v-model="rules" :label="item1.name" :value="item1.id.toString()"  ></v-checkbox>
                    </v-flex>
                  </v-layout>
                  
                </div>
              </div>
             
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
        store.dispatch('adminGroupInfoGet' , {id : route.query.id})
    }else {
      store.state.adminGroupInfo = {}
    }

    store.dispatch('rulesListGet')
    
  },
  data() {
    return {
      rules:[]
      // postData:{
      //   email:'',
      //   password:'',
      //   password_again:'',
      //   group_id: 0
      // }
    };
  },
  mounted(){
    if(this.$store.state.adminGroupInfo.rules){
      let rules = this.$store.state.adminGroupInfo.rules.split(',')
      console.log('mounted ======' , rules)
      this.rules = rules
    }
    
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
      return this.$store.state.adminGroupInfo 
    },
    rulesList() {
      return this.$store.state.adminRules
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      postData.rules = this.rules
      console.log(this.postData);
      // return
      if (!postData.name){
        alert('名称不能为空')
        return
      }


      let ret = await this.$store.dispatch("adminGroupUpdate", postData);
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

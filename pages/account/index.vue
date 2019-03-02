<template>
  <v-layout rows nowrap align-center>
    <v-flex xs12>
      <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
        <v-tab v-for="(menu, index) in menus" :key="index" ripple>{{menu}}</v-tab>
        <v-tab-item v-for="n in menus.length" :key="n">

          <v-card flat v-if="n === 1">
            <v-card-text display-1>{{ menus[0] }}</v-card-text>

            <v-flex xs6 style="margin-left: 20px;">
              <v-text-field
                v-model="changePasswd.password1"
                :append-icon="changePasswd.show1 ? 'visibility_off' : 'visibility'"
                :rules="[changePasswd.rules.required, changePasswd.rules.min]"
                :type="changePasswd.show1 ? 'text' : 'password'"
                name="input-10-1"
                label="新输入新密码"
                hint="至少8个字符"
                counter
                @click:append="changePasswd.show1 = !changePasswd.show1"
              ></v-text-field>
              <v-text-field
                v-model="changePasswd.password2"
                :append-icon="changePasswd.show2 ? 'visibility_off' : 'visibility'"
                :rules="[changePasswd.rules.required, changePasswd.rules.min]"
                :type="changePasswd.show2 ? 'text' : 'password'"
                name="input-10-1"
                label="请再次输入新密码"
                hint="至少8个字符"
                counter
                @click:append="changePasswd.show2 = !changePasswd.show2"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 offset-xs2 justify-center>
              <v-btn @click="changePassword">修改密码</v-btn>
            </v-flex>
          </v-card>

          <v-card flat v-if="n === 2">
            <v-flex xs12>
              <div>
                <v-toolbar flat color="white">
                  <v-toolbar-title>{{ menus[1] }}</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-spacer></v-spacer>

                  <v-dialog v-model="administrators.dialog" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">添加管理员</v-btn>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout column nowrap>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-model="administrators.editedItem.email" label="邮箱"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field type="password" v-model="administrators.editedItem.password" label="密码"></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-toolbar>
                <v-data-table :headers="administrators.headers" :items="administratorsList" class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.password }}</td>
                    <td class="justify-center px-0">
                      <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                      <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </v-flex>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.dispatch('administratorList', {}).then(() => {
      console.log('administratorList fetched')
    })
  },

  data() {
    return {
      menus: ["修改密码", "添加管理员"],
      changePasswd: {
        password1: "",
        show1: false,
        password2: "",
        show2: false,
        rules: {
          required: value => !!value || "密码不能为空",
          min: value => value.length >= 8 || "密码长度至少是8位"
        }
      },
      administrators: {
        dialog: false,
        editedItem: {
          email: '',
          password: ''
        },
        headers: [

          {text: '账号', value: 'name', sortabale: false},
          {text: '密码', value: 'password', sortabale: false},
          {text: '操作', value: 'actions', sortabale: false},
        ],
        editedIndex: -1,
      }
    }
  },

  computed: {
    formTitle () {
      return this.administrators.editedIndex === -1 ? '新增管理员' : '编辑管理员'
    },
    administratorsList () {
      return this.$store.state.administratorList.list
    }
  },

  watch: {
    'administrators.dialog': function (oldVal, newVal) {
      if (!this.administrators.dialog) { // close dialog, reset env
        this.administrators.editedIndex = -1
      }
    }
  },

  methods: {
    changePassword() {
      console.log("changePassword")
    },

    editItem (item) {
      console.log('editItem: ', item)
      this.administrators.editedIndex = this.administratorsList.indexOf(item)
      this.administrators.editedItem.email = item.email
      this.administrators.editedItem.password = item.password

      this.administrators.dialog = true
    },

    deleteItem (item) {
      console.log('deleteItem: ', item)
      let index = this.administratorsList.indexOf(item)
      let id = this.administratorsList[index].id

      this.$store.dispatch('deleteAdministratorAccount', {id}).then(response => {
        this.administratorsList.splice(index, 1)
      })
      // forceUpdate
    },

    close () {
      this.administrators.dialog = false
    },

    save () {
      let email = this.administrators.editedItem.email
      let password = this.administrators.editedItem.password

      if (!email || !password) {
        alert('姓名和密码都不能为空')
        return
      }

      if (this.administrators.editedIndex === -1) { // new account
        this.$store.dispatch('newAdministratorAccount', {email, password}).then(response => {
          // 新增管理员成功
          this.close()
          this.$store.dispatch('administratorList', {}).then(() => {
            console.log('administratorList fetched')
            // this.$forceUpdate()
          })

        })
      } else { // update account
        let reqData = this.administratorsList[this.administrators.editedIndex]
        reqData.email = this.administrators.editedItem.email
        reqData.password = this.administrators.editedItem.password
        console.log('updateAdministratorAccount: ', reqData)

        this.$store.dispatch('updateAdministratorAccount', reqData).then(response => {
          console.log('updated')
          this.close()
        })
      }
    }
  }
};
</script>


import request from './../request'

export default {
  async login({
    state
  }, body) {
    let ret = await request.post('/api/auth/login', body)
    console.log('actions auth login ret', ret)
    if (ret.code == 0) {
      state.AUTH.isLogin = true
      state.AUTH.admin = ret.session.AUTH.admin
    } else {
      console.log('登录失败')
    }

    return ret
  },

  async logout({
    state
  }) {
    let ret = await request.post('/api/auth/logout', {})
    console.log('actions auth logout ret', ret)
    if (ret.code == 0) {
      state.AUTH.isLogin = false
      state.AUTH.admin = {}
    }

    return ret
  },

  async authCheck({
    state
  }) {
    let ret = await request.post('/api/auth/check', {})
    console.log('actions auth check ret', ret)
    if (ret.code == 0) {
      state.AUTH.isLogin = true
      state.AUTH.admin = ret.data.admin
    } else {
      state.AUTH.isLogin = false
      state.AUTH.admin = {}
    }

    return ret
  },

  async adminListGet({state} , data){
    let ret = await request.post('/api/auth/adminList' , data)
    console.log('/api/auth/adminList ret' , ret)
    if(ret.code == 0){
      state.adminLists = ret.data
    }
    return ret
  },

  async adminInfoGet({state} , data) {
    let ret = await request.post('/api/auth/adminInfo' , {id: data.id})
    console.log('/api/auth/adminUpdate ret' , ret)
    if(ret.code == 0){
      state.adminInfo = ret.data
    }
    return ret
  },

  async adminUpdate({state} , data) {
    let ret = await request.post('/api/auth/adminUpdate' , data)
    console.log('/api/auth/adminUpdate ret' , ret)
    return ret
  },

  async adminGroupInfo({state} , data = {}){
    let ret = await request.post('/api/auth/adminGroupInfo' , data)
    console.log('/api/auth/adminGroupInfo ret' , ret)
    if(ret.code == 0){
      // state.adminGroupInfo = ret.data.group
      state.adminGroupRules = ret.data.rules
    }
    return ret
  },

  async adminGroupInfoGet({state} , data = {}){
    let ret = await request.post('/api/auth/groupInfoGet' , data)
    console.log('/api/auth/groupInfoGet ret' , ret)
    if(ret.code == 0){
      state.adminGroupInfo = ret.data
    }
    return ret
  },

  async groupListGet({state}) {
    let ret = await request.post('/api/auth/groupList' , {})
    console.log('/api/auth/groupList ret ======' , ret)
    if(ret.code == 0){
      state.adminGroups = ret.data
    }
    return ret
  },

  async adminGroupUpdate({state} , data){
    let ret = await request.post('/api/auth/adminGroupUpdate' , data)
    console.log('/api/auth/adminGroupUpdate ret' , ret)
    return ret
  },

  async rulesListGet({state}){
    let ret = await request.post('/api/auth/rulesList' , {})
    console.log('/api/auth/rulesList ret ======' , ret)
    if(ret.code == 0){
      state.adminRules = ret.data
    }
    return ret
  }


}

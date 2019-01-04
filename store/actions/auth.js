import request from './../request'

export default {
  async login({
    state
  }, body) {
    let ret = await request.post('/api/auth/login', body)
    console.log('actions auth login ret', ret)
    if (ret.code == 0) {
      state.AUTH.isLogin = true
      state.AUTH.admin = ret.data
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
      state.AUTH.admin = ret.data
    } else {
      state.AUTH.isLogin = false
      state.AUTH.admin = {}
    }

    return ret
  }
}

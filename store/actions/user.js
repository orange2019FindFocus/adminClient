import request from './../request'

export default {
  async userListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.user.limit || 1
    let ret = await request.post('/api/user/list', data)
    if (ret.code == 0) {
      store.state.user.list = ret.data.rows
      store.state.user.count = ret.data.count
      store.state.user.page = data.page
    } else {
      console.log('request ret', ret.message)
    }
  }
}

import request from './../request'

export default {
  async configListGet(store, data = {}) {
    // data.page = data.page || 1
    // data.limit = store.state.user.limit || 1
    let ret = await request.post('/api/config/list', data)
    if (ret.code == 0) {
      store.state.config.list = ret.data.rows
      store.state.config.count = ret.data.count
      // store.state.config.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async configInfoGet(store, data = {}) {
    let ret = await request.post('/api/config/info', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.config.info = ret.data.info
    } else {
      console.log('request configInfoGet err', ret.message)
    }

    return ret
  },
  async configInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/config/update', data)
    if (ret.code == 0) {
      // store.state.config.info = ret.data.info

    } else {
      console.log('request configInfoGet err', ret.message)
    }

    return ret
  },
  async configGetJdBalance(store, data = {}) {
    let ret = await request.post('/api/config/getJdBalance', data)
    console.log('/api/config/getJdBalance ret', ret)
    if (ret.code == 0) {
      store.state.config.jdBalance = ret.data.result
    } else {
      store.state.config.jdBalance = '获取失败'
    }
    return ret
  },
  async configGetSmsBalance(store, data = {}) {
    let ret = await request.post('/api/config/getSmsBalance', data)
    console.log('/api/config/getSmsBalance ret', ret)
    if (ret.code == 0) {
      store.state.config.smsBalance = ret.data.balance
    } else {
      store.state.config.smsBalance = '获取失败'
    }
    return ret
  }

}

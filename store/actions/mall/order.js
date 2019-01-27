import request from './../../request'

export default {
  async mallOrderListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.mallOrder.limit || 10
    let ret = await request.post('/api/mall/orderList', data)
    if (ret.code == 0) {
      store.state.mallOrder.list = ret.data.rows
      store.state.mallOrder.count = ret.data.count
      // store.state.mallOrder.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async mallOrderInfoGet(store, data = {}) {
    let ret = await request.post('/api/mall/orderInfo', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.mallOrder.info = ret.data.info
    } else {
      console.log('request mallOrderInfoGet err', ret.message)
    }

    return ret
  },
  async mallOrderInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/mall/orderUpdate', data)
    if (ret.code == 0) {
      // store.state.mallOrder.info = ret.data.info

    } else {
      console.log('request mallOrderInfoGet err', ret.message)
    }

    return ret
  }
}

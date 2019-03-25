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
      store.state.mallOrder.info = ret.data
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
  },

  // 发货 data: {orderId, company, expressNo}
  async dispatchGoods(store, data) {
    let ret = await request.post('/api/mall/dispatchGoods', data)

    return ret
  },

  /**
   * 获取完成订单的评论列表
   * @param {*} store
   * @param {*} data {page, search}
   */
  async orderCommentList(store, data) {
    let requestData = {
      ...data,
      limit: store.state.mallOrderComment.limit,
      page: store.state.mallOrderComment.page
    }
    let ret = await request.post('/api/mall/orderCommentList', requestData)

    if (ret.code === 0) {
      store.state.mallOrderComment.list = ret.data.rows
      store.state.mallOrderComment.total = ret.data.count
    } else {
      // error, do nothing here
    }

    return ret
  },

  async orderAftersGet(store, data = {}) {

    let ret = await request.post('/api/mall/orderAfters', data)
    if (ret.code == 0) {
      store.state.orderAfter.list = ret.data.rows
      store.state.orderAfter.count = ret.data.count
    }
    return ret
  },

  async orderAfterDetailGet(store, data = {}) {
    let ret = await request.post('/api/mall/orderAftetDetail', data)
    console.log('orderAfterDetailGet ret', ret)
    return ret
  },

  async orderAfterDeal(store, data = {}) {
    let ret = await request.post('/api/mall/orderAfterDeal', data)
    console.log('orderAfterDeal ret', ret)
    return ret
  },

  async orderCancelDeal(store, data = {}) {
    let ret = await request.post('/api/mall/orderCancelDeal', data)
    console.log('orderCancelDeal ret', ret)
    return ret
  },

  async orderExportData(store, data = {}) {
    let ret = await request.post('/api/mall/orderExport', data)
    console.log('orderExport ret', ret)
    return ret
  }


}

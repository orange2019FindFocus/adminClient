import request from './../../request'

export default {
  async mallPaymentListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.mallPayment.limit || 10
    let ret = await request.post('/api//mall/paymentList', data)
    console.log('/api//mall/paymentList ret' , ret)
    if (ret.code == 0) {
      store.state.mallPayment.list = ret.data.rows
      store.state.mallPayment.count = ret.data.count
      // store.state.mallPayment.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async mallPaymentInfoGet(store, data = {}) {
    let ret = await request.post('/api//mall/paymentInfo', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.mallPayment.info = ret.data.info
    } else {
      console.log('request mallPaymentInfoGet err', ret.message)
    }

    return ret
  },
  async mallPaymentInfoUpdate(store, data = {}) {
    let ret = await request.post('/api//mall/paymentUpdate', data)
    if (ret.code == 0) {
      // store.state.mallPayment.info = ret.data.info

    } else {
      console.log('request mallPaymentInfoGet err', ret.message)
    }

    return ret
  },

  async paymentExportData(store , data = {}){
    let ret = await request.post('/api/mall/paymentExport', data)
    console.log('orderExport ret', ret)
    return ret
  }
}

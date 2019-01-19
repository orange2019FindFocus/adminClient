import request from './../../request'

export default {
  async mallGoodsListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.mallGoods.limit || 1
    let ret = await request.post('/api/mall/goodsList', data)
    if (ret.code == 0) {
      store.state.mallGoods.list = ret.data.rows
      store.state.mallGoods.count = ret.data.count
      // store.state.mallGoods.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async mallGoodsInfoGet(store, data = {}) {
    let ret = await request.post('/api/mall/goodsInfo', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.mallGoods.info = ret.data.info
    } else {
      console.log('request mallGoodsInfoGet err', ret.message)
    }

    return ret
  },
  async mallGoodsInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/mall/goodsUpdate', data)
    if (ret.code == 0) {
      // store.state.mallGoods.info = ret.data.info

    } else {
      console.log('request mallGoodsInfoGet err', ret.message)
    }

    return ret
  }
}

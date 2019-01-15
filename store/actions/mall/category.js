import request from './../../request'

export default {
  async mallCategoryListGet(store, data = {}) {
    // data.page = data.page || 1
    // data.limit = store.state.user.limit || 1
    let ret = await request.post('/api/mall/categoryList', data)
    if (ret.code == 0) {
      store.state.mallCategory.list = ret.data.rows
      store.state.mallCategory.count = ret.data.count
      // store.state.mallCategory.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async mallCategoryInfoGet(store, data = {}) {
    let ret = await request.post('/api/mall/categoryInfo', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.mallCategory.info = ret.data.info
    } else {
      console.log('request mallCategoryInfoGet err', ret.message)
    }

    return ret
  },
  async mallCategoryInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/mall/categoryUpdate', data)
    if (ret.code == 0) {
      // store.state.mallCategory.info = ret.data.info

    } else {
      console.log('request mallCategoryInfoGet err', ret.message)
    }

    return ret
  }
}

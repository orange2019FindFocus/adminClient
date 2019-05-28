import request from './../request'

export default {
  async userListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.user.limit || 10
    let ret = await request.post('/api/user/list', data)
    if (ret.code == 0) {
      store.state.user.list = ret.data.rows
      store.state.user.count = ret.data.count
      // store.state.user.page = data.page
    } else {
      console.log('request ret', ret.message)
    }
  },

  async userShareListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.userShare.limit || 10
    let ret = await request.post('/api/user/shareList', data)
    if (ret.code == 0) {
      store.state.userShare.list = ret.data.rows
      store.state.userShare.count = ret.data.count
      // store.state.userShare.page = data.page
    } else {
      console.log('request ret', ret.message)
    }
  },

  async userShareInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/user/shareUpdate', data)
    if (ret.code == 0) {

    } else {
      console.log('request postsCommentUpdate err', ret.message)
    }

    return ret
  },

  async userDailySignListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.userDailySign.limit || 1
    let ret = await request.post('/api/user/dailySignList', data)
    if (ret.code == 0) {
      store.state.userDailySign.list = ret.data.rows
      store.state.userDailySign.count = ret.data.count
      // store.state.userShare.page = data.page
    } else {
      console.log('request ret', ret.message)
    }
  },

  async userAddressListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.userAddress.limit || 1
    let ret = await request.post('/api/user/addressList', data)
    if (ret.code == 0) {
      store.state.userAddress.list = ret.data.rows
      store.state.userAddress.count = ret.data.count
      // store.state.userShare.page = data.page
    } else {
      console.log('request ret', ret.message)
    }
  },

  // 获取审核列表
  async getUserAuditList (store, data = {page: 1}) {
    data.page = data.page || 1
    data.limit = store.state.userAuditList.limit || 10
    data.search = data.search || ''
    let ret = await request.post('/api/user/auditList', data)
    if (ret.code === 0) {
      store.state.userAuditList.list = ret.data.rows
      store.state.userAuditList.total = ret.data.count
    } else {

    }
  },

  // 获取收藏列表
  async getUserCollectionList (store, data = {page: 1, search: ''}) {
    data.page = data.page || 1
    data.limit = store.state.userCollectionList.limit || 10
    data.search = data.search || ''

    let ret = await request.post('/api/user/collectionList', data)
    if (ret.code === 0) {
      store.state.userCollectionList.list = ret.data.rows
      store.state.userCollectionList.total = ret.data.count
      return 0
    }

    // get collection list failed
    // do nothing here
  },


  async userTransactionListGet(store, data = {}){
    data.page = data.page || 1
    data.limit = store.state.userTransaction.limit || 10
    let ret = await request.post('/api/user/transactionList', data)
    if (ret.code == 0) {
      store.state.userShare.list = ret.data.rows
      store.state.userShare.count = ret.data.count
      // store.state.userShare.page = data.page
    } else {
      console.log('request ret', ret.message)
    }
  },

  async userTransactionUpdate(store, data = {}){
    let ret = await request.post('/api/user/transactionUpdate', data)
    if (ret.code == 0) {

    } else {
      console.log('request postsCommentUpdate err', ret.message)
    }

    return ret
  },

  async userExport(store , data= {}){
    let ret = await request.post('/api/user/dataExport', data)
    console.log('orderExport ret', ret)
    return ret
  }


}

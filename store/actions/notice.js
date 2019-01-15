import request from './../request'

export default {
  async noticeListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.notice.limit || 1
    let ret = await request.post('/api/notice/list', data)
    if (ret.code == 0) {
      store.state.notice.list = ret.data.rows
      store.state.notice.count = ret.data.count
      store.state.notice.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async noticeInfoGet(store, data = {}) {
    let ret = await request.post('/api/notice/info', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.notice.info = ret.data.info
    } else {
      console.log('request noticeInfoGet err', ret.message)
    }

    return ret
  },
  async noticeInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/notice/update', data)
    if (ret.code == 0) {
      // store.state.notice.info = ret.data.info

    } else {
      console.log('request noticeInfoGet err', ret.message)
    }

    return ret
  },
  async noticeSend(store, data = {}) {
    let ret = await request.post('/api/notice/send', data)
    if (ret.code == 0) {
      // store.state.noticeLogs.list = ret.data.rows
      // store.state.noticeLogs.count = ret.data.count
      // store.state.noticeLogs.page = data.page
    } else {
      console.log('request noticeLogs ret', ret.message)
    }

    return ret
  }
}

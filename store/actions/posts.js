import request from './../request'

export default {
  async postsListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.posts.limit || 1
    data.type = store.state.posts.type || 1
    let ret = await request.post('/api/posts/list', data)
    if (ret.code == 0) {
      store.state.posts.list = ret.data.rows
      store.state.posts.count = ret.data.count
      // store.state.posts.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async postsInfoGet(store, data = {}) {
    let ret = await request.post('/api/posts/info', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.posts.info = ret.data.info
    } else {
      console.log('request postsInfoGet err', ret.message)
    }

    return ret
  },
  async postsInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/posts/update', data)
    if (ret.code == 0) {
      // store.state.posts.info = ret.data.info

    } else {
      console.log('request postsInfoGet err', ret.message)
    }

    return ret
  }
}

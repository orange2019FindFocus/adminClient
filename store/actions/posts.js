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
  },
  async postsViewListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.postsView.limit || 1
    let ret = await request.post('/api/posts/viewList', data)
    if (ret.code == 0) {
      store.state.postsView.list = ret.data.rows
      store.state.postsView.count = ret.data.count
      // store.state.posts.page = data.page
    } else {
      console.log('request postsViewListGet ret', ret.message)
    }

    return ret
  },
  async postsLikeListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.postsLike.limit || 1
    let ret = await request.post('/api/posts/likeList', data)
    if (ret.code == 0) {
      store.state.postsLike.list = ret.data.rows
      store.state.postsLike.count = ret.data.count
      // store.state.posts.page = data.page
    } else {
      console.log('request postsLikeListGet ret', ret.message)
    }

    return ret
  },
  async postsCommentListGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.postsComment.limit || 1
    let ret = await request.post('/api/posts/commentList', data)
    if (ret.code == 0) {
      store.state.postsComment.list = ret.data.rows
      store.state.postsComment.count = ret.data.count
      // store.state.posts.page = data.page
    } else {
      console.log('request postsLikeListGet ret', ret.message)
    }

    return ret
  },
  async postsCommentUpdate(store, data = {}) {
    let ret = await request.post('/api/posts/commentUpdate', data)
    if (ret.code == 0) {
      // store.state.mallCategory.info = ret.data.info

    } else {
      console.log('request postsCommentUpdate err', ret.message)
    }

    return ret
  },
  async postsUpdateSearchGoods(store, data = {}){
    let ret = await request.post('/api/posts/searchGoods' , data)
    console.log('request postsUpdateSearchGoods ret', ret)
    return ret
  },
  async postsChannelsGet(store, data = {}){
    let ret = await request.post('/api/posts/channels' , data)
    console.log('request postsChannelsGet ret', ret)
    if(ret.code == 0){
      store.state.channels = ret.data
    }
    return ret
  }
}

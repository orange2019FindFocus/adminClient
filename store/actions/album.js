import request from '../request'
export default {
  async getAlbumList(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.album.limit || 10
  
    let ret = await request.post('/api/album/list', data)
    if (ret.code == 0) {
      store.state.album.list = ret.data.rows
      store.state.album.count = ret.data.count
      store.state.album.page = data.page
    } else {  
      console.log('request ret', ret.message)
    }

    return ret
  },

  async albumInfoUpdate(store, data = {}){
    let ret = await request.post('/api/album/update', data)
    return ret
  }
}
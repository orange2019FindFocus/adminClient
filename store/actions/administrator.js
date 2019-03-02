import request from '../request'

export default {
  async administratorList (store, data) {
    let ret = await request.post('/api/administrator/administratorList', data)
    if (ret.code === 0) {
      store.state.administratorList.list = ret.data
    } else {
      // fetch administrator list failed
    }
    return ret
  },

  /**
   * 创建新管理员账户
   * @param {*} store
   * @param {*} data
   */
  async newAdministratorAccount (store, data) {
    let ret = await request.post('/api/administrator/administratorNew', data)
    if (ret.code === 0) {
      // store.state.administratorList.list = ret.data
    } else {

    }

    return ret
  },

  /**
   * 更新管理员信息
   * @param {*} store
   * @param {*} data
   */
  async updateAdministratorAccount (store, data) {
    let ret = await request.post('/api/administrator/administratorUpdate', data)
    if (ret.code === 0) {
      console.log('updateAdministratorAccount Successed')
    } else {

    }

    return ret
  },

  /**
   * 删除账户
   * @param {*} store
   * @param {*} data
   */
  async deleteAdministratorAccount (store, data) {
    let ret = await request.post('/api/administrator/administratorDelete', data)
    if (ret.code === 0) {

    } else {

    }

    return ret
  }
}

import request from './../request'

export default {
  async taskListGet(store, data = {}) {
    // data.page = data.page || 1
    // data.limit = store.state.user.limit || 1
    let ret = await request.post('/api/task/list', data)
    if (ret.code == 0) {
      store.state.task.list = ret.data.rows
      store.state.task.count = ret.data.count
      // store.state.task.page = data.page
    } else {
      console.log('request ret', ret.message)
    }

    return ret
  },
  async taskInfoGet(store, data = {}) {
    let ret = await request.post('/api/task/info', {
      id: data.id
    })
    if (ret.code == 0) {
      store.state.task.info = ret.data.info
    } else {
      console.log('request taskInfoGet err', ret.message)
    }

    return ret
  },
  async taskInfoUpdate(store, data = {}) {
    let ret = await request.post('/api/task/update', data)
    if (ret.code == 0) {
      // store.state.task.info = ret.data.info

    } else {
      console.log('request taskInfoGet err', ret.message)
    }

    return ret
  },
  async taskLogsGet(store, data = {}) {
    data.page = data.page || 1
    data.limit = store.state.taskLogs.limit || 10
    let ret = await request.post('/api/task/logs', data)
    if (ret.code == 0) {
      store.state.taskLogs.list = ret.data.rows
      store.state.taskLogs.count = ret.data.count
      store.state.taskLogs.page = data.page
    } else {
      console.log('request taskLogs ret', ret.message)
    }

    return ret
  }
}

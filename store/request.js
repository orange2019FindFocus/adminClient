import request from 'superagent'

class Request {

  async post(url, data) {
    let ret = await request.post(url).type('json').send(data)
    console.log('response ret', ret.body)
    return ret.body
  }
}

export default new Request

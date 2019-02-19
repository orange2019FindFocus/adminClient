import request from 'superagent'

class Request {

  async post(url, data) {
    console.log(url, data)
    let ret = await request.post(url).type('json').send(data)
    console.log('response ret', ret.body)
    return ret.body
  }

  async get(url, data) {
    console.log("GET ", url, data);
    let response = await request.get(url).type('json').query(data);
    console.log('response ret ', response);
    return response;
  }
}

export default new Request

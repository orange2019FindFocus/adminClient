const request = require('superagent')
const config = require('./config')
const cryptoUtils = require('./../utils/crypto_utils')
const uuid = require('uuid')

class Request {

  async post(url, data) {

    console.log('request url:', url, data)

    let content = {
      query: data.query || {},
      body: data.body || {},
      session: data.session || {}
    }
    let sign = this.sign(content)
    let body = {
      uuid: uuid.v4(),
      content: content,
      sign: sign
    }

    let domain = (process.env.NODE_ENV == 'production') ? 'http://api.faxianjiaodian.com' : 'http://127.0.0.1'
    let port = (process.env.NODE_ENV == 'production') ? '80' : config.api_port
    url = `${domain}:${port}/admin/` + url
    // url = `https://api.faxianjiaodian.com/admin/` + url

    let ret = await request.post(url).type('json').send(body)
    console.log('request ret', ret.body)
    return ret.body
  }

  sign(data) {
    return cryptoUtils.hmacMd5Obj(data, config.signKey)
  }
}

module.exports = new Request

module.exports = (req, res, next) => {

  console.log('req.originalUrl', req.originalUrl)
  let unLimitAuthPath = ['/auth', '/_nuxt', '/favicon.ico', '/assets', 'webpack']
  let needAuth = true
  unLimitAuthPath.forEach(path => {
    if (req.originalUrl.indexOf(path) > -1) {
      needAuth = false
    }
  })

  if (!needAuth) {
    console.log('============ next')
    next()
  } else {
    let auth = req.session.AUTH

    if (!auth || !auth.admin || !auth.admin.id) {
      if (req.xhr) {
        return res.json({
          code: -100
        })
      } else {
        return res.redirect('/auth/login')
      }
    } else {
      next()
    }
  }

}

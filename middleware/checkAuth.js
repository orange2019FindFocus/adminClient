export default async ({
  store,
  route,
  redirect
}) => {
  // context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  // console.log('==================', context)
  // let url = context.req.url
  // console.log('=============', url)
  // console.log(store.state)
  // console.log(route)

  if (process.server) {
    console.log('middleware authCheck server')
  } else {
    let isLogin = store.state.AUTH.isLogin

    let unLimitAuthPath = ['/auth']
    let needAuth = true
    unLimitAuthPath.forEach(path => {
      if (route.path.indexOf(path) > -1) {
        needAuth = false
      }
    })

    if (needAuth && !isLogin) {
      await store.dispatch('authCheck')

      if (!store.state.AUTH.isLogin) {
        redirect('/auth/login')
      } else {
        console.log('middleware authCheck success store')
      }
    } else {
      console.log('middleware authCheck success isLogin or no need')
    }
  }


}

import authActions from './actions/auth'
import userActions from './actions/user'
import taskActions from './actions/task'
import noticeActions from './actions/notice'
import configActions from './actions/config'
import mallCagegoryActions from './actions/mall/category'
import postsActions from './actions/posts'

export default {
  ...authActions,
  ...userActions,
  ...taskActions,
  ...noticeActions,
  ...configActions,
  ...mallCagegoryActions,
  ...postsActions

}

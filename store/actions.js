import authActions from './actions/auth'
import userActions from './actions/user'
import taskActions from './actions/task'
import noticeActions from './actions/notice'
import configActions from './actions/config'
import mallCagegoryActions from './actions/mall/category'
import mallGoodsActions from './actions/mall/goods'
import mallOrderActions from './actions/mall/order'
import mallPaymentActions from './actions/mall/payment'
import postsActions from './actions/posts'
import atlasActions from './actions/atlas'

export default {
  ...authActions,
  ...userActions,
  ...taskActions,
  ...noticeActions,
  ...configActions,
  ...mallCagegoryActions,
  ...mallGoodsActions,
  ...mallOrderActions,
  ...mallPaymentActions,
  ...postsActions,
  ...atlasActions

}

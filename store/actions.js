import authActions from './actions/auth'
import userActions from './actions/user'
import taskActions from './actions/task'

export default {
  ...authActions,
  ...userActions,
  ...taskActions

}

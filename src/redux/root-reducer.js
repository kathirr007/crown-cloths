import { combineReducers } from 'redux'

import userRducer from './user/user.reducer'

export default combineReducers({
  user: userRducer
})

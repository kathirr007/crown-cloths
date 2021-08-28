import { combineReducers } from 'redux'

import userRducer from './user/user.reducer'
import cartRducer from './cart/cart.reducer'

export default combineReducers({
  user: userRducer,
  cart: cartRducer
})

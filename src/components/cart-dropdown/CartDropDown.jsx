import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '@/redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CustomButton from '../custom-button/CustomButton'
import CartItem from '@/components/cart-item/CartItem'

import './CartDropDown.scss'

const CartDropDown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        dispatch(toggleCartHidden())
        history.push('/checkout')
      }}
    >
      Go To Checkout
    </CustomButton>
  </div>
)

const mapStateToProps = createStructuredSelector({ cartItems: selectCartItems })

export default withRouter(connect(mapStateToProps)(CartDropDown))

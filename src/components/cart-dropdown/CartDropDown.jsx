import { connect } from 'react-redux'
import { selectCartItems } from '@/redux/cart/cart.selectors'

import CustomButton from '../custom-button/CustomButton'
import CartItem from '@/components/cart-item/CartItem'

import './CartDropDown.scss'

const CartDropDown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>Go To Checkout</CustomButton>
  </div>
)

const mapStateToProps = (state) => ({ cartItems: selectCartItems(state) })

export default connect(mapStateToProps)(CartDropDown)

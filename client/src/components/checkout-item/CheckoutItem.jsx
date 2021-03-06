import './CheckoutItem.scss'
import { connect } from 'react-redux'
import {
  clearItemFromCart,
  addItem,
  removeItem
} from '../../redux/cart/cart.actions'

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItem }) => {
  const { name, imageUrl, price, quantity } = cartItem
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div
          className='arrow'
          role='button'
          tabIndex='0'
          onClick={() => removeItem(cartItem)}
          onKeyUp={(e) => e.key === 'Enter' && removeItem(cartItem)}
        >
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div
          className='arrow'
          role='button'
          tabIndex='0'
          onClick={() => addItem(cartItem)}
          onKeyUp={(e) => e.key === 'Enter' && addItem(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <span
        className='remove-button'
        role='button'
        tabIndex='0'
        onClick={() => clearItem(cartItem)}
        onKeyUp={(e) => e.key === 'Enter' && clearItem(cartItem)}
      >
        &#10005;
      </span>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)

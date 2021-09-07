import { Link } from 'react-router-dom'
// import { auth } from '@/firebase/firebase.utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { signOutStart } from '../../redux/user/user.actions'

import CartIcon from '../cart-icon/CartIcon'
import CartDropDown from '../cart-dropdown/CartDropDown'
import { ReactComponent as Logo } from '@/assets/crown.svg'

import { HeaderContainer, OptionsContainer, OptionLink } from './Header.styles'

import './Header.scss'

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <Link className='logo-container' to='/'>
      <h1 className='sr-only'>Crown Cloths</h1>
      <Logo className='logo' />
    </Link>
    <OptionsContainer>
      <OptionLink to='/shop'>Shop</OptionLink>
      {/* <OptionLink to="/shop">
        Contact
      </OptionLink> */}
      {currentUser ? (
        <OptionLink
          as='div'
          onClick={signOutStart}
          role='navigation'
          onKeyUp={(e) => e.key === 'Enter' && signOutStart}
        >
          Sign Out
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>Sign in</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown />}
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

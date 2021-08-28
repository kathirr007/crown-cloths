import { Link } from 'react-router-dom'
import { auth } from '@/firebase/firebase.utils'
import { connect } from 'react-redux'

import CartIcon from '../cart-icon/CartIcon'
import CartDropDown from '../cart-dropdown/CartDropDown'
import { ReactComponent as Logo } from '@/assets/crown.svg'

import './Header.scss'

const Header = ({ currentUser, hidden }) => (
  <header className='header'>
    <Link className='logo-container' to='/'>
      <h1 className='sr-only'>Crown Cloths</h1>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        Shop
      </Link>
      <Link className='option' to='/shop'>
        Contact
      </Link>
      {currentUser ? (
        <div
          className='option'
          onClick={() => auth.signOut()}
          role='navigation'
          onKeyUp={(e) => e.key === 'Enter' && auth.signOut()}
        >
          Sign Out
        </div>
      ) : (
        <Link className='option' to='/signin'>
          Sign in
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropDown />}
  </header>
)

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header)

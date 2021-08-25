import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'

import './Header.scss'

const Header = () => (
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
    </div>
  </header>
)

export default Header

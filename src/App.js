import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { loadFonts } from './utils/utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions'

import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import Header from './components/header/Header'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage'

import './App.scss'

let fontsToLoad = [
  {
    name: 'openSansCondensed',
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap'
  }
]

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    loadFonts(fontsToLoad)

    checkUserSession()
  }, [checkUserSession])

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth()
  // }

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

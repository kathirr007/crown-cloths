import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { loadFonts } from './utils/utils'
// import { auth, createUserProfileDocument } from './firebase/firebase.utils'
// import { onSnapshot } from 'firebase/firestore'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
import { selectCollectionsForPreview } from './redux/shop/shop.selectors'
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

class App extends React.Component {
  // unsubscribeFromAuth = null

  componentDidMount() {
    loadFonts(fontsToLoad)

    // const { setCurrentUser } = this.props

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth)
    //     onSnapshot(userRef, (snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //     })
    //   }
    //   setCurrentUser(userAuth)
    // })

    const { checkUserSession } = this.props
    checkUserSession()
  }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth()
  // }

  render() {
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
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

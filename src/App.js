import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { loadFonts } from './utils/utils'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { onSnapshot } from 'firebase/firestore'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
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
  unsubscribeFromAuth = null

  componentDidMount() {
    loadFonts(fontsToLoad)

    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

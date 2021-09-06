import { takeLatest, put, all, call } from '@redux-saga/core/effects'
import { signInWithPopup } from '@firebase/auth'

import UserActionTypes from './user.types'
import {
  auth,
  googleProvider,
  createUserProfileDocument
} from '../../firebase/firebase.utils'
import { googleSignInSuccess, googleSignInFailure } from './user.actions'
import { getDoc } from '@firebase/firestore'

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider)
    const userRef = yield call(createUserProfileDocument, user)
    debugger
    const userSnapshot = yield getDoc(userRef)
    yield put(
      googleSignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
      })
    )
    // .then((result) => {
    // // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result)
    // const token = credential.accessToken
    // // The signed-in user info.
    // const user = result.user
    // // ...
    // })
    // .catch((error) => {
    // // Handle Errors here.
    // const errorCode = error.code
    // const errorMessage = error.message
    // // The email of the user's account used.
    // const email = error.email
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error)
    // // ...
    // })
  } catch (error) {
    yield put(googleSignInFailure(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)])
}

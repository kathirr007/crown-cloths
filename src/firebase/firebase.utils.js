/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyALb0ko0z3DlRDqTygrDKzo2EwDXFaflu8',
  authDomain: 'crown-db-42513.firebaseapp.com',
  projectId: 'crown-db-42513',
  storageBucket: 'crown-db-42513.appspot.com',
  messagingSenderId: '892267198557',
  appId: '1:892267198557:web:3f121da1a61884a15a35b4',
  measurementId: 'G-6NQR1EMTDC'
}
const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const appFirestore = getFirestore(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })

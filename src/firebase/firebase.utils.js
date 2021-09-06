/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  setDoc,
  writeBatch
} from 'firebase/firestore'
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
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider)
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return
  const userRef = doc(db, `users/${userAuth.uid}`)
  const snapShot = await getDoc(userRef)

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      const newUser = await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })

      console.log('New User has been added with ID: ', newUser.id)
    } catch (error) {
      console.log(`Error in creating user ${error.message}`)
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  console.log(collectionRef)
  const batch = writeBatch(db)

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collection(db, collectionKey))
    console.log(newDocRef)
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
}

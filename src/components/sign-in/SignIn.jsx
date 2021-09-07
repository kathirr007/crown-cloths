import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
// import { signInWithEmailAndPassword } from 'firebase/auth'

// import { auth } from '@/firebase/firebase.utils'
import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions'

import './SignIn.scss'

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    emailSignInStart(email, password)
  }
  const handleChange = (e) => {
    const { name, value } = e.target

    setCredentials({ ...userCredentials, [name]: value })
  }

  const { email, password } = userCredentials

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        {/* <label htmlFor='signInEmail'>Email</label> */}
        <FormInput
          handleChange={handleChange}
          type='email'
          name='email'
          id='signInEmail'
          label='Email'
          value={email}
          required
        />
        {/* <label htmlFor='signInPassword'>Password</label> */}
        <FormInput
          handleChange={handleChange}
          type='password'
          name='password'
          id='signInPassword'
          label='Password'
          value={password}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)

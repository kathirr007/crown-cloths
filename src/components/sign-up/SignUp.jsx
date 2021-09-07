import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth, createUserProfileDocument } from '@/firebase/firebase.utils'
import { selectUserError } from '../../redux/user/user.selectors'
import { clearUserError, signUpStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import './SignUp.scss'

const SignUp = ({ signUpStart, error, clearErrors }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, confirmPassword, email, password } = userCredentials

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) return

    signUpStart({ email, password, displayName })
  }
  const handleChange = (e) => {
    if (error) clearErrors()

    const { name, value } = e.target

    setCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I don't have an account</h2>
      <span>Sign up with your email and password</span>

      <strong className='error'>
        {error ? error.signUpError?.message : null}
      </strong>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          type='text'
          name='displayName'
          id='displayName'
          label='Display Name'
          value={displayName}
          required
        />
        <FormInput
          handleChange={handleChange}
          type='email'
          name='email'
          id='signUpEmail'
          label='Email'
          value={email}
          required
        />
        <FormInput
          handleChange={handleChange}
          type='password'
          name='password'
          id='signUpPassword'
          label='Password'
          value={password}
          required
        />
        <FormInput
          handleChange={handleChange}
          type='password'
          name='confirmPassword'
          id='signUpConfirmPassword'
          label='Confirm Password'
          value={confirmPassword}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit' onClick={handleSubmit}>
            Sign Up
          </CustomButton>
          {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton> */}
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  error: selectUserError
})

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
  clearErrors: () => dispatch(clearUserError())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

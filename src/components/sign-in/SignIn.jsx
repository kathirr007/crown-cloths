import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  googleSignInStart,
  emailSignInStart,
  clearUserError
} from '../../redux/user/user.actions'
import { selectUserError } from '../../redux/user/user.selectors'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import './SignIn.scss'

const SignIn = ({
  googleSignInStart,
  emailSignInStart,
  error,
  clearErrors
}) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    emailSignInStart(email, password)
  }
  const handleChange = (e) => {
    if (error) clearErrors()

    const { name, value } = e.target

    setCredentials({ ...userCredentials, [name]: value })
  }

  const { email, password } = userCredentials

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <strong className='error'>
        {error ? error.signInError?.message : null}
      </strong>

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
  clearErrors: () => dispatch(clearUserError()),
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
})

const mapStateToProps = createStructuredSelector({
  error: selectUserError
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

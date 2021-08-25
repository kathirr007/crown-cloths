import React from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, createUserProfileDocument } from '@/firebase/firebase.utils'

import './SignUp.scss'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { displayName, confirmPassword, email, password } = this.state

    if (password !== confirmPassword) return

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await createUserProfileDocument(user, { displayName })

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    const { displayName, confirmPassword, email, password } = this.state
    return (
      <div className='sign-in'>
        <h2 className='title'>I don't have an account</h2>
        <span>Sign up with your email and password</span>

        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            handleChange={this.handleChange}
            type='text'
            name='displayName'
            id='displayName'
            label='Display Name'
            value={displayName}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            type='email'
            name='email'
            id='signUpEmail'
            label='Email'
            value={email}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            type='password'
            name='password'
            id='signUpPassword'
            label='Password'
            value={password}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            type='password'
            name='confirmPassword'
            id='signUpConfirmPassword'
            label='Confirm Password'
            value={confirmPassword}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign Up</CustomButton>
            {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton> */}
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp

import React from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import './SignIn.scss'

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({ email: '', password: '' })
  }
  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor='signInEmail'>Email</label> */}
          <FormInput
            handleChange={this.handleChange}
            type='email'
            name='email'
            label='Email'
            value={email}
            required
          />
          {/* <label htmlFor='signInPassword'>Password</label> */}
          <FormInput
            handleChange={this.handleChange}
            type='password'
            name='password'
            label='Password'
            value={password}
            required
          />
          <CustomButton type='submit'>Sign in</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn

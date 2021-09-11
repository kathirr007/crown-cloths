import { withRouter } from 'react-router'
import StripeCheckout from 'react-stripe-checkout'
import CustomButton from '../custom-button/CustomButton'
import axios from 'axios'

const StripeCheckoutButton = ({ price, history }) => {
  const publishableKey = 'pk_test_krAf3HsWv3GLs5EXlXXRpv1O00IWashr2l'
  const priceForStripe = price * 100
  const onToken = (token) => {
    console.log(token)
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then((res) => {
        console.log('Payment was successful...')
        history.push('/')
      })
      .catch((err) => {
        debugger
        console.log(`Payment error: ${err.response?.data?.error?.message}`)

        // alert(
        //   'There was an issue with your payment. Please sure you use the provided credit card information'
        // )
      })
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Crown Clothing Testing Ltd.'
      ComponentClass='div'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
      allowRememberMe
    >
      <CustomButton>Pay Now</CustomButton>
    </StripeCheckout>
  )
}

export default withRouter(StripeCheckoutButton)

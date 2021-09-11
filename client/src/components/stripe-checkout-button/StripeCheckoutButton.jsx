import StripeCheckout from 'react-stripe-checkout'
import CustomButton from '../custom-button/CustomButton'

const StripeCheckoutButton = ({ price }) => {
  const publishableKey = 'pk_test_krAf3HsWv3GLs5EXlXXRpv1O00IWashr2l'
  const priceForStripe = price * 100
  const onToken = (token) => {
    console.log(token)
    console.log('Payment Successful...')
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

export default StripeCheckoutButton

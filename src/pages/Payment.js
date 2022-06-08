import React from 'react'
import { Row, Col } from 'antd';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from './../components/stripe-checkout/StripeCheckout';
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLICABLE_KEY);

const Payment = () => {
  return (
    <div className='container p-5 text-center'>
        <h4>Complete Your Purchase</h4>
        <Elements stripe={promise}>
            <Row>
                <Col span={12} offset={6}>
                    <StripeCheckout/>
                </Col>
            </Row>
      </Elements>
    </div>
  )
}

export default Payment

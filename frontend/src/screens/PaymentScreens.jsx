import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <h2>Payment Method</h2>

            <Form onSubmit={ submitHandler }>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            className='my-2' 
                            label='PayPal or Credit Card' 
                            id='PayPal' 
                            name='paymentMethod' 
                            value='PayPal' 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
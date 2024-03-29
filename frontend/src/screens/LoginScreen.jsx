import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'
    const submitHandler = async (e) => {
		e.preventDefault()
		try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
		}
		// If user is already logged in then redirect them to the home page
		useEffect(() => {
			if (userInfo) {
				navigate(redirect)
			}
		}, [navigate, redirect, userInfo])
			
    return (
        <FormContainer>
            <Meta  title="Sign In" />
            <h3>Log In</h3>

            <Form className='mt-4' onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-2' disabled={ isLoading }>
                    Log In
                </Button>
				{ isLoading && <Loader /> }
            </Form>

            <Row className='py-3'>
                <Col>
                New customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
import React, { useState } from 'react'
import { Form, Button, Col,Container,Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Checkoutsteps from './Checkoutsteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/Cartactions'
import setBodyColor from './setBodyColor'
function Paymentscreen(props) {
    setBodyColor({color:`${props.color}`})
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const navigate=useNavigate()
    if (!shippingAddress) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (

        <Container >
            <Row className="justify-content-md-center" >
                <Col xs={12} md={6} style={{paddingTop:"10%"}}>
            <Checkoutsteps  step1={"hi"} step2={"hi"} color={props.color}/>
            <Form onSubmit={submitHandler}>
                <Form.Group className='pt-3'>
                    <Form.Label as='legend' style={{color:`${props.color==='black'?'white':'black'}`,userSelect:"none"}}>Select Method</Form.Label>
                    <Col>
                        <Form.Check className='pt-3 pb-4'
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{color:`${props.color==='black'?'white':'black'}`,userSelect:"none"}}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='btn btn-warning'>
                    Continue
                </Button>
            </Form>
            </Col>
            </Row>
        </Container>

    )
}

export default Paymentscreen
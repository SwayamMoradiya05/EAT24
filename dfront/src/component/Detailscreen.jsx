import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/Orderactions'
import { getBackendImageUrl } from '../utils/imageUrl'
import setBodyColor from './setBodyColor'
import Loader from './Loader'
import Messageorderscreen from './Messageorderscreen'

function Detailscreen(props) {
    setBodyColor({color:`${props.color}`})
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails
    const cart = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        if(!order){
            dispatch(getOrderDetails(id))
        }
    }, [dispatch,order,id,navigate,userInfo])
    return loading ? (
        <Loader />
    ) : error ? (
        <Messageorderscreen var='danger' message={error}></Messageorderscreen>
    ) : (
    <div style={{paddingTop:"5%"}}  >
                    <Row className=' justify-content-center'>
                        <Col md={8}>
                            <ListGroup variant='flush' style={{border:`2px solid ${props.color==='black'?'white':'black'}`}}>
                                <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                    <h2 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Delivery Address</h2>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}><strong>Name: </strong> {order && order.user.name}</p>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}><strong>Email: </strong>{order && order.user.email}</p>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                                        <strong>Shipping: </strong>
                                        {cart.shippingAddress.street},  {order && order.shippingAddress.city}
                                        {'  '}
                                        {order && order.shippingAddress.state},
                                        {'  '}
                                        {order && order.shippingAddress.postalCode}
                                    </p>

                                    {order && order.isDelivered ? (
                                        <Messageorderscreen var='success' message={"Delivered on"} delivered={order && order.deliveredAt}></Messageorderscreen>
                                    ) : (
                                            <Messageorderscreen var='danger' message={"Not Delivered"}></Messageorderscreen>
                                        )}
                                </ListGroup.Item>

                                <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                    <h2 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Payment</h2>
                                    <p style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                                        <strong>Method: </strong>
                                        {order && order.paymentMethod}
                                    </p>
                                    {order && order.isPaid ? (
                                        <Messageorderscreen var='success' message={"Paid on "} paid={order && order.paidAt.toString().slice(0,10).split("-").reverse().join("-")}></Messageorderscreen>
                                    ) : (
                                            <Messageorderscreen var='danger' message={"Not Paid"}></Messageorderscreen>
                                        )}

                                </ListGroup.Item>

                                <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
                                    <h2 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Order Items</h2>
                                    {order && order.orderItems.length === 0 ? <Messageorderscreen var='info' message={"Order is empty"}>
                                        
                            </Messageorderscreen> : (
                                            <ListGroup variant='flush'>
                                                {order && order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index} style={{backgroundColor:`${props.color}`}}>
                                                        <Row style={{color:`${props.color==='black'?'white':'black'}`}}>
                                                            <Col md={1} >
                                                                <Image src={getBackendImageUrl(item.img)} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col style={{userSelect:'none'}}>
                                                                {item.name}
                                                            </Col>

                                                            <Col md={4} style={{userSelect:'none'}}>
                                                                {item.quantity} X ₹{item.price} = ₹{(item.quantity * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>
                        </Row>
                        </div>
  )
}

export default Detailscreen
import React,{useEffect,useState} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form,Row,Col,Button,Container,ListGroup } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../actions/Useractions'
import Loader from './Loader';
import setBodyColor from './setBodyColor'
import Messageloginscreen from './Messageloginscreen';
function LoginScreen(props) {
    setBodyColor({color:`${props.color}`})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const location=useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    const navigate=useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (<>{loading?<Loader/>:
    <div style={{paddingTop:"8%"}} className='container'>
    <ListGroup variant="primary" style={{border:`2px solid ${props.color==='black'?'white':'black'}`}} >
        <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
        <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
            <h1 style={{color:"orange",userSelect:'none'}} >Sign In</h1>
            {error && <Messageloginscreen >{error}</Messageloginscreen>}
            
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email' className="pt-3">
                    <Form.Label style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password' className="pt-3 pb-3">
                    <Form.Label style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' className='btn-warning' >
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        <strong style={{color:'orange'}}>Register</strong>
                        </Link>
                </Col>
            </Row>

            </Col>
        </Row>
    </Container>
    </ListGroup.Item>
    </ListGroup>
    </div>}</>
    )
}

export default LoginScreen
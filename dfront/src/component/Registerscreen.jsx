import React,{useEffect,useState} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form,Row,Col,Button,Container,ListGroup } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../actions/Useractions'
import Loader from './Loader';
import Messageregisterscreen from './Messageregisterscreen';
import setBodyColor from './setBodyColor'
function Registerscreen(props) {
    setBodyColor({color:`${props.color}`})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const[message,setMessage]=useState("")
    const passwordregex=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    const dispatch = useDispatch()
    const location=useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
    const navigate=useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Confirm Password does not match')
        }
        else if(!passwordregex.test(password))
        {
            setMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character (!@#$%^&*) ')
        } 
        else {
            setMessage("")
            dispatch(register(name, email, password))
        }
    }
  return (<>{loading?<Loader/>:
  <div style={{paddingTop:"8%"}} className='container'>
  <ListGroup variant="primary" style={{border:`2px solid ${props.color==='black'?'white':'black'}`}} >
      <ListGroup.Item style={{backgroundColor:`${props.color}`}} >
      <Container>
      <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
          <h1 style={{color:"orange",userSelect:'none'}} >Register</h1>
          {error?<Messageregisterscreen mes={"Account with email exists"}>{error}</Messageregisterscreen>:message?<Messageregisterscreen mes={message}></Messageregisterscreen>:<></>}
          <Form onSubmit={submitHandler}>

<Form.Group controlId='name' className="pt-3 ">
    <Form.Label style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Name</Form.Label>
    <Form.Control
        required
        type='name'
        placeholder='Enter name'
        value={name}
        onChange={(e) => setName(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId='email' className="pt-3">
    <Form.Label style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Email Address</Form.Label>
    <Form.Control
        required
        type='email'
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId='password' className="pt-3">
    <Form.Label style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Password</Form.Label>
    <Form.Control
        required
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId='passwordConfirm' className="pt-3 pb-3">
    <Form.Label style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Confirm Password</Form.Label>
    <Form.Control
        required
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Button type='submit' className='btn-warning'>
    Register
</Button>

</Form>
<Row className='py-3'>
                <Col style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                    Have an Account? <Link style={{color:'orange'}}
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
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

export default Registerscreen
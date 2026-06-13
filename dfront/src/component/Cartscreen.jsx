import React,{useEffect} from 'react'
import setBodyColor from './setBodyColor'
import { Link,useParams,useLocation,useNavigate, Navigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card,} from 'react-bootstrap'
import { getBackendImageUrl } from '../utils/imageUrl'
import { addtocart,removefromcart } from '../actions/Cartactions'
import Messagecart from './Messagecart'
function Cartscreen(props) {
  setBodyColor({color: `${props.color}`})
const dispatch=useDispatch()
const cart=useSelector(state=>state.cart)
const {cartItems}=cart
const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
function minus(item,id,rid)
{
  if(item<=0)
  {
    dispatch(removefromcart(id))
  }
  else
  {
    dispatch(addtocart(rid,id,item))
  }
}
const removefromcarthandler=(id)=>{
  dispatch(removefromcart(id))
}
const navigate=useNavigate()
function placeorderhandler()
  {
    if(userInfo)
    {
      navigate('/shipping')
    }
    else{
      navigate('/login')
    }
    
  }
  
  return (
    <div >
    <Row>
      <Col className="container-fluid" md={8}>
        <p className="display-5" style={{paddingTop:"100px",fontSize:"xx-large",color:"orange",userSelect:'none'}} align="center">
          SHOPPING CART
          </p>
          {cartItems.length===0?<><Messagecart></Messagecart></>:
          <ListGroup variant="primary" style={{border:`2px solid ${props.color==='black'?'white':'black'}`}} >
            {
              cartItems.map(item=>
                <ListGroup.Item key={item.id} style={{backgroundColor:`${props.color}`}}>
                  <Row>
                    <Col md={2}>
                      <Image src={getBackendImageUrl(item.image)} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3} style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>{item.name}</Col>
                    <Col md={2} style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>₹{item.price}</Col>
                    <Col md={4} className="d-flex">
                      <Form.Control as="button" onClick={()=>{minus(item.quantity-1,item.id,item.restaurantid)}} className=" btn btn-warning p-1" style={{width:"10%"}}>&#8722;</Form.Control>
                      <Form.Control as="text" value={item.quantity} style={{width:"10%"}} className='p-1 border-warning'><span>{item.quantity}</span></Form.Control>
                      <Form.Control as="button" onClick={()=>{dispatch(addtocart(item.restaurantid,item.id,item.quantity+1))}} className="btn btn-warning p-1" style={{width:"10%"}}>&#43;</Form.Control>
                    </Col>
                    <Col md={1}><Button type="button" variant="light" onClick={()=>removefromcarthandler(item.id)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" fill="orange">
<path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
</svg></Button></Col>
                  </Row>
                </ListGroup.Item>
                )
            }
            </ListGroup>}
          </Col>
    <Col md={3} style={{paddingTop:"164px"}}>
      <Card style={{width:"90%"}}>
        <ListGroup variant="flush" style={{border:`2px solid ${props.color==='black'?'white':'black'}`}}>
          <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
            <h2 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>SUBTOTAL ({cartItems.reduce((acc,item)=>acc+item.quantity,0)} ITEMS)</h2>
            <h4><strong style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>₹{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}</strong></h4>
          </ListGroup.Item>
          <ListGroup.Item style={{backgroundColor:`${props.color}`}}>
            <Button type="button" className='btn-block btn-warning' disabled={cartItems.length===0} onClick={placeorderhandler}>PLACE ORDER</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
    </Row>
    </div>
  )
}

export default Cartscreen
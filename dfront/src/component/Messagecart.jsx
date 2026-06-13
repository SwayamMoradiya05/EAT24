import React from 'react'
import { Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Message(props) {
  return (<div className='container'>
    <Alert style={{paddingTop:"10px"}} className='alert-danger'>Your Cart Is Empty<span className='float-right'><Link to="/"> GO BACK</Link></span></Alert></div>
  )
}

export default Message
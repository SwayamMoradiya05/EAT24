import React from 'react'
import { Alert } from 'react-bootstrap'
function Message() {
  return (
    <Alert style={{paddingTop:"100px"}} className='alert-danger'>Request Failed With Status Code 404</Alert>
  )
}

export default Message
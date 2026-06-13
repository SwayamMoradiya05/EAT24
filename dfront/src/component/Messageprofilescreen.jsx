import React from 'react'
import { Alert } from 'react-bootstrap'
function Messageprofilescreen(props) {

  return (
    <Alert  variant="danger">{props.mesg?`${props.mesg}`:`Account with email exists`}</Alert>
  )
}

export default Messageprofilescreen
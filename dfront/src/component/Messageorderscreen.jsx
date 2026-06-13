import React from 'react'
import { Alert } from 'react-bootstrap'
function Messageorderscreen(props) {
  return (
    <Alert style={{userSelect:'none'}} className={`alert-${props.var}`}>{props.message} {props.delivered?props.delivered:''} {props.paid?props.paid:''}</Alert>
  )
}

export default Messageorderscreen
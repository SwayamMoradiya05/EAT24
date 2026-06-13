import React from 'react'
import { Spinner } from 'react-bootstrap'
function Loader() {
  return (
    <div style={{width:"100%",height:"100%",paddingTop:"100px"}}>
    <Spinner animation="border" role="status" className="mx-auto d-block justify-content-center " style={{height:"100px",width:"100px",color:"orange"}}>
        <span className='sr-only'>Loading.....</span>
    </Spinner>
    </div>
  )
}

export default Loader
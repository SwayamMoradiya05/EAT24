import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Checkoutsteps(props) {
    return (
        <Nav className='justify-content-center mb-4'>

            <Nav.Item>
                {props.step1 ? (<Nav.Link as={Link} to='/shipping' style={{textDecoration:"none",fontSize:"110%",color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                        <b>Address</b> {props.step2?<span><svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 7 48 48">
<path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
</svg></span>:<></>}
                    </Nav.Link>
                ) : (
                        <Nav.Link disabled style={{textDecoration:"none",fontSize:"110%",userSelect:'none'}}>Address</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {props.step2 ? (<Nav.Link as={Link} to='/payment' style={{textDecoration:"none",fontSize:"110%",color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                        <b>Payment</b>{props.step3?<span><svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 7 48 48">
<path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
</svg></span>:<></>}
                    </Nav.Link>
                ) : (
                        <Nav.Link disabled style={{textDecoration:"none",fontSize:"110%",userSelect:'none'}}>Payment</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {props.step3 ? (<Nav.Link as={Link} to='/placeorder' style={{textDecoration:"none",fontSize:"110%",color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}}>
                        <b>Place Order</b><span><svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 7 48 48">
<path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
</svg></span>
                    </Nav.Link>
                ) : (
                        <Nav.Link disabled style={{textDecoration:"none",fontSize:"110%",userSelect:'none'}}>Place Order</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default Checkoutsteps
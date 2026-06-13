import React from 'react'
import './Offer.css'
import federal from './img/federal.webp'
import aucc from './img/aucc.webp'
import paytm from './img/paytm.webp'
import setBodyColor from './component/setBodyColor'
function Offer(props) {
    setBodyColor({color:`${props.color}`})
    return (
        <>
            <div className="row" id="makeresponsive">
                <div className="col-lg-8">
                    <h1 className="font-weight-bold display-4 text-white" style={{ paddingLeft: "10%", paddingTop: "10%",userSelect:'none' }}>Offers for you</h1>
                    <h4 className="text-white" style={{ paddingLeft: "10%",userSelect:'none' }}>Explore top deals and offers exclusively for you!</h4></div>
                <div className="col-lg-4"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="tiny" id="Layer_1" width="300px" height="300px" viewBox="0 0 24 24" overflow="visible" xmlSpace="preserve">
                    <g>
                        <g transform="translate(3.000000, 4.000000)">
                            <path fillRule="evenodd" fill="#5C85DE" d="M3.8,2.8C0.9,2.8,0.6-1,3.8-1C6.1-1,7.1-0.3,9,0.5C11.1-0.3,11.9-1,14.2-1    c3.2,0,2.9,3.8,0,3.8H3.8z" />
                            <path fillRule="evenodd" fill="#3367D6" d="M3.8,2.8h10.4C15,2.8,15.7,2.4,16,2L9,2.8L2,2C2.3,2.4,3,2.8,3.8,2.8z" />
                            <path fillRule="evenodd" fill="#85A4E6" d="M17.2,8.8H9.8V17h6c0.8,0,1.5-0.7,1.5-1.5V8.8L17.2,8.8z" />
                            <path fillRule="evenodd" fill="#85A4E6" d="M0.8,8.8h7.5V17h-6c-0.8,0-1.5-0.7-1.5-1.5V8.8L0.8,8.8z" />
                            <path fillRule="evenodd" fill="#85A4E6" d="M8.2,8V2.8H0.8c-0.8,0-1.5,0.7-1.5,1.5V8H8.2z" />
                            <path fillRule="evenodd" fill="#85A4E6" d="M18.8,8h-9V2.8h7.5c0.8,0,1.5,0.7,1.5,1.5V8L18.8,8z" />
                            <rect x="0.8" y="8" fillRule="evenodd" fill="#3367D6" width="7.5" height="1.5" />
                            <rect x="9.8" y="8" fillRule="evenodd" fill="#3367D6" width="7.5" height="1.5" />
                            <rect x="10.5" y="2.8" fillRule="evenodd" fill="#3367D6" width="0.8" height="14.2" />
                            <rect x="7.5" y="2.8" fillRule="evenodd" fill="#5C85DE" width="3" height="14.2" />
                        </g>
                    </g>
                </svg></div>
            </div>
            <div>
            <div className="container p-5">
                <div className="row" >
                    <div className="col-lg mx-auto container p-3" href="#" style={{ textDecoration: "none", border: `2px solid ${props.color==='black'?'white':'black'}`,userSelect:'none' }}>
                        <button className={`btn btn-outline-${props.color==='black'?'light':'dark'} font-weight-bold pt-2`}><span><img src={paytm} height="25px" width="25px" alt="" /></span>PAYTMFEST</button>
                        <pre className={`text-${props.color==='black'?'light':'dark'}`} style={{ fontSize: "medium", fontFamily: "Arial, Helvetica, sans-serif" }}>{`Get assured cashback between ₹25 
to ₹100 using Paytm wallet`}</pre>
<pre className={`text-${props.color==='black'?'light':'dark'}`} style={{ fontSize: "smaller", fontFamily: "Arial, Helvetica, sans-serif" }}>{`Assured cashback between ₹25 to ₹100 on Paytm
wallet transactions above ₹399`}</pre>
                    </div>
                    <div className="col-lg mx-auto container p-3" href="#" style={{ textDecoration: "none", border: `2px solid ${props.color==='black'?'white':'black'}`,userSelect:'none' }}>
                        <button className={`btn btn-outline-${props.color==='black'?'light':'dark'} font-weight-bold pt-2`}><span><img src={federal} height="25px" width="25px" alt="" /></span>FEDERALCC</button>
                        <pre className={`text-${props.color==='black'?'light':'dark'}`} style={{ fontSize: "medium", fontFamily: "Arial, Helvetica, sans-serif"}}>{`Get 20% discount using Federal
Bank Credit Cards`}</pre>
                        <pre className={`text-${props.color==='black'?'light':'dark'}`} style={{ fontSize: "smaller", fontFamily: "Arial, Helvetica, sans-serif" }}>{`Maximum discount up to ₹120 on orders
above ₹249`}</pre>
                    </div>
                    <div className="col-lg mx-auto container p-3" href="#" style={{ textDecoration: "none", border: `2px solid ${props.color==='black'?'white':'black'}`,userSelect:'none' }}>
                        <button className={`btn btn-outline-${props.color==='black'?'light':'dark'} font-weight-bold pt-2`}><span><img src={aucc} height="25px" width="25px" alt="" /></span> AUCC100</button>
                        <pre className={`text-${props.color==='black'?'light':'dark'}`} style={{ fontSize: "medium", fontFamily: "Arial, Helvetica, sans-serif" }}>{`Get flat ₹100 discount using AU
Credit Cards`}</pre>
                        <pre className={`text-${props.color==='black'?'light':'dark'}`} style={{ fontSize: "smaller", fontFamily: "Arial, Helvetica, sans-serif" }}>{`Maximum discount of ₹100 on orders
above ₹299`}</pre>
                    </div>
                </div></div></div></>
    )
}
export default Offer;
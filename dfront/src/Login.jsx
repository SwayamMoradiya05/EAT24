import react from 'react'
import brand_img from './img/brand_img.jpg'
import './Login.css'
function Login() 
{
    var interval = setInterval(doStuff, 2000);
    var temp3="Unexpected Guests?" // 2000 ms = start after 2sec 
    var temp = "Cooking Gone Wrong?"
    function doStuff() {
        var temp2 = document.getElementById("ex").innerHTML
        document.getElementById("ex").innerHTML = temp
        temp = temp2
        temp2= document.getElementById("ex").innerHTML
        document.getElementById("ex").innerHTML = temp3
        temp3= temp2
    }
    function login()
	{
		var no = document.getElementById("phno").value;
		var filter = /^\d{10}$/;
		if(no ==='')
		{
			alert("please enter phone number.");
		}
		else if(!filter.test(no))
		{
			alert("Enter valid phone number.");
		}
		else
		{
        ope1();
		}
	}
    function ope()
    {  
       
        var oop=document.getElementById("op1").value;
        if(sessionStorage.getItem("otp")===oop)
        {
        var var1=document.getElementById("name").value
        sessionStorage.setItem("var2",var1)
        var var3=document.getElementById("number").value
        sessionStorage.setItem("var4",var3)
        var var5=document.getElementById("email").value
        sessionStorage.setItem("var6",var5)
        window.open("HOME.HTML","_blank");
        window.close();
        }
        else
        {
            alert("PLEASE ENTER CORRECT OTP!!");
        }
    }
    function ope1()
    {  
        var oop=document.getElementById("op").value;
        if(sessionStorage.getItem("otp")===oop)
        {
        sessionStorage.setItem("var2"," MANAV")
        window.open("HOME.HTML","_blank");
        window.close();
        }
        else
        {
            alert("PLEASE ENTER CORRECT OTP!!");
        }
    }
    function signup()
	{
		var no = document.getElementById("number").value;
        var email = document.getElementById("email").value;
		var filter = /^\d{10}$/;
        var filter2 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(no ==='')
		{
			alert("please enter phone number.");
		}
        else if(!filter.test(no))
		{
			alert("Enter valid phone number.");
		}
        else if(email ==='')
		{
			alert("please enter email.");
		}
        else if(!filter2.test(email))
		{
			alert("Enter valid email id.");
		}
        else{
        ope(); 
        }
    }
    // function clearFunc()
	// {
	// 	document.getElementById("number").value="";
    //     document.getElementById("email").value="";
	// }
    function otvisible()
    {
        var otpvisi=document.getElementById("op");
        otpvisi.style.visibility="visible";
    }
    function otvisible1()
    {
         var otpvisi=document.getElementById("op1");
        otpvisi.style.visibility="visible";
    }
    const generateotp=()=>
    {   
        const length=4;
        let otp="";
        for (let i=0;i<length;i++)
        {
            otp+=Math.floor(Math.random()*10);
        }
        alert(otp);
        sessionStorage.setItem("otp",otp);
    }
    return (
    <>
        <div className="row">
        <div className="col-lg bg-white container">
            <div className="row">
                <div className="col-lg-8">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                <img src={brand_img} alt="Bootstrap" width="100px" height="100px" className="rounded-circle"/>
                            </a>
                            <h3 className="font-weight-bold" style={{color:"#6b3a1b"}}>Food Order</h3>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{bsScrollHeight: "100px"}}>
                                    <li className="nav-item"></li>
                                </ul>
                                <form className="d-flex" role="search">
                                    <button className="btn m-3" type="button" data-toggle="modal" data-target="#login">Login</button>
                                    <div className="modal left fade" id="login" tabindex="" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="nav flex-column flex-row">
                                                        <button type="close" className="btn-close" style={{paddingLeft:"35px"}} data-dismiss="modal"></button>
                                                        <h1 style={{paddingTop: "20px",marginLeft: "20px"}}>Login</h1>
                                                        <h6 style={{marginLeft: "20px",paddingBottom:"20px"}}>or<a href="/" data-toggle="modal" data-target="#ss" style={{textDecoration: "none",color:"rgba(250, 135, 12, 0.816)"}}> create an account</a></h6>
                                                        <form>
                                                            <input type="text" placeholder="Phone number" className="form-control" id="phno" style={{width:"40%",marginLeft: "20px"}}/>
                                                            <br/>
                                                            <input type="text" placeholder="Enter Otp" className="form-control" id="op" style={{width:"40%",marginLeft: "20px"}}/>
                                                            <br/>
                                                            <input type="button" value="GET OTP" className="btn btn-warning rounded-0" style={{width:"40%",marginLeft: "20px"}} onClick={()=>{otvisible();generateotp()}}/>
                                                            <br/>
                                                            <br/>
                                                            <input type="submit" value="LOGIN" className="btn btn-warning rounded-0" style={{width:"40%",marginLeft: "20px"}} onClick={login} />
                                                        </form>
                                                        <h6 className="text-muted" style={{fontSize:"x-small",marginLeft: "20px"}}>By clicking on Login,I accept Terms & Conditions & Privacy Policy</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-dark m-3" type="button" data-toggle="modal" data-target="#ss">Sign Up</button>
                                    <div className="modal left fade" id="ss" tabindex="" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="nav flex-column flex-row">
                                                        <button type="close" className="btn-close" style={{paddingLeft:"35px"}} data-bs-dismiss="modal"></button>
                                                        <h1 style={{paddingTop:"20px",marginLeft:"20px"}}>Sign up</h1>
                                                        <form>
                                                            <input type="text" placeholder="Phone number" className="form-control" id="number" style={{width:"40%",marginLeft: "20px"}}/>
                                                            <br/>
                                                            <input type="text" placeholder="Name" className="form-control" id="name" style={{width:"40%",marginLeft: "20px"}}/>
                                                            <br/>
                                                            <input type="email" placeholder="Email" className="form-control" id="email" style={{width:"60%",marginLeft: "20px"}}/>
                                                            <br/>
                                                            <input type="text" placeholder="Enter Otp" className="form-control" id="op1" style={{width:"40%",marginLeft: "20px"}}/>
                                                            <br/>
                                                            <input type="button" value="GET OTP" className="btn btn-warning rounded-0" style={{width:"40%",marginLeft: "20px"}} onClick={()=>{otvisible1();generateotp()}}/>
                                                            <br/>
                                                            <br/>
                                                            <input type="submit" value="SIGN UP" className="btn btn-warning rounded-0" style={{width:"40%",marginLeft: "20px"}} onClick={signup}/>
                                                        </form>
                                                        <h6 className="text-muted" style={{fontSize:"x-small",marginLeft: "20px"}}>By creating an account,I accept Terms & Conditions & Privacy Policy</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <h1 className="font-weight-bold" id="ex" style={{fontSize: "xx-large",paddingLeft: "10%"}}>Hungry?</h1>
                    <h2 className="text-muted" style={{paddingLeft: "10%"}}>Order food from favourite restaurants near you.</h2>
                    <nav className="navbar bg-body-tertiary" style={{paddingLeft: "10%"}}>
                        <div className="container-fluid row">
                                <div className="col-lg" style={{paddingTop:"10%"}}>
                                <input className="form-control me-2" type="search" placeholder="Enter Your Delivery Location" aria-label="Search" style={{height:"50px"}} id="delieveryinput"/>
                                </div>
                                <div className="col-lg"  id="findfood" style={{paddingTop:"10%"}}>
                                <button className="btn btn-outline-warning btn-lg" type="submit">Find Food</button>
                                </div>
                        </div>
                    </nav>
                </div>
                    <div className="col-lg-4"><img className="login_food" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq" alt=""/>
                    </div>
            </div>
        </div>
    </div>
    <div className="row p-5" style={{backgroundColor:"#2b1e16", color:"antiquewhite"}}>
        <div className="col-sm-4 text-center mt-3 mb-3"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf" width="20%" alt=""/><b style={{display: "block"}}>NO MINIMUM ORDER</b><p style={{display: "block"}}>Order in for yourself or for the group, <br/> with no restrictions on order value</p></div>
        <div className="col-sm-4 text-center mt-3 mb-3"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy" width="20%" alt=""/><b style={{display: "block"}}>LIVE ORDER TRACKING</b><p style={{display: "block"}}>Know where your order is at all times,<br/> from the restaurant to your doorstep</p></div>
        <div className="col-sm-4 text-center mt-5 mb-3"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn" width="20%" alt=""/><b style={{display: "block"}}>LIGHTNING-FAST DELIVERY</b><p style={{display: "block"}}>Experience Swiggy's superfast delivery <br/> for food delivered fresh & on time</p></div>
        </div>
        <div className="row">
            <div className="col-sm text-center" style={{padding: "70px"}}><h1>Restaurants in your pocket </h1><br/>
               <b> Order from your favorite restaurants & track <br/> on the go, with the all-new Swiggy app.</b>
                <br/><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty" className="p-3" width="25%" alt=""/>
                <br/><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp" className="p-3" width="25%"  alt=""/>
        </div>
        <div className="col-sm text-center"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n" alt="" width="50%"/></div>
        <div className="col-sm text-center"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn" alt="" width="50%"/></div>
        </div>
        <div className="row bg-dark p-5 text-white">
            <div className="col-sm-3">
                <b>Company</b><br/><br/>
                <ul>
                    <li>About us</li>
                    <li>Team</li>
                    <li>Career</li>
                    <li>Swiggy Blog</li>
                    <li>Bug Bounty</li>
                    <li>Swiggy One</li>
                    <li>Swiggy Corporate</li>
                    <li>Swiggy Instamart</li>
                    <li>Swiggy Genie</li>
                </ul>
            </div>
            <div className="col-sm-3">
                <b>Contact</b><br/><br/>
                <ul>
                    <li>Help & Support</li>
                    <li>Partner with us</li>
                    <li>Ride with us</li>
                </ul>
            </div>
            <div className="col-sm-3">
                <b>LEGAL</b><br/><br/>
                <ul>
                    <li>Terms & Conditions</li>
                    <li>Refund & Cancellation</li>
                    <li>Privacy Policy</li>
                    <li>Cookie policy</li>
                    <li>Offer terms</li>
                    <li>Phishing & Fraud</li>
                    <li>Corporate - Swiggy Money Codes Terms and Conditions</li>
                    <li>Corporate - Swiggy Discount Voucher Terms and Conditions</li>
                    </ul>
            </div>
            <div className="col-sm-3 ">
                <ul>
                    <li><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp" className="p-3" alt="" width="50%"/></li>
                    <li><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty"  className="p-3" alt=""  width="50%"/></li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Login
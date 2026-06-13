// import React from 'react'
// import './Help.css'
// import Chatbot from './component/chatbot'
// import setBodyColor from './component/setBodyColor'
// function Help(props) {
//   setBodyColor({color:`${props.color}`})
//   return (
//     <div style={{height:'100%'}}>
//   <div style={{paddingTop:"6%"}} className="container">
//     <br/>
//     <h1 style={{color:`${props.color==='black'?'white':'black'}`,userSelect:'none'}} className="paddingneed">Help & Support</h1>
//     <p style={{color: `${props.color==='black'?'white':'black'}`,userSelect:'none'}}>Let's take a step ahead and help you better.</p>
//     <div className="bg-light">
//       <div id="accordion">
//         <div className="card">
//           <div className="card-header" id="headingOne">
//             <a className="collapsed" data-toggle="collapse" href="#collapseOne" aria-expanded="false"
//             aria-controls="collapseOne" style={{textDecoration: "none",color: "black",userSelect:'none'}}>
//                 How much comission will i be charger by Food Order Website?</a>
                    
//         </div>

//           <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
//             <div className="card-body text-muted">
//               The commission charges vary for different cities. You will be able to see the commission applicable for
//               you once the preliminary onboarding details have been filled.
//             </div>
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-header" id="headingTwo">
//             <a className="mb-0 collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false"
//             aria-controls="collapseOne" style={{textDecoration: "none",color: "black",userSelect:'none'}}>
//                 What are the mandatory documents needed to list my restaurant on Food Order Website
//             </a>
//           </div>
//           <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
//             <div className="card-body">
//               <pre className="text-muted">- Copies of the below documents are mandatory
// {`- FSSAI Licence OR FSSAI Acknowledgement
// - Pan Card
// - GSTIN Certificate
// - Cancelled Cheque OR bank Passbook
// - Menu`}
//                        </pre>
//             </div>
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-header" id="headingThree">
            
//             <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false"
//                 aria-controls="collapseThree" style={{textDecoration: "none",color: "black",userSelect:'none'}}>
//                 After i submit all documents,how long will it take for my restaurant to go live on Food Order
//                 Website
//             </a>
//           </div>
//           <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
//             <div className="card-body text-muted">
//               After all mandatory documents have been received and verified it takes upto 7-10 working days for the
//               onboarding to be completed and make your restaurant live on the platform
//             </div>
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-header" id="headingfour">
//               <a href="/" className="collapsed" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false"
//                 aria-controls="collapsefour" style={{textDecoration: "none",color: "black",userSelect:'none'}}>
//                 What is this one time onboarding fees?Do i have to pay for it while regestering?
//               </a>
//           </div>

//           <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordion">
//             <div className="card-body text-muted">
//               This is a one-time fee charged towards the system & admin costs incurred during the onboarding process. It
//               is deducted from the weekly payouts after you start receiving orders from Food Order Website.
//             </div>
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-header" id="headingfive">
//               <a href="/" className="collapsed" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false"
//                 aria-controls="collapsefive" style={{textDecoration: "none",color: "black",userSelect:'none'}}>
//                 Who do i contact if i need help and support in getting onboarded</a>
//           </div>

//           <div id="collapsefive" className="collapse" aria-labelledby="headingfive" data-parent="#accordion">
//             <div className="card-body text-muted">
//               You can connect with Partner Support on 080-67466777/68179777 or write to onboarding@foodorder.in
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div style={{height:'280px',width:'100px'}}>

//   </div>
//   <Chatbot color={props.color}></Chatbot>
//     </div>
//   )
// }

// export default Help


import React from 'react';
import './Help.css'
import Chatbot from './component/chatbot'
import setBodyColor from './component/setBodyColor'
function Help(props) {
  setBodyColor({color:`${props.color}`})
  const faqs = [
    {
      question: 'How much comission will i be charger by Food Order Website?',
      answer:
        'The commission charges vary for different cities. You will be able to see the commission applicable for you once the preliminary onboarding details have been filled.',
    },
    {
      question: 'What are the mandatory documents needed to list my restaurant on Food Order Website?',
      answer:
        '- Copies of the below documents are mandatory\n- FSSAI Licence OR FSSAI Acknowledgement\n- Pan Card\n- GSTIN Certificate\n- Cancelled Cheque OR bank Passbook\n- Menu',
    },
    {
      question: 'After i submit all documents,how long will it take for my restaurant to go live on Food Order Website?',
      answer:
        'After all mandatory documents have been received and verified it takes upto 7-10 working days for the onboarding to be completed and make your restaurant live on the platform',
    },
    {
      question: 'What is this one time onboarding fees?Do i have to pay for it while regestering?',
      answer:
        'This is a one-time fee charged towards the system & admin costs incurred during the onboarding process. It is deducted from the weekly payouts after you start receiving orders from Food Order Website.',
    },
    {
      question: 'Who do i contact if i need help and support in getting onboarded?',
      answer:
        'You can connect with Partner Support on 080-67466777/68179777 or write to onboarding@foodorder.in',
    },
  ];

  return (
    <div className="faq-section" style={{paddingTop:"6%"}}>
      <h2 className="text-center" style={{ color: `${props.color==='black'?'orange':"orange"}`,userSelect:'none' }}>FAQs</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="card  " key={index}>
            <div className="card-header" id={`faqHeading${index}`} >
              <h5 className="mb-0">
                <button
                style={{userSelect:"none",textDecoration:'none'}}
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#faqCollapse${index}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`faqCollapse${index}`}>
                  {faq.question} 
                </button>
              </h5>
            </div>
            <div
              id={`faqCollapse${index}`}
              className={`collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`faqHeading${index}`}
              data-parent="#faqAccordion"
            >
              <div className="card-body" style={{userSelect:'none'}}>{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
      <Chatbot color={props.color}></Chatbot>
    </div>
  );
}

export default Help;
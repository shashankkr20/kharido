import React, { useState } from 'react'
import './bot.css'
const Chatbot = () => {
  const [botstat,setBotstat]=useState(false);
  const handleButton=()=>{
    if(botstat)
    {
      setBotstat(false)
    }
    else
    setBotstat(true)
  }
  return (
    <>
    
      {botstat && <div className="chat">
          {/* <div className="close"><div className="close1"></div></div> */}
          <div className="chat-head"><label for="chat-head">Helper</label></div>
          <div className="chat-body">
          <div className="msg-output">
              Hi, How can i help You!
          </div>
          <div className="msg-output">
              Please click on an option or enter correct option no.
          </div>
          <div className="msg-output">
              <a href="#">1.Home</a>
              <a href="#">2.Clothes</a>
              <a href="#">3.Electronics</a>
              <a href="#">4.Beauty</a>
              <a href="#">5.Medicine</a>
              <a href="#">7.Contact Us</a>
              <a href="#" className="FAQBTN">8.FAQs</a>
          </div>
          </div>
          <div class="chat-input"><input type="text" placeholder="Enter your query?"/><button class="btn-submit">Submit</button></div>
    </div>}
    <div className='chatbot' onClick={handleButton}>
        <img  src="./images/bot1.webp" alt="" />
        </div>
        </>
  )
}

export default Chatbot
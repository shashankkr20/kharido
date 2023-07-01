import React, { useState } from 'react'
import Header from './../Home/Header'
import './checkout.css'
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';
const Checkout = () => {
    const [seladdr,setSeladdr]=useState()
    const navigate=useNavigate();
    const loc=useLocation();
    const totprice=loc.state.data;
    const handleradio=(e)=>{
        setSeladdr(e.target.nextSibling.textContent)
        var rad=document.querySelectorAll('#radiosel')
        rad.forEach((ele)=>{
            if(ele!=e.target)
            {
                ele.checked=false;
            }
        })
        // alert(seladdr)
    }
   const handlepayment=async()=>{
    var rad=document.querySelectorAll('#radiosel')
    var i=0;
    await rad.forEach(async(ele)=>{
        if(ele.checked===true)
        {
            navigate('/load',{state:{location:"/payment",data:totprice}})
            i=1;
        }
    })
    if(i===0)
    alert("Select an address to proceed")
    }
  return (
    <>
    <Header/>
    <div className='checkout'>
        <span style={{cursor:'pointer',color:'green',fontSize:"50px",fontWeight:600,textAlign:"center",marginBottom:"40px",textDecoration:"underline"}}>Your Addresses</span>
        <div style={{cursor:'pointer',color:'red',fontWeight:600,display:'flex',padding:'20px',backgroundColor:'#f1f1f1',width:'200px',borderRadius:'10px',boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}><AddIcon/> Add New Address</div>
        <span style={{color:'brown',fontSize:'larger',fontWeight:600}}>Select an address</span>
        <div className="addresses">
            <div className="address">
                <input type="radio" id='radiosel' onClick={handleradio}/><span>6,vasant vihar ,near shantikunj,purani delhi india <b>PIN:1000012</b>
                </span>
            </div>
            <div className="address">
                <input type="radio" id='radiosel' onClick={handleradio}/><span>6,vasant vihar ,near shantikunj,purani delhi india <b>PIN:1000012</b>
                </span>
            </div>
            <div className="address">
                <input type="radio" id='radiosel' onClick={handleradio}/><span>6,vasant vihar ,near shantikunj,purani delhi india <b>PIN:1000012</b>
                </span>
            </div>
        </div>
        <span style={{fontSize:'x-large',color:'maroon'}}>Total amount to Pay: <b>Rs. {totprice}</b></span>
        <span onClick={handlepayment} style={{color:'#ffff',backgroundColor:'goldenrod',padding:13,width:'180px',textAlign:'center',display:'flex',gap:'6px',alignSelf:'center',cursor:'pointer'}}>Proceed for Payment<ArrowForwardIcon/></span>
    </div>
    </>
  )
}

export default Checkout
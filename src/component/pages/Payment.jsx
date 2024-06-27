import React, {  useState } from 'react'
import './payment.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import Header from '../Home/Header'
import { useLocation,useNavigate } from 'react-router-dom';
import  Axios  from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { adduser,otpShow } from '../../Redux/Action/action';
import Otp from './Otp'
const Payment = () => {
    const [cardtype,setcardtype]=useState('credit')
    const [authshow,setauthshow]=useState(false)
    const [success,setsuccess]= useState(false);
    const [otpshow,setotpshow]=useState(false)
    const loc=useLocation();
    const navigate=useNavigate()
    const totprice=loc.state.data;
    const dispatch=useDispatch()
    const curuser=useSelector(state=>state.curuser)
    const otdet =useSelector(state=>state.otpshower)
    const api=process.env.REACT_APP_API_KEY;
    const ordersuccess=async(e)=>{
        if(e.target.previousSibling.value===otdet.otp)
        {
        setsuccess(true);
        dispatch(otpShow({state:false,otp:''}));
        Axios.post(`${api}/orderadd`,{
            perid:curuser._id,
            orders:curuser.cart,
            totamt:totprice,
            }).then(async(res)=>{
                Axios.put(`${api}/cartempty/${curuser._id}`).then(async()=>{
                    await Axios.get(`${api}/updateuser/${curuser._id}`, {
                    }).then(async(res)=>{
                        await dispatch(adduser(res.data))
                    })
                });
            }
            )
        
    }
    else{
        alert("wrong otp")
    }
    }
    const handleAuth=()=>{
        const det={state:true,otp:(Math.floor(Math.random() * 900000) + 100000).toString()}
        dispatch(otpShow(det));
        setauthshow(true)

    }
  return (
    <>
    <Header/>
    <div className='paymentpage'>
        <span style={{marginTop:'1vh',color:'green',fontSize:"50px",fontWeight:600,textAlign:"center",marginBottom:"40px",textDecoration:"underline"}}>Payment Page</span>
        
        <div className="payopt">
        <span style={{backgroundColor:'#fff',borderRadius:10,padding:8,fontSize:17,color:'maroon',textAlign:'center'}}>Total Amount: <b>Rs {totprice}</b></span>
        <span style={{color:'brown',fontSize:'large'}}>Choose a Payment option:</span>
            
            <select name="" id="" onChange={(e)=>setcardtype(e.target.value)}>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="upi">UPI</option>
            </select>
        {(cardtype==='credit' || cardtype==='debit') &&<div className='creddeb type'>
            <span style={{color:'brown',fontSize:'large'}}>Enter the card details:</span>
            <input type="text" placeholder='Enter Card no'/>
            <div><div><input type="text" placeholder='MM' />/<input type="text" placeholder='YY'/></div><input type="text" placeholder='CVV'/></div>
            <input type="text" placeholder='Enter your Name' />
            <span onClick={handleAuth} style={{textAlign:'center',fontWeight:600,fontSize:'large',cursor:'pointer',color:'#fff',borderRadius:'10px',padding:'13px',backgroundColor:'goldenrod'}}>PAY NOW</span>
        </div>}
            {(cardtype==='upi') && <div className='upi type'>
                <input type="text" placeholder='Enter UPI id'/>
                <span onClick={handleAuth}  style={{textAlign:'center',fontWeight:600,fontSize:'large',cursor:'pointer',color:'#fff',borderRadius:'10px',padding:'13px',backgroundColor:'goldenrod'}}>PAY NOW</span>
            </div>}
        </div>
        
    </div>
   {authshow && <div className='detauth'>
        {/* <CloseIcon style={{color:'red',alignSelf:'flex-end',cursor:'pointer'}}/> */}
            {!success && <div>
            <input type="text" placeholder={(cardtype==='credit' || cardtype==='debit')?"Enter the OTP":"Enter your 6 digit UPI PIN"}/>
            <span style={{cursor:'pointer'}} onClick={ordersuccess}>Submit</span></div>}
            {success && <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <span style={{marginBottom:'15px',height:'max-content',display:'flex',flexWrap:'wrap',alignItems:'center',fontWeight:600,fontSize:30,padding:10}}>Your order is successful with order id: <b>12345678</b><VerifiedIcon/></span>
                <div><span onClick={()=>navigate('/home')}  style={{cursor:'pointer',marginRight:10,color:'#FFF',backgroundColor:"goldenrod",padding:10}}>GO TO HOME</span><span onClick={()=>navigate('/orders')}  style={{cursor:'pointer',color:'#FFF',backgroundColor:"goldenrod",padding:10}}>GO TO ORDERS</span></div>
            </div>}
         </div>}
         
    </>
  )
}

export default Payment
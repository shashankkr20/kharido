import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { otpShow } from '../../Redux/Action/action'

const Otp = () => {
    const det =useSelector(state=>state.otpshower)
    const otpshow=det.state;
  return (
    <>
    {otpshow && <div className='otppage' style={{display:'flex',flexDirection:'column',width:300,height:30,padding:10,alignItems:'center',backgroundColor:'red',justifyContent:'center',position:'fixed',top:20,left:'50%',transform:'translate(-50%,-50%)',zIndex:60000}}>
        <span>Your otp for transaction is:</span>
        <span>{det.otp}</span>
    </div>}
    </>
  )
}

export default Otp
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { adduser } from '../Redux/Action/action'
import './login.css'
import { useNavigate } from 'react-router-dom'
import Header from './Home/Header'
const Login = () => {
  const api=process.env.REACT_APP_API_KEY;
  const passpattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;
  const [logsgn,setlogsgn]=useState("login");
  const routing=useNavigate();
  const [name,setName]=useState("");
  const dispatch=useDispatch();
  const [phoneno,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPassword]=useState("");
  const [uname,setuName]=useState("");
  const [upass,setuPass]=useState("");
  const clearall=()=>{
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
  }
  const clickHandle=async(e)=>{
   
      if(e.target.value==='signupbtn')
      {
        if(emailpattern.test(email) && passpattern.test(pass) && phonePattern.test(phoneno))
        {
          clearall();
            await Axios.post(`${api}/adduser`, {
            name:name,
            phoneno:phoneno,
            email:email,
            password:pass,
            }).then((res)=>{
              alert("added");
              setlogsgn('login');
            }
            )
        }
        else{
          alert("please enter a valid phoneno,email or password\n"+"password must be a combination of alphabetical characters(atleast 1), numeric digits(atleast 1) of length 8 or more")
        }
      }
      else{
        if(phonePattern.test(uname) && passpattern.test(upass))
        {
              await Axios.get(`${api}/authuser/${uname}/${upass}`, {
              }).then(async(res)=>{
                console.log(res.data)
                  if(res.data!=='not')
                  {
                    alert("welcome "+res.data.name)
                  await dispatch(adduser(res.data))
                  routing('/load',{state:{
                    location:'/home',
                    data:'nothing'
                  }})
                }
                else{
                  alert("Wrong Credentials Try Again!!!")
                }
                }
                  
                )
            }
          
          else{
            alert("enter valid username or password")
          }
    }
  }
  return (
    <>
    <Header/>
    <div className='login_page'>
        <div className="loginbox">
            <p>Kharido</p>
            <div className="login_sign">
                <div onClick={()=>{setlogsgn('login');clearall();}} style={{backgroundColor:logsgn==='login'?'#FFF':'rgb(88, 199, 227)'}}>Login</div>
                <div onClick={()=>{setlogsgn('sign');setuName('');setuPass('')}} style={{backgroundColor:logsgn==='sign'?'#FFF':'rgb(88, 199, 227)'}}>Signup</div>
            </div>
            {logsgn==="login" && <div className="detailsLogin signininput" >
               <input value={uname} onChange={(e)=>setuName(e.target.value)}  type="text" placeholder='Enter Your email/Phoneno' required/>
               <input value={upass} onChange={(e)=>setuPass(e.target.value)}  type="password" placeholder='Enter Your Password' required/>
               <label  style={{color:"#ffff",cursor:"pointer"}}>forgot password?</label>
               <button onClick={clickHandle} value='signinbtn'>Submit</button>
               
            </div>}
            {logsgn==="sign" && <div className="detailsLogin signupinput">
            <input value={name} onChange={(e)=>setName(e.target.value)}  type="text" placeholder='Enter your name' required/>
               <input value={phoneno} onChange={(e)=>setPhone(e.target.value)}  type="tel" placeholder='Enter your phoneno' required/>
               <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Enter your email' required/>
               <input value={pass} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Enter your password' required/>
               <button onClick={clickHandle} value='signupbtn'>Submit</button>
            </div>}
        </div>
    </div>
    </>
  )
}

export default Login
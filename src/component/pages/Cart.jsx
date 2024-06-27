import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './cart.css'
import Axios from 'axios';
import Header from '../Home/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../../Redux/Action/action';
const Cart = () => {
  const api=process.env.REACT_APP_API_KEY;
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const curuser=useSelector(state=>state.curuser)
    // const [curuser,setCuruser]=useState(useSelector(state=>state.curuser))
    const [totprice,setTotprice]=useState(0)
    const [empty,setEmpty]=useState(curuser.cart.length>0?true:false)
    const handleCheckout=async()=>{
      await navigate('/checkout',{state:{data:totprice}})
    }
    const handleAdd=(e)=>{
        const val=e.currentTarget.parentElement.parentElement.parentElement.parentElement.id;
        // alert(val)
        Axios.put(`${api}/cartadd/${curuser._id}/${val}/jhk/45/lklk/1`).then(
      async(re)=>{
        await Axios.get(`${api}/updateuser/${curuser._id}`, {
        }).then(async(res)=>{
              
              // await localStorage.setItem('userHistory', JSON.stringify(res.data));
              await dispatch(adduser(res.data))
      }
    )})
    }
    const handleRemove=async(e)=>{
        const val=e.currentTarget.parentElement.parentElement.parentElement.parentElement.id;
        const val1=e.currentTarget.nextSibling.innerHTML;

        // alert(val1)
        if(val1<=1)
        {
          await Axios.put(`${api}/remall/${curuser._id}/${val}`).then(
            
            async(re)=>{
                // alert("ka ho")
              Axios.get(`${api}/updateuser/${curuser._id}`, {
              }).then(async(res)=>{
                    
                    // await localStorage.setItem('userHistory', JSON.stringify(res.data));
                    // alert("ka ho")
                    dispatch(adduser(res.data))
            }
          )})
        }
        else{
        // handleaRemoveall(e.currentTarget.parentElement)
        await Axios.put(`${api}/removecart/${curuser._id}/${val}/1`).then(
            
            async(re)=>{
                // alert("ka ho")
              Axios.get(`${api}/updateuser/${curuser._id}`, {
              }).then(async(res)=>{
                    
                    // await localStorage.setItem('userHistory', JSON.stringify(res.data));
                    // alert("ka ho")
                    dispatch(adduser(res.data))
            }
          )})
        }
        
    }
    const handleaRemoveall=async(e)=>{
        const val=e.currentTarget.parentElement.parentElement.parentElement.id;
        // alert("ka ho")
        await Axios.put(`${api}/remall/${curuser._id}/${val}`).then(
            
            async(re)=>{
                // alert("ka ho")
              Axios.get(`${api}/updateuser/${curuser._id}`, {
              }).then(async(res)=>{
                    
                    // await localStorage.setItem('userHistory', JSON.stringify(res.data));
                    // alert("ka ho")
                    dispatch(adduser(res.data))
            }
          )})
    }
    useEffect(()=>{
       
        setEmpty(curuser.cart.length>0?true:false)
        console.log(curuser.cart)
        setTotprice(0)
            curuser.cart.map((ele)=>{
                if(ele.price>500)
                    setTotprice(ct=>ct+(ele.quant*ele.price))
                else
                    setTotprice(ct=>ct+(ele.quant*ele.price)+40)

            })
    },[curuser])
  return (
    <>
    <Header/>
    <div className='cartdetails'>
        <span style={{color:'green',fontSize:"50px",fontWeight:600,textAlign:"center",marginBottom:"40px",textDecoration:"underline"}}>Cart Details</span>
        {/* <span style={{fontWeight:600,alignSelf:'center',marginBottom:"40px",fontSize:"30px",borderBottom:"2px solid grey"}}>Total items: <b>3</b></span> */}
        <div className="items-cart">
          {!empty && <span style={{color:'maroon',fontSize:30}}>Your Cart is Empty!!!!</span>}
            {(curuser.cart).map((ele)=>{
                // console.log(ele.image)
                return(
                    <div className="item-c" id={ele.objid}>
                    <img src={`./images/${ele.image}`} alt="" />
                    <div>
                    <span style={{fontSize:"30px",fontWeight:500}}>{ele.title}</span>
                    <span style={{fontSize:"20px",fontWeight:600}}>Rs. {ele.price}</span>
                    <span style={{fontSize:"15px",fontWeight:400}}>{((parseInt(ele.price)>500)) ?"Eligible for free shipping":"Rs 40 delivery Charge"}</span>
                    <span style={{color:'green'}}>In stocks</span>
                    <span>Get 10% discount on icici credit card</span>
                    <div><div><RemoveIcon onClick={handleRemove}  style={{color:"red",cursor:'pointer'}}/><span style={{padding:"10px",fontSize:"larger",fontWeight:600}}>{ele.quant}</span><AddIcon onClick={handleAdd} style={{color:"green",cursor:'pointer'}}/></div><div onClick={handleaRemoveall} style={{cursor:"pointer"}}>REMOVE</div></div>
                    </div>
                </div>
                )
            })}
        </div>
        <span style={{fontSize:"20px",color:"maroon",fontWeight:600}}>Total Price to Pay: <b>Rs {totprice}</b> </span>
        {empty && <div onClick={handleCheckout} style={{cursor:"pointer",backgroundColor:"goldenrod",alignSelf:"center",padding:10,display:'flex',alignItems:'center',color:"#fff",fontWeight:600}}>Proceed to Checkout <ArrowForwardIcon/></div>}

    </div>
    </>
  )
}

export default Cart
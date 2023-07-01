import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import './order.css'
import { useSelector } from 'react-redux';
import Header from '../Home/Header';
const Orders = () => {
    const api=process.env.REACT_APP_API_KEY;
    const curuser=useSelector(state=>state.curuser)
    const [order,setOrder]=useState([]);
    
    useEffect(()=>{
        Axios.get(`${api}/fetchorders/${curuser._id}`).then((res)=>{
                setOrder(res.data)
        })
    },[])
  return (
    <>
    <Header/>
    <div className='orderpage'>
        <span style={{color:'green',fontSize:"50px",fontWeight:600,textAlign:"center",marginBottom:"40px",textDecoration:"underline"}}>Your Orders</span>
    { order.map((ele)=>{
        return(
        <div className="items-cart">
            <span>OrderId:  {ele._id}</span>
            {ele.orders.map((res)=>{
                return(
            <div className="item-c">

                    <img src={`./images/${res.image}`} alt="" />
                    <div>
                    <span style={{fontSize:"30px",fontWeight:500}}>{res.title}</span>
                    <span style={{fontSize:"20px",fontWeight:600}}>Rs. {res.price}</span>
                    <span>Delivery charge:{res.price<500?'Rs 40':'Rs 0'}</span>
                    <span>Total items:{res.quant}</span>
                    </div>
            </div>
              )})}
              <span>Total order Amount: {ele.totamt}</span>
        </div>
        
            )})}
    </div>
    </>
  )
}

export default Orders
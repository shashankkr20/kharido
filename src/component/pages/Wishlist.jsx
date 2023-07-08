import React, { useEffect, useState } from 'react'
import './wishlist.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { adduser } from '../../Redux/Action/action';
import Header from '../Home/Header';
const Wishlist = () => {
  const api=process.env.REACT_APP_API_KEY;
  const loc=useLocation();
  const dispatch=useDispatch()
  const curruser=useSelector(state=>state.curuser)
  const [items,setItems]=useState([]);
  const handleFav=async(e)=>{
   const id= e.currentTarget.parentElement.parentElement.id;
   const id1=e.currentTarget.id
    await Axios.put(`${api}/wish/rem/${curruser._id}/${id}`).then(
      async(re)=>{
        await Axios.get(`${api}/updateuser/${curruser._id}`, {
        }).then(async(res)=>{
              await dispatch(adduser(res.data))
              setItems(prev=>prev.splice(id1,1))
      }
    )})
  }
  useEffect(()=>{
    var data1=[];
    (curruser.wishlist).forEach(async(ele)=>{
      await Axios.get(`${api}/searchwish/${ele}`, {
              
      }).then(async(res)=>{
        data1.push(res.data)
      })
      setItems(data1)
    })
  },[])
  return (
    <>
    <Header/>
    <div className='wishlistpg'>
      <span style={{color:'green',fontSize:"50px",fontWeight:600,textAlign:"center",marginBottom:"40px",textDecoration:"underline"}}>Your Wishlist</span>
            <div className="wishitem">
            {(items.length>0) && items.map((ele,index)=>{
              console.log(ele[0])
            return(
            <div className="item-c" id={ele[0]._id}>
                    <img src={`./images/deal1.jpg`} alt="" />
                    <div style={{gap:20,display:'flex',flexDirection:'column'}}>
                    <span style={{fontSize:"30px",fontWeight:500}}>{ele[0].brname}</span>
                    <span style={{fontSize:"17px",fontWeight:450}}>{ele[0].title}</span>
                    
                    <span style={{color:'green'}}>In stocks</span>
                    <div><span style={{fontWeight:600,color:"brown"}}>Rs. {ele[0].disprice}</span><span style={{textDecoration:'line-through',color:'grey'}}>(Rs. {ele[0].actprice})</span><span style={{color:'goldenrod',fontWeight:600}}>({Math.floor(((ele[0].actprice-ele[0].disprice)/ele[0].actprice)*100)}%)</span></div>
                    <div id={index} onClick={handleFav} style={{display:'flex',border:'1px solid grey',justifyContent:'normal',width:100,padding:10,borderRadius:10,cursor:'pointer'}}>WISHLIST <FavoriteIcon  style={{marginLeft:-10,color:(curruser.wishlist).includes(ele[0]._id)?'red':'black'}}/></div>
                    </div>
                </div>)})}
            </div>
    </div>
    </>
  )
}

export default Wishlist
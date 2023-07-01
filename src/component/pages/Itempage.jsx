import React,{useState,useEffect} from 'react'
import './itempage.css'
import { Navigate, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Header from '../Home/Header';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Itempage = () => {
  const navigate= useNavigate();
  const item=useSelector(state=>state.curprod)
  const title=useLocation();
  const searchtitle=(title.state.data)
  const handleItemshow=async(e)=>{
    
     const fo = await item.find((item) => item['_id'] === e.currentTarget.id);
     await console.log(fo)
    navigate('/load',{state:{
      location:'/itemdet',
      data:fo
  }})
    
  }
  return (
    <>
    <Header/>
    <div className='itempage'>
      <span className='item-head'>{searchtitle}</span>
      <div className="itemset">
        {
          item.map((ele)=>{
            return(
                <div className="item" id={ele._id} onClick={handleItemshow}>
              <div className="itemimage"><img src={`./images/${ele.image}`} alt="" /><div className='rating-det'><span className='star-val'>2.6<StarIcon className='star-ic'/></span>  <span>2.1k</span></div></div>
              <div className="item-det">
                <span className='brand-name'>{ele.brname}</span>
                <span className='item-title'>{ele.title}</span>
              <div className='priceall'><span className='actprice'>Rs. {ele.disprice}</span><span className='disprice' >Rs. {ele.actprice}</span><span className='dis'>({Math.floor(((ele.actprice-ele.disprice)/ele.actprice)*100)}%)</span></div>
              </div>
            </div>
            )
          })
        }
      </div>
      
    </div>
    </>
  )
}

export default Itempage
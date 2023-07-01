import React, { useEffect, useState } from 'react'
import './itemdetails.css'
import Header from '../Home/Header'
import { adduser } from '../../Redux/Action/action';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import StarIcon from '@mui/icons-material/Star';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import NotesIcon from '@mui/icons-material/Notes';
import Axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Itemdetails = () => {
  const api=process.env.REACT_APP_API_KEY;
  const navigate=useNavigate()
  const loc=useLocation();
  const dispatch=useDispatch()
  const item=loc.state.data;
  const curruser= useSelector(state=>state.curuser);
  const items=useSelector(state=>state.curprod)
  const handleItemshow=async(e)=>{
    
    const fo = await items.find((item) => item['_id'] === e.currentTarget.id);
   navigate('/load',{state:{
     location:'/itemdet',
     data:fo
 }})
}
const handlebag=(e)=>{
  if(curruser._id==="")
  {
    alert("You need to Login to add to bag");
  }
  else
  {
    Axios.put(`${api}/cartadd/${curruser._id}/${item._id}/${item.title}/${item.disprice}/${item.image}/1`).then(
      async(re)=>{
        await Axios.get(`${api}/updateuser/${curruser._id}`, {
        }).then(async(res)=>{
              
              await dispatch(adduser(res.data))
      }
    )})
  }
}
const handleWish=(e)=>{
  if(curruser._id==="")
  {
    alert("You need to Login to add to Wishlist");
  }
  else if((curruser.wishlist).includes(item._id))
  {
    Axios.put(`${api}/wish/rem/${curruser._id}/${item._id}`).then(
      async(re)=>{
        await Axios.get(`${api}/updateuser/${curruser._id}`, {
        }).then(async(res)=>{
              
              await dispatch(adduser(res.data))
      }
    )})
  }
  else
  {
    Axios.put(`${api}/wish/add/${curruser._id}/${item._id}`).then(
      async(re)=>{
        await Axios.get(`${api}/updateuser/${curruser._id}`, {
        }).then(async(res)=>{
              
              await dispatch(adduser(res.data))
      }
    )})
  }
}
  return (
    <>
    <Header/>
    <div className='Itemdetails'>
      <div className="itemdet1">
        <div className="imageprod">
          <img src={`./images/${item.image}`} alt="" />

        </div>
        
        
        
        </div>
        <div className="detailsprod">
            <div className="parta">
                <span className='brandname'>{item.brname}</span>
                <span className='Prodtitle'>{item.title}</span>
                <div className="rats"><span style={{display:'flex',alignItems:'center'}}>2.6<StarIcon style={{color:'green',fontSize:18}}/></span>|<span>2.1k</span></div>
            </div>
            <div className="partb">
                <div className='pricedet-i'><span className='disprice-i'>Rs. {item.actprice}</span><span className='actprice-i'>Rs. {item.disprice}</span><span className='dis-i'>({Math.floor(((item.actprice-item.disprice)/item.actprice)*100)}%)</span></div>
                <span className='incl'>inclusive of all taxes</span>
                <span className='selsiz'>SELECT SIZE</span>
                <div className='size-opt'><span>28</span><span>30</span><span>32</span></div>
                <div className='cart-wish'><div className="cart-add" onClick={handlebag}><ShoppingBagIcon style={{color:"#fff",marginRight:3}}/>ADD TO CART</div><div className="wishl" onClick={handleWish}><FavoriteIcon style={{marginRight:3,color:(curruser.wishlist).includes(item._id)?'red':'black'}}/>WISHLIST</div></div>
            </div>
            <div className="partc">
              <span style={{fontWeight:600,display:"flex",gap:"10px"}}>DELIVERY OPTIONS <LocalShippingIcon/></span>
              <div className="pin-check"><input type="text" placeholder='Enter Pin Here' /> <ArrowForwardIcon style={{color:"#ff3e6c",cursor:"pointer"}}/></div>
              <span style={{fontSize:".8em",color:"grey",fontWeight:600}}>Please enter PIN code to check delivery time & Pay on Delivery Availability</span>
              <ul style={{listStyle:'none',marginLeft:'-30px',color:"rgb(74, 71, 71)"}}>
                <li >100% Original Products</li>
                <li>Pay on delivery might be available</li>
                <li>Easy 14 days returns and exchanges</li>
                <li>Try & Buy might be available</li>
              </ul>
            </div>
            <div className="partd">
             <span style={{fontWeight:600,display:'flex',gap:"7px"}}>BEST OFFERS <SellIcon/></span>
             <span style={{fontWeight:500}}>Best Price:<span style={{color:"rgb(243, 155, 47)"}}>  Rs. 420</span></span>
            <ul style={{color:"rgb(74, 71, 71)"}}>
              <li>Applicable on: Orders above Rs. 1899 (only on first purchase)</li>
              <li>Coupon code: <span>KHARIDO300</span></li>
              <li>Coupon Discount: Rs. 79 off (check cart for final savings)</li>
            </ul>
            </div>
            <div className="parte">
              <span style={{fontWeight:600,display:'flex',gap:"8px"}}>PRDODUCT DETAILS <NotesIcon /></span>
              <p>Take the sporty look to the streets with the Puma Men's Active Hoodies. This black solid Hoody can be styled in a million ways to create a look that will be remembered</p>
              <span>Features</span>
              <p>Active T-shirt for your daily workouts <br/>
              Raglan sleeves help in unrestricted arm & shoulder movement<br/>
              Style: Round Neck<br/>
              Sleeve: Short Sleeves<br/>
              Colour: Black<br/>
              Print: Solid<br/>
              Fit: Regular</p>
              <span>Size & Fit</span>
              <p>The model (height 6') is wearing a size M</p>
              <span>Material & Care</span>
              <p>100% polyester<br/>
              Machine-wash</p>
              <span>spaecification</span>
              <div className="speci">
                <div><label>Fit</label><span>Regular Fit</span></div>
                <div><label>Fit</label><span>Regular Fit</span></div>
                <div><label>Fit</label><span>Regular Fit</span></div>
                <div><label>Fit</label><span>Regular Fit</span></div>
                <div><label>Fit</label><span>Regular Fit</span></div>
                <div><label>Fit</label><span>Regular Fit</span></div>
                <div><label>Fit</label><span>Regular Fit</span></div>
              </div>
            </div>
            <div className="partf">
              <span style={{fontWeight:600,display:'flex',gap:'7px'}}>RATINGS<StarHalfIcon/> </span>
              <div className="ratfig">
                <div style={{borderRight:"1px solid grey",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:"50px",fontWeight:500}}>4.2</span><span style={{fontSize:"20px"}}>12.2k Verified Buyers</span></div> <div className='ratperall'><span><span>5</span><div className='divper'><div className='divper-c'></div></div><span>1200</span></span><span><span>5</span><div className='divper'><div className='divper-c'></div></div><span>1200</span></span><span><span>5</span><div className='divper'><div className='divper-c'></div></div><span>1200</span></span><span><span>5</span><div className='divper'><div className='divper-c'></div></div><span>1200</span></span><span><span>5</span><div className='divper'><div className='divper-c'></div></div><span>1200</span></span></div>
              </div>
              <span>WHAT CUSTOMER SAID</span>
              <div className="custsaid">
                  <div><span>Fit</span><div className='divper'><div className='divper-c'></div></div><span>Just right (50%)</span></div>
                  <div><span>Length</span><div className='divper'><div className='divper-c'></div></div><span>Just right (50%)</span></div>
              </div>
            </div>
            <div className="partg">
              <span style={{fontWeight:600}}>Customer Photos (210)</span>
              <div style={{display:"flex",gap:"10px",padding:"10px"}}><img src="./images/deal1.jpg" style={{width:"60px",height:"70px"}}/><img src="./images/deal1.jpg" style={{width:"60px",height:"70px"}}/><img src="./images/deal1.jpg" style={{width:"60px",height:"70px"}}/><img src="./images/deal1.jpg" style={{width:"60px",height:"70px"}}/></div>
              <span style={{fontWeight:600}}>Customer Reviews (2110)</span>
              <div className='custrevs'>
                <div className='custrets'><span>5 <StarIcon/></span></div>
                <div className='cust-oth'><p>Kharido app is my go-to! anytime love ordering from Kharido app. so convenient when you work two jobs and don't have the time to go to a store to shop. So convenient in all aspects of shopping. I very rarely have returns. If there is a return it is easy and convenient as well. ant its very very easy you can see I personally love Kharido app whatever it is you're looking for you'll find it there.</p><div><span>shantanu | 18 Nov 2021</span></div></div>
              </div>
              <div className='custrevs'>
                <div className='custrets'><span>5 <StarIcon/></span></div>
                <div className='cust-oth'><p>Kharido app is my go-to! anytime love ordering from Kharido app. so convenient when you work two jobs and don't have the time to go to a store to shop. So convenient in all aspects of shopping. I very rarely have returns. If there is a return it is easy and convenient as well. ant its very very easy you can see I personally love Kharido app whatever it is you're looking for you'll find it there.</p><div><span>shantanu | 18 Nov 2021</span></div></div>
              </div>
              <div className='custrevs'>
                <div className='custrets'><span>5 <StarIcon/></span></div>
                <div className='cust-oth'><p>Kharido app is my go-to! anytime love ordering from Kharido app. so convenient when you work two jobs and don't have the time to go to a store to shop. So convenient in all aspects of shopping. I very rarely have returns. If there is a return it is easy and convenient as well. ant its very very easy you can see I personally love Kharido app whatever it is you're looking for you'll find it there.</p><div><span>shantanu | 18 Nov 2021</span></div></div>
              </div>
            </div>
            <div className="parth">
              <span style={{fontSize:"large"}}>Product Code:<b> 147812</b></span>
              <span style={{fontSize:"large"}}>Seller:<i style={{color:"#880e4f",fontWeight:600}}> Vishwesh clothes</i></span>
              <span style={{color:"#ff4081",fontWeight:600,cursor:"pointer"}}>View seller Information</span>
            </div>
        </div>
    </div>
    <div className="sim-pro">
          <span style={{fontWeight:600}}>SIMILAR PRODUCTS</span>
          <div className='sim-itemset'>
            {
              items.map((ele)=>{
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
//<span><label className='custlikes'><span><ThumbUpOffAltIcon/> 5</span></label><label className='custdislikes'><span><ThumbDownOffAltIcon/> 5</span></label></span></div>
export default Itemdetails
import React, { useEffect, useState } from 'react'
import './header.css'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adduser,addprod, resetData } from '../../Redux/Action/action'
import Axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Header = () => {
  const api=process.env.REACT_APP_API_KEY;
  const [isShown, setIsShown] = useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [cartcnt,setCartct]=useState(0)
  var curruser= useSelector((state)=>state.curuser)
  const handleMouseOver=()=>{
    setIsShown(true)
  }
  const logOut=async()=>{
    await dispatch(resetData())
    navigate('/')
  }
  const logIn=async()=>{
    // await dispatch(resetData())
    navigate('/login')
  }
  const handleMouseOut=()=>{
    setIsShown(false)
  }
  const handleItemsearch=async(e)=>{
    await Axios.get(`${api}/searchItem/${e.target.innerHTML}`, {
            
    }).then(async(res)=>{
      console.log(res.data)
      // await localStorage.setItem('prod', JSON.stringify(res.data));
      await dispatch(addprod(res.data))
      navigate('/itempage',{state:{
        data:e.target.innerHTML,
    }})
    })
  }
  useEffect(()=>{
     setCartct(0);
     if(curruser)
      (curruser.cart).map((ele)=>{
        setCartct(ct=>ct+(ele.quant))
      })
  },[curruser])
  return (

    <>
    <div className='header' onMouseEnter={handleMouseOut}>
        <div className="company-logo" onClick={()=>navigate('/home')}><img src="./images/logo.png" alt="company" /></div>
        <div className="coll-types"><div onClick={handleItemsearch}>Clothes</div><div onClick={handleItemsearch}>Electronics</div><div onClick={handleItemsearch}>Beauty</div><div onClick={handleItemsearch}>Medicine</div></div>
        <div className="search" ><SearchIcon   className='sicon'/><input type="text" /></div>
        <div className="other"><div className="acc_icon" onMouseEnter={handleMouseOver} ><AccountCircleIcon 
        /><label className='labeling' >profile</label>{isShown && <div className="profile-detail" onMouseLeave={handleMouseOut}>
        <span style={{color:'maroon',fontSize:20,fontWeight:600}}>Welcome {curruser.name}</span>
        <div className="otdets">
          <span className='otdet'>Profile</span>
          <span className='otdet' onClick={()=>navigate('/orders')}>Orders</span>
          <span className='otdet'>Addresses</span>
          <span className='otdet'>Saved Cards</span>
          
        </div>
        <button style={{cursor:'pointer'}} onClick={(curruser._id==="" || curruser._id===undefined)?logIn:logOut}>{(curruser._id==="" || curruser._id===undefined)? "Login":"Logout"}</button>
       </div> }</div><div className="acc_icon"><FavoriteBorderIcon onClick={()=>(curruser._id==="" || curruser._id===undefined)?alert("You need to Login to see your Wishlist"):navigate('/wishlist')}/><label className='labeling'>Favourite</label></div><div className="acc_icon carti"><ShoppingCartIcon onClick={()=>(curruser._id==="" || curruser._id===undefined)?alert("You need to Login to browse your cart"):navigate('/cart')}/><label className='labeling'>Cart</label><div className="card_ct"><label>{cartcnt}</label></div></div></div>
    </div>
    
   </>
  );
}

export default Header
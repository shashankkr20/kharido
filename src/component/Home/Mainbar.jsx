import React from 'react'
import './mainbar.css'
import Header from './Header'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addprod } from '../../Redux/Action/action'
const Mainbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const api=process.env.REACT_APP_API_KEY;
  const handleItemsearch=async(e)=>{
    // alert(e.target.id)
    await Axios.get(`${api}/searchItem/${e.target.id}`, {
            
    }).then(async(res)=>{
      console.log(res.data)
      // await localStorage.setItem('prod', JSON.stringify(res.data));
      await dispatch(addprod(res.data))
      navigate('/itempage',{state:{
        data:e.target.innerHTML,
    }})
    })
  }
  return (
    <>
    <Header/>
    <div className='mainbar'>
        {/* <div className="offer-zone">
          <p>DEALS OF THE DAY</p>
          <div className="offers">
             <div className='offer'><img src="./images/off1.webp" alt="" /><p>50% off</p></div> 
          </div>
        </div>
        <div className="othcat">
          <div><div className="clothes-i"><img src="./images/cloth.webp" alt="" /></div><div className='electronics'><img src="./images/gadgets.webp" alt="" /></div></div>
          <div><div className="beauty"><img src="./images/beauty.jpeg" alt="" /></div><div className="medicine"><img src="./images/Medicine.jpg" alt="" /></div> </div>
          
        </div> */}
        <div className="categories">
          <div className="cloth-cat">
            <div> <img id='Clothes' onClick={handleItemsearch} src="./images/cloth.jpg" alt="" /><span>Clothes</span></div>
          </div>
          <div className="miscat">
            <div><img onClick={handleItemsearch} id='Electronics' src="./images/gadgets.webp" alt="" /><span>Electronics</span></div>
            <div><img onClick={handleItemsearch} id='Medicine' src="./images/Medicine.jpg" alt="" /><span>Medicine</span></div>
            <div><img onClick={handleItemsearch} id='Beauty' src="./images/beauty.jpeg" alt="" /><span>Beauty</span></div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Mainbar
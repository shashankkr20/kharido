import React from 'react'
import './load.css'
import { useLocation, useNavigate } from 'react-router-dom'
const Loading = () => {
    const navigate=useNavigate()
    const loc=useLocation()
    setTimeout(()=>{
            navigate(loc.state.location,{state:{
                data:loc.state.data
            }})
    },1000)
  return (
    <div className='Loading'>
        <div className="loads">
        <div className="load">

        </div>
        </div>
        <p>Loading,Please wait!!!!!</p>
    </div>
  )
}

export default Loading
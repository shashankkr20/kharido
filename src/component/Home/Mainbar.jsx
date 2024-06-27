import React,{useState,useEffect} from 'react'
import './mainbar.css'
import Header from './Header'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addprod } from '../../Redux/Action/action'
import StarIcon from '@mui/icons-material/Star';
const Mainbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const api=process.env.REACT_APP_API_KEY;
  const handleItemshow=async(e)=>{
    
    const fo = await products.find((item) => item['_id'] === e.currentTarget.id);
    await console.log(fo)
 navigate('/itemdet',{state:{
   data:fo
}})
  }
  useEffect(() => {
    // Using fetch API
    fetch(`${api}/discounted-prods`)
        .then(response => response.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
      }, []);
  return (
    <>
    <Header/>
    <div className='mainbar'>
       <img src="./images/flat.webp" alt="" style={{width:'100%'}} />
       <span style={{fontSize:'x-large',fontWeight:500,color:'rgb(13, 108, 108)',textDecoration:'underline',textAlign:'center',display:'block'}}>Discounted Products</span>
       <div className="itemset">
       {
            (loading)?<div style={{fontSize:'xx-large',fontWeight:500,color:'rgb(13, 108, 108)',textAlign:'center',display:'block'}}>Loading...</div>:products.map((ele)=>{
            return(
              <div className="item" id={ele._id} onClick={handleItemshow}>
            <div className="itemimage"><div className='imgholder'><img src={`./images/${ele.image}`} alt="" /></div><div className='rating-det'><span className='star-val'>2.6<StarIcon className='star-ic'/></span>  <span>2.1k</span></div></div>
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

export default Mainbar

import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Chatbot from './component/Home/Chatbot';
import Header from './component/Home/Header';
// import Home from './component/Home/Home';
import Mainbar from './component/Home/Mainbar';
import Login from './component/Login'
import Itempage from './component/pages/Itempage'
import Itemdetails from './component/pages/Itemdetails';
import Loading from './component/pages/Loading';
import Cart from './component/pages/Cart';
import Checkout from './component/pages/Checkout';
import Payment from './component/pages/Payment';
import Wishlist from './component/pages/Wishlist';
import Otp from './component/pages/Otp';
import Orders from './component/pages/Orders';
function App() { 
  return (
  <>
   
   <BrowserRouter basename='https://kharido.onrender.com'>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/itemdet' element={<Itemdetails/>}></Route>
    <Route path='/head' element={<Header/>}></Route>
    <Route path='/home' element={<Mainbar/>}></Route>
    <Route path='/itempage' element={<Itempage/>}></Route>
    <Route path='/load' element={<Loading/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/payment' element={<Payment/>}></Route>
    <Route path='wishlist' element={<Wishlist/>}></Route>
    <Route path='/orders' element={<Orders/>}></Route>
   </Routes>
   </BrowserRouter>
   {/* <Header/> */}
   <Otp/>
   <Chatbot/>
   </>
  );
}

export default App;

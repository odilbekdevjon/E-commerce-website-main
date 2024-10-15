import './App.scss';
import { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DarkModeContext } from './context/themContext';
// pages
import Home from './pages/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Products from './pages/products/products';
import Orders from './pages/orders/orders';
import Adress from './pages/address/address';
import Carts from './pages/carts/carts';
import Profile from './pages/profile/profile';
import ProfileOrders from './pages/profile/profileOrders/profileOrders';
import Messages from './pages/profile/messages/messages';
import Payments from './pages/profile/payments/payments';
import OrderById from './pages/profile/orderById/orderById';


function App() {
  const [setOrder] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <section className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/*' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route setOrder={setOrder} path='/products' element={<Products/>} />
          <Route path='/carts' element={<Carts/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/profile/orders' element={<ProfileOrders/>}/>
          <Route path='/profile/order/:id' element={<OrderById/>}/>
          <Route path='/profile/messages' element={<Messages/>}/>
          <Route path='/profile/payments' element={<Payments/>}/>
          <Route path='/order/:id' element={<Orders/>} />
          <Route path='/adress' element={<Adress/>} />
        </Routes>  
    </section>
  );
}
export default App;

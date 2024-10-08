import './App.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// components
import Home from './pages/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Products from './pages/products/products';
import Orders from './pages/orders/orders';
import Adress from './pages/address/address';
import Carts from './pages/carts/carts';
import Profile from './pages/profile/profile';
import ProfileOrders from './pages/profile/profileOrders/profileOrders';


function App() {
  const [setOrder] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])


  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route setOrder={setOrder} path='/products' element={<Products/>} />
          <Route path='/carts' element={<Carts/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/profile/orders' element={<ProfileOrders/>}/>
          <Route path='/order/:id' element={<Orders/>} />
          <Route path='/adress' element={<Adress/>} />
        </Routes>  
    </>
  );
}

export default App;

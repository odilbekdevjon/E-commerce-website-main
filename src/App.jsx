import './App.scss';
import { Route, Routes } from 'react-router-dom';

// components
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Products from './pages/products';
import Orders from './pages/orders';
import Adress from './pages/address';


function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/order/:id' element={<Orders/>} />
          <Route path='/order/:id/adress' element={<Adress/>} />
        </Routes>  
    </>
  );
}

export default App;

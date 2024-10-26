import { useState } from "react";
// components
import HomeHeader from "../components/HomeHeader/HomeHeader";
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Main from '../components/Main/Main';

export default function Home() {
  const [order,setOrder] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);

    return(
        <>
            <header >
                <HomeHeader  order={order} /> 
            </header>
            <div>
                <Hero/>
            </div>
            <main>
                <Main setOrder={setOrder} />
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}
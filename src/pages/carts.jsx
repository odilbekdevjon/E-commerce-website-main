import { useState, useEffect } from "react";

// components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// images
import deleteCart from "../assets/delete.svg";


export default function Carts() {

    const [ cartLength, setCardLength ] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : []
        setCardLength(cartData)
    },[cartLength])

    const cartDelete = (id) => {
        console.log(id);

        const findCartData = cartLength.find(i => i.id === id)
        console.log(findCartData);
        localStorage.removeItem("cart", JSON.parse(findCartData));
        
    }

    return(
        <>
            <Header/>
               <section className="mt-28 mb-72">
                    <div className="container">
                        <h1 className="text-[30px] font-bold">Korzinkada {cartLength.length} ta maxsulot</h1>

                        <div className="mt-10">
                            {
                                cartLength.map(item => {
                                    return(
                                        <div key={item.id} className="flex">
                                            <img src={item.image[0]} width={250} height={300} alt="" />
                                            <div className="ml-5">
                                                <h2> {item.name_uz}</h2>
                                                <p className="w-80"> {item.description_uz}</p>
                                                <span>{item.category.name_uz}</span>
                                                <div> {item.discount}</div>
                                                <div><span className="line-through opacity-[0.5]">{item.price}</span></div>
                                                <div> {item.stock} {item.unit_uz}</div>
                                                <time datetime={item.updatedAt}>{item.updatedAt}</time>
                                            </div>
                                           <button onClick={() =>  cartDelete(`${item.id}`)}>
                                                <img src={deleteCart} width={30} alt="delete" />
                                           </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
               </section>
            <Footer/>
        </>
    )
}
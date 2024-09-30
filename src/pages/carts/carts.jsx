import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// images
import deleteCart from "../../assets/delete.svg";
import minus from "../../assets/minus-sign.png";
import plus from "../../assets/plus-solid.svg";

export default function Carts() {
    const { t } = useTranslation()

    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])


    const [ cartData, setCartData ] = useState(JSON.parse(window.localStorage.getItem("cart")) || []);
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartData(JSON.parse(storedCart));
        }
    }, []);

    const cartDelete = (id) => {
        const updatedCartData = cartData.filter(item => item.id !== id);
        setCartData(updatedCartData);
        localStorage.setItem("cart", JSON.stringify(updatedCartData));
    }

    const [counts, setCounts] = useState({});
    const increaseCount = (id) => {
        setCounts((prevCounts) => ({
          ...prevCounts,
          [id]: (prevCounts[id] || 0) + 1,
        }));
    };
    const decreaseCount = (id) => {
        setCounts((prevCounts) => ({
          ...prevCounts,
          [id]: Math.max((prevCounts[id] || 1) - 1, 0),
        }));
    };

    return(
        <>
            <Header order={order}/>
               <section className="mt-28 mb-72">
                    <div className="container">
                        <h1 className="text-[30px] font-bold">{t("cartTitle1")} {cartData.length}</h1>
                        <div className="flex">
                            <div className="mt-10">
                                { 
                                    cartData?.map(item => {
                                        return(
                                            <div key={item.id} className="flex border-2 border-solid rounded-lg mt-5 p-4">
                                                <img src={item.image[0]} width={250} height={300} alt="" />
                                                <div className="ml-5">
                                                    <h2 className="text-[25px] font-bold mb-2"> {item.name_uz}</h2>
                                                    <p className="w-[600px] text-[20px] mb-2"> {item.description_uz}</p>
                                                    <span className="block text-[20px] mb-2">{item.category.name_uz}</span>
                                                    <div className="text-[15px]"><span className="underline font-bold">Sklad:</span> {item.stock} {item.unit_uz}</div>

                                                    <div className="inline-block border-2 border-solid border-black p-2 min-w-32 rounded-lg relative left-[300px] bottom-8">
                                                        <button className="text-[10px]" onClick={() => decreaseCount(item.id)}> 
                                                            <img src={minus} width={20} alt="minus" /> 
                                                        </button>
                                                            <span className="inline-block ml-5 text-[20px]">{counts[item.id] || 1}</span>
                                                        <button className="ml-5" onClick={() => increaseCount(item.id)}>
                                                            <img src={plus} width={18} alt="plus" />
                                                        </button>
                                                    </div>
                                                </div>                                           
                                                <div className="relative right-10">
                                                    <button className="relative " onClick={() =>  cartDelete(item.id)}>
                                                        <div className="flex items-center">
                                                            <img src={deleteCart} width={30} alt="delete" /> <span className="text-black text-[20px] opacity-[0.6]">delete</span>
                                                        </div>
                                                    </button>
                                                    <div className="relative top-20">
                                                        <div className="text-[30px]"> {item.discount * counts[item.id] || item.discount}</div>
                                                        <div><span className="line-through opacity-[0.5] text-[20px]">{item.price * counts[item.id] || item.price}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="w-[400px] mt-14 ml-5 border-2 border-solid p-2 rounded-lg">
                                <h2 className="text-[20px] font-bold">{t("cartTitle2")}</h2>
                                <p>Maxsulotlar</p>
                            </div>
                        </div>
                    </div>
               </section>
            <Footer/>
        </>
    )
}
import "./carts.scss";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// images
import deleteCart from "../../assets/delete.svg";
import minus from "../../assets/minus-sign.png";
import plus from "../../assets/plus-solid.svg";
import { useNavigate , Link } from "react-router-dom";
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carts() {

    function cleanHTML(input) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = input;
        return tempDiv.textContent;
    }

    const [user] = useAuth();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [order, setOrder] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [cartData, setCartData] = useState(JSON.parse(window.localStorage.getItem("cart")) || []);    
    const [totalPrice, setTotalPrice] = useState(0);
    const [change, setChange ] = useState(false);        

    // Slider settings
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartData(JSON.parse(storedCart));
        }
    }, []);

    const cartDelete = (id) => {
        const updatedCartData = cartData.filter(item => item.id !== id);
        setCartData(updatedCartData);
        setOrder(updatedCartData);
        localStorage.setItem("cart", JSON.stringify(updatedCartData));
    }

    const increaseCount = (id) => {
        const updteProductCount = cartData.map(item => {
            if (id === item.id) {
                return {
                    ...item,
                    qty: item.qty + 1
                };
            } else {
                return item;
            }
        });

        setCartData(updteProductCount);
        localStorage.setItem("cart", JSON.stringify(updteProductCount));
    };

    const decreaseCount = (id) => {
        const updteProductCount = cartData.map(item => {
            if (id === item.id && item.qty > 1) {
                return {
                    ...item,
                    qty: item.qty - 1
                };
            } else {
                return item;
            }
        });

        setCartData(updteProductCount);
        localStorage.setItem("cart", JSON.stringify(updteProductCount));
    };

    // Handle direct qty input change
    const handleQtyChange = (id, newQty) => {
        const updatedCartData = cartData.map(item => {
            if (item.id === id) {
                // Agar qiymat bo'sh yoki 0 bo'lsa, 1 qiymatini o'rnatamiz
                const validQty = newQty ? Math.max(1, Math.min(newQty, item.stock)) : 1;
                return {
                    ...item,
                    qty: validQty
                };
            }
            return item;
        });
        setCartData(updatedCartData);
        localStorage.setItem("cart", JSON.stringify(updatedCartData));
    };

    useEffect(() => {
        if (cartData) {
            const total = cartData.reduce((acc, item) => {
                if (item.discount > 0) {
                    return acc + item.qty * item.discount;
                } else {
                    return acc + item.qty * item.price;
                }
            }, 0);
            setTotalPrice(total);
        }
    }, [cartData]);

    const addStorage = () => {
        const filteredCartData = cartData.map(item => ({
            id: item.id,
            qty: item.qty,
        }));
        localStorage.setItem('data', JSON.stringify({ totalPrice, isDelivery: change, products: filteredCartData }));
    };    

    // send conract
    const sendContract = async () => {
        const filteredCartData = cartData.map(item => ({
            id: item.id,
            qty: item.qty,
        }));
        localStorage.setItem('data', JSON.stringify({ totalPrice, isDelivery: change, products: filteredCartData }));
        const data = JSON.parse(localStorage.getItem('data'));

        try {
            const response = await axios.post(`https://5jiek.uz/api/v1/contract/create-contract-by-user`, data, {
                withCredentials:true
            })
            console.log(response.data);
            localStorage.removeItem("cart");
            localStorage.removeItem("data");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header order={order} />
            <section className="mt-28 mb-72">
                <div className="container">
                    <h1 className="text-[30px] font-bold">{t("cartTitle1")} {cartData?.length}</h1>
                    <div className="carts flex">
                        <div className="carts__left mt-10">
                            {cartData?.map(item => {
                                return (
                                    <div key={item?.id} className="carts__item flex border-2 border-solid rounded-lg mt-5 p-4">
                                        {/* Slider for item images */}
                                        <div className="w-[250px] h-[250px] relative z-[-10]">
                                            <Slider {...sliderSettings}>
                                                {item.image.map((imageSrc, index) => (
                                                    <div key={index} className="flex flex-col">
                                                        <img className="" src={imageSrc} width={250} height={250} alt="item image" />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>

                                        <div className="carts__item--wrapper ml-5">
                                            <div className="carts__item--text w-[600px]">
                                                <h2 className="carts__item--heading text-[25px] font-bold mb-2">{item?.[`name_${i18n.language}`]}</h2>
                                                <p className="carts__item--text w-[400px] text-[20px] mb-2"> {cleanHTML(item?.[`description_${i18n.language}`])}</p>
                                                <span className="carts__item--span  block text-[20px] mb-2">{item.category?.[`name_${i18n.language}`]}</span>
                                                <div className="carts__item--div text-[15px]"><span className="underline font-bold">{t("mainTitle4")}:</span> {item.stock} {item?.[`unit_${i18n.language}`]}</div>
                                            </div>

                                            <div className="carts__counts inline-block border-2 border-solid border-black p-2 min-w-32 rounded-lg relative left-[300px] bottom-8">
                                                <button className="text-[10px]" onClick={() => decreaseCount(item?.id)}>
                                                    <img src={minus} width={20} alt="minus" />
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item?.qty}
                                                    onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))}
                                                    className="ml-5 text-[20px] w-16 text-center"
                                                    min="1"
                                                    max={item.stock}
                                                />
                                                
                                                <button className={`ml-5 ${item.qty === item.stock ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                                    onClick={() => increaseCount(item?.id)} 
                                                    disabled={item.qty === item.stock}>
                                                    <img src={plus} width={18} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="carts__item--delete relative right-10">
                                            <button className="relative " onClick={() => cartDelete(item?.id)}>
                                                <div className="flex items-center">
                                                    <img src={deleteCart} width={30} alt="delete" /> <span className="text-black text-[20px] opacity-[0.6]">{t("cartTitle7")}</span>
                                                </div>
                                            </button>
                                            <div className="carts__item--price relative top-20">
                                                <div className="text-[30px]"> {item?.discount * item?.qty}</div>
                                                <div><span className="line-through opacity-[0.5] text-[20px]">{item?.price * item?.qty}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="carts__right w-[400px] h-64 mt-14 ml-5 border-2 border-solid p-2 rounded-lg">
                            <h2 className="text-[20px] font-bold">{t("cartTitle2")}</h2>
                            <p className="mt-3 opacity-[0.6] ">{t("cartTitle3")} ({cartData?.length}) </p>
                            <div className="mt-3 text-center border-2 border-solid border-blue-600  text-blue-700 p-1">{t("cartTitle5")} <input onChange={() => setChange(!change)} type="checkbox" /></div>

                            <div className="flex justify-between">
                                <span className="inline-block mt-3 opacity-[0.6]">{t("cartTitle4")}</span>
                                <span className="inline-block mt-3 mr-4"> <b>{totalPrice}</b> cym</span>
                            </div>
                            <Link className="block" to={change && user ? `/adress` : `/`}>

                            <button 
                                onClick={() => {
                                    if (change) {
                                        addStorage(); // change true bo'lsa, ma'lumotlarni saqlash
                                    } else {
                                        sendContract(); // Aks holda kontraktni yuborish
                                    }
                                }} 
                                className="p-3 bg-blue-800 text-white rounded-lg mt-4 w-[100%]">
                                {t("cartTitle6")}
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

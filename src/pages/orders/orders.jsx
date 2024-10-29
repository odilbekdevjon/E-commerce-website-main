"use client";
import "./orders.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../../utility/api";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// images
import minus from "../../assets/minus-sign.png";
import plus from "../../assets/plus-solid.svg";
// react-slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";


export default function Orders() {
    const { t, i18n } = useTranslation();
    const [user] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [singleData, setSingleData] = useState();
    const [, setError] = useState(null);
    const { id } = useParams();
    const [count, setCount] = useState(1); // Mahsulot miqdorini alohida saqlaymiz
    const [totalPrice, setTotalPrice] = useState(0);
    const [change, setChange ] = useState(false);        


    function cleanHTML(input) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = input;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    // Slider uchun sozlamalar
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    // Mahsulotni olish
    useEffect(() => {
        API.get(`/product/get-product/${id}`)
            .then(response => {
                const productData = response.data.data;
                setSingleData(productData);
            })
            .catch(error => {
                setError(error);
            });
    }, [id]);

    const increaseCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    // Umumiy narxni hisoblash
    useEffect(() => {
        if (singleData) {
            const price = singleData.discount > 0 ? singleData.discount * count : singleData.price * count;
            setTotalPrice(price);
        }
    }, [singleData, count]);
    
    const addStorage = () => {
        // Faqat singleData asosida ma'lumotni saqlash
        const productData = {
            id: singleData?.id,
            qty: count,
        };
        localStorage.setItem('data', JSON.stringify({ totalPrice, isDelivery: change, products: [productData] }));
    };
    
    // sendContract funksiyasini yangilash
    const sendContract = async () => {
        const productData = {
            id: singleData?.id,
            qty: count,
        };
        localStorage.setItem('data', JSON.stringify({ totalPrice, isDelivery: change, products: [productData] }));
        const data = JSON.parse(localStorage.getItem('data'));
        console.log("Yuborilayotgan data:", data); // Tekshirish uchun
    
        try {
            const response = await axios.post(`https://5jiek.uz/api/v1/contract/create-contract-by-user`, data, {
                withCredentials: true
            });
            console.log(response.data);
            localStorage.removeItem("cart");
            localStorage.removeItem("data");
            window.location.reload();
        } catch (error) {
            console.error("Xatolik:", error.response ? error.response.data : error.message);
        }
    }
    

    return (
        <>
            <Header order={order} />
            <div className="container">
                <ul className="order mt-28 mb-10">
                    {singleData && (
                        <li className="order__item flex p-2 border-solid border-2 rounded mt-5 hover:shadow-lg w-[800px] min-h-[450px]">
                            <div className="slider-container w-[350px] h-[350px] mb-4  mr-5 ml-4">
                                <Slider {...sliderSettings}>
                                    {singleData.image.map((imageSrc, index) => (
                                        <div key={index} className="order__item__wrapp flex flex-col">
                                            <img className="order__item__image" src={imageSrc} width={350} height={350} alt={`item image ${index}`} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="ml-5">
                                <h2 className="order__name mb-2 font-bold text-[30px]">{singleData?.[`name_${i18n.language}`]}</h2>
                                <p className="order__text w-96">{cleanHTML(singleData?.[`description_${i18n.language}`])}</p>
                                <div className="my-2">
                                    <b>{singleData.massa} </b> ({t("mainTitle4")}: {singleData.stock} {singleData.unit_uz})
                                </div>
                                <div className="order__wrapper flex">
                                    <div className="order__wrapp">
                                        <div>
                                            <span className="text-blue-600 text-[25px]">{totalPrice}</span>
                                        </div>

                                        <span className="opacity-[0.5] text-[15px] block mb-1 line-through">{singleData.price * count}</span>

                                        <div className="carts__counts inline-block border-2 border-solid border-black p-2 min-w-32 rounded-lg">
                                            <button 
                                                className="text-[10px]" 
                                                onClick={decreaseCount} 
                                                disabled={count <= 1} 
                                            >
                                                <img src={minus} width={20} alt="minus" />
                                            </button>

                                            <input
                                                type="number"
                                                className="ml-5 text-[20px] w-16 text-center"
                                                value={count}
                                                min="1"
                                                max={singleData.stock} // Stokdagi maksimal qiymatni o'rnatamiz
                                                onChange={(e) => {
                                                    const newCount = Math.max(1, Math.min(parseInt(e.target.value), singleData.stock)); // Qiymatni 1 va stok oralig'ida ushlab turish
                                                    setCount(newCount);
                                                }}
                                                disabled={count === singleData.stock} 
                                            />

                                            <button 
                                                className="ml-5"
                                                onClick={increaseCount}
                                                disabled={count >= singleData.stock}
                                            >
                                                <img src={plus} width={18} alt="plus" />
                                            </button>

                                        </div>
                                        <div className="mt-3 text-center border-2 border-solid border-blue-600  text-blue-700 p-1">{t("cartTitle5")} <input onChange={() => setChange(!change)} type="checkbox" /></div>

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
                        </li>
                    )}
                </ul>
            </div>
            <Footer />
        </>
    );
}

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

export default function Orders() {
    const { t, i18n } = useTranslation();
    const [user] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [singleData, setSingleData] = useState();
    const [, setError] = useState(null);
    const { id } = useParams();
    const [count, setCount] = useState(1); // Mahsulot miqdorini alohida saqlaymiz
    const [totalPrice, setTotalPrice] = useState(0);

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

    console.log(singleData);

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

    // Mahsulotni localStorage'ga qo'shish
const addStorage = () => {
    const productData = {
        id: singleData.id,
        name: singleData[`name_${i18n.language}`], // Mahsulot nomi
        description: cleanHTML(singleData[`description_${i18n.language}`]), // Mahsulot tavsifi
        image: singleData.image, // Mahsulot rasmi
        massa: singleData.massa, // Mahsulot og'irligi
        stock: singleData.stock, // Mahsulot omborda borligi
        unit: singleData.unit_uz, // Mahsulot birligi
        price: singleData.price, // Mahsulot narxi
        discount: singleData.discount, // Chegirma
        qty: count, // Mahsulot miqdori
        totalPrice: totalPrice, // Jami narx
    };

    // Mahalliy saqlashda mavjud mahsulotlarni olish
    const storedData = localStorage.getItem('data');

    let currentData = [];

    // Agar ma'lumot mavjud bo'lsa va to'g'ri formatda bo'lsa
    if (storedData) {
        try {
            currentData = JSON.parse(storedData);
            if (!Array.isArray(currentData)) {
                currentData = []; // Noto'g'ri format bo'lsa bo'sh massivga qaytish
            }
        } catch (error) {
            console.error("JSON parsingda xato:", error);
            currentData = []; // Parsing xato bo'lsa bo'sh massivga qaytish
        }
    }

    // Yangi mahsulotni qo'shish
    currentData.push(productData);

    // Yangilangan ma'lumotlarni saqlash
    localStorage.setItem('data', JSON.stringify(currentData));

    console.log("Mahsulot saqlandi:", productData);
};

    return (
        <>
            <Header order={order} />
            <div className="container">
                <ul className="order mt-28 mb-10">
                    {singleData && (
                        <li className="order__item flex p-2 border-solid border-2 rounded mt-5 hover:shadow-lg w-[800px] min-h-[450px]">

                            {/* <img className="order__img mb-4 rounded-lg border-2" src={singleData.image[0]} width={350} height={300} alt="image" /> */}

                            <div className="slider-container w-[350px] h-[350px] mb-4 rounded-lg border-2 mr-5 ml-4">
                                {/* Slider component */}
                                <Slider {...sliderSettings}>
                                    {singleData.image.map((imageSrc, index) => (
                                        <div key={index} className="flex flex-col">
                                            <img src={imageSrc} width={350} height={350} alt={`item image ${index}`} />
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
                                            <button className="text-[10px]" onClick={decreaseCount}>
                                                <img src={minus} width={20} alt="minus" />
                                            </button>

                                            <span className="inline-block ml-5 text-[20px]">{count}</span>

                                            <button className="ml-5" onClick={increaseCount}>
                                                <img src={plus} width={18} alt="plus" />
                                            </button>
                                        </div>
                                        <Link className="block" to={user ? `/adress` : null}>
                                            <button onClick={addStorage} className="p-3 bg-blue-800 text-white rounded-lg mt-4 w-[100%]">
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

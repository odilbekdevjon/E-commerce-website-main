import "./carts.scss";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// images
import deleteCart from "../../assets/delete.svg";
import minus from "../../assets/minus-sign.png";
import plus from "../../assets/plus-solid.svg";
import { Link } from "react-router-dom";
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Carts() {
    const [user] = useAuth()
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const [cartData, setCartData] = useState(JSON.parse(window.localStorage.getItem("cart")) || []);    
    const [totalPrice, setTotalPrice] = useState(0)

    var settings = {
        dots: true,
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
        localStorage.setItem("cart", JSON.stringify(updatedCartData));
    }

    const increaseCount = (id) => {
        const updteProductCount = cartData.map(item => {
            if (id === item.id) {
                return {
                    ...item,
                    qty: item.qty + 1
                }
            } else {
                return item
            }
        })

        setCartData(updteProductCount)
        localStorage.setItem("cart", JSON.stringify(updteProductCount))
    };

    const decreaseCount = (id) => {
        const updteProductCount = cartData.map(item => {
            if (id === item.id) {
                return {
                    ...item,
                    qty: item.qty - 1
                }
            } else {
                return item
            }
        })

        setCartData(updteProductCount)
        localStorage.setItem("cart", JSON.stringify(updteProductCount))
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

        const filteredCartData = cartData.map(item => {

            return {

                id: item.id,
                qty: item.qty

            }
        })
        localStorage.setItem('data', JSON.stringify({totalPrice, isDelivery:true , products:filteredCartData}))
    }


    return (
        <>
            <Header order={order} />
            <section className="mt-28 mb-72">
                <div className="container">
                    <h1 className="text-[30px] font-bold">{t("cartTitle1")} {cartData?.length}</h1>
                    <div className="carts flex">
                        <div className="carts__left mt-10">
                            {
                                cartData?.map(item => {
                                    return (
                                        <div key={item?.id} className="carts__item flex border-2 border-solid rounded-lg mt-5 p-4">
                                            <img className="carts__item--image" src={item?.image[0]} width={250} height={250} alt="" />

                                            {/* <Slider {...settings}> */}
                                            {/* {
                                                        item.image.map((image, index) => (
                                                            <div key={index} className="">
                                                                <img className="carts__item--image flex" src={image} width={250} height={250} alt="" />
                                                            </div>
                                                        ))
                                                    } */}
                                            {/* </Slider> */}

                                            {/* {item?.[`description_${i18n.language}`]} */}

                                            <div className="carts__item--wrapper ml-5">
                                                <div className="carts__item--text w-[600px]">
                                                    <h2 className="carts__item--heading text-[25px] font-bold mb-2">{item?.[`name_${i18n.language}`]}</h2>
                                                    <p className="carts__item--text w-[400px] text-[20px] mb-2"> {item?.[`description_${i18n.language}`]}</p>
                                                    <span className="carts__item--span  block text-[20px] mb-2">{item.category?.[`name_${i18n.language}`]}</span>
                                                    <div className="carts__item--div text-[15px]"><span className="underline font-bold">Sklad:</span> {item.stock} {item?.unit_uz}</div>
                                                </div>

                                                <div className="carts__counts inline-block border-2 border-solid border-black p-2 min-w-32 rounded-lg relative left-[300px] bottom-8">
                                                    <button className="text-[10px]" onClick={() => decreaseCount(item?.id)}>
                                                        <img src={minus} width={20} alt="minus" />
                                                    </button>

                                                    <span className="inline-block ml-5 text-[20px]">{item?.qty}</span>

                                                    <button className="ml-5" onClick={() => increaseCount(item?.id)}>
                                                        <img src={plus} width={18} alt="plus" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="carts__item--delete relative right-10">
                                                <button className="relative " onClick={() => cartDelete(item?.id)}>
                                                    <div className="flex items-center">
                                                        <img src={deleteCart} width={30} alt="delete" /> <span className="text-black text-[20px] opacity-[0.6]">delete</span>
                                                    </div>
                                                </button>
                                                <div className="carts__item--price relative top-20">
                                                    <div className="text-[30px]"> {item?.discount * item?.qty}</div>
                                                    <div><span className="line-through opacity-[0.5] text-[20px]">{item?.price * item?.qty}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="carts__right w-[400px] h-64 mt-14 ml-5 border-2 border-solid p-2 rounded-lg">
                            <h2 className="text-[20px] font-bold">{t("cartTitle2")}</h2>
                            <p className="mt-3 opacity-[0.6] ">{t("cartTitle3")} ({cartData?.length}) </p>
                            <div className="mt-3 text-center border-2 border-solid border-blue-600  text-blue-700 p-1">Yetkazib berish muddati: 10 kun ichida</div>

                            <div className="flex justify-between">
                                <span className="inline-block mt-3 opacity-[0.6]">{t("cartTitle4")}</span>
                                <span className="inline-block mt-3 mr-4"> <b>{totalPrice}</b> cym</span>
                            </div>
                            <Link className="block" to={user ? `/adress` : null}>
                                <button onClick={addStorage} className="p-3 bg-blue-800 text-white rounded-lg mt-4 w-[100%]">Rasmiylashtirishga o'tish</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
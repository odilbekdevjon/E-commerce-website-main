import "./Main.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../utility/api";
// images
import cart from "../../assets/add-to-cart.png";
import cartSvg from "../../assets/cart-plus-svgrepo-com.svg";
// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Main({setOrder}) {

    function cleanHTML(input) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = input;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [, setError] = useState(null);
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [ discountProducts, setDiscountProducts ] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const showAddToCartModal = () => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // Hides modal after 2 seconds
    };


    
        var settings = {
          dots: true,              
          infinite: true,          
          speed: 500,              
          slidesToShow: 4,         
          slidesToScroll: 1,      
          autoplay: true,          
        //   autoplaySpeed: 2000, 
        responsive: [
            {
                breakpoint: 768,  // Ekran kengligi 1024px dan kichik bo'lganda
                settings: {
                    slidesToShow: 2,  // 2 ta slayd ko'rsatiladi
                    slidesToScroll: 1,  // 1 ta slayd o'tadi
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 500,  // Ekran kengligi 600px dan kichik bo'lganda
                settings: {
                    slidesToShow: 1,  // 1 ta slayd ko'rsatiladi
                    slidesToScroll: 1  // 1 ta slayd o'tadi
                }
            },
            {
                breakpoint: 400,  // Ekran kengligi 600px dan kichik bo'lganda
                settings: {
                    slidesToShow: 1,  // 1 ta slayd ko'rsatiladi
                    slidesToScroll: 1  // 1 ta slayd o'tadi
                }
            }
            ]
        };

    //  get top products 
    useEffect(() => {
        API.get('/product/get-top-products')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);       

      //  get new products 
    useEffect(() => {
        API.get('/product/get-new-products')
            .then(response => {
                setNewData(response.data.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);   
    
    //  get discount products 
    useEffect(() => {
        API.get('/product/get-products-discount')
            .then(response => {
                setDiscountProducts(response.data.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []); 

    // addToCardforTopProducts
    const addToCardforTopProducts = (id) => {
        const oldCard = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const findOldCard = oldCard.some(item => item.id === id)
        
        if (findOldCard) {
            const updateCard = oldCard.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    }
                } else {
                    return item
                }
            })
            localStorage.setItem('cart', JSON.stringify(updateCard))
        } else {
            const filteredData = data.find(i => i.id == id);
            const newCard = [...oldCard, { ...filteredData, qty: 1 }]
            setOrder(newCard)
            localStorage.setItem('cart', JSON.stringify(newCard))
        }
        showAddToCartModal();
    }

    // addToCardForNewData
    const addToCardForNewData = (id) => {
        const oldCard = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const findOldCard = oldCard.some(item => item.id === id)
        
        if (findOldCard) {
            const updateCard = oldCard.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    }
                } else {
                    return item
                }
            })
            localStorage.setItem('cart', JSON.stringify(updateCard))
        } else {
            const filteredData = newData.find(i => i.id === id);
            const newCard = [...oldCard, { ...filteredData, qty: 1 }]
            setOrder(newCard)
            localStorage.setItem('cart', JSON.stringify(newCard))
        }
        showAddToCartModal();
    }

    // addToCardforTopProducts
    const addToCardforDiscountProducts = (id) => {
            const oldCard = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
            const findOldCard = oldCard.some(item => item.id === id)
            
            if (findOldCard) {
                const updateCard = oldCard.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            qty: item.qty + 1
                        }
                    } else {
                        return item
                    }
                })
                localStorage.setItem('cart', JSON.stringify(updateCard))
            } else {
                const filteredData = discountProducts.find(i => i.id == id);
                const newCard = [...oldCard, { ...filteredData, qty: 1 }]
                setOrder(newCard)
                localStorage.setItem('cart', JSON.stringify(newCard))
            }
            showAddToCartModal();
    }

    return (
        <div className="container">
            <main className="main mt-10">
                    <h1 className="font-bold text-[30px] text-center">
                        {t("mainTitle1")}
                    </h1>
                    <ul className="main__list mb-10">
                    <Slider {...settings}>
                       {
                            data?.map(item => {                                
                                return (
                                    <li id="cars" key={item?.id} className="main__item w-[350px] p-4 border-solid border-2 rounded mt-5 hover:shadow-lg bg-blue-700 text-white">
                                        <span className="main__span p-2 bg-red-600 absolute rounded-lg text-white font-bold">{t("mainTitle7")}</span>
                                        <img className=" mb-4 rounded-lg" src={item?.image[0]} width={300} height={250} alt="" />
                                        <h2 className="mb-2 font-bold text-[25px]">{item?.[`name_${i18n.language}`]}</h2>
                                        <p className="text-ellipsis w-60 ">
                                            {cleanHTML(item?.[`description_${i18n.language}`])}
                                        </p>
                                        <span className="block mt-4 mb-1">{item?.discount}</span>
                                        <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item?.price}</span>
                                        <div className="">(<b>{t("mainTitle4")}:</b> {item?.stock})</div>
                                        <div className="main__wrapp flex items-center">
                                            <Link className="main__link w-40 p-2 rounded-lg  mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>{t("mainTitle8")}</Link>
                                            <button onClick={() => addToCardforTopProducts(item?.id)} className="main__cart-img ml-20 mt-4 border-2 border-solid border-white p-1 rounded-lg hover:cursor-pointer">
                                                <img className="" src={cartSvg} width={30} height={30} alt="cart" />
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        </Slider>
                    </ul>
                <div className="main__wrapper">
                    <h2 className="text-[30px] font-bold text-center">{t("mainTitle2")}</h2>
                    <ul className="main__wrapper__list flex mb-20">
                        {
                            newData?.map(item => {
                                return (
                                    <li id="cars" key={item?.id} className="main__wrapper__item w-[350px] p-4 border-solid border-2 rounded mt-5 hover:shadow-lg mr-10">
                                        <span className="main__wrapper__span p-2 bg-red-600 absolute rounded-lg text-white font-bold">{t("mainTitle3")}</span>
                                        <img className="main__wrapper__img mb-4 rounded-lg" src={item?.image[0]} width={300} height={200} alt="" />
                                        <h2 className="mb-2 font-bold text-[25px]">{item?.[`name_${i18n.language}`]}</h2>
                                        <p className="main__wrapper__text text-ellipsis w-60 ">
                                            {cleanHTML(item?.[`description_${i18n.language}`])}
                                        </p>
                                        <span className="block mt-4 mb-1">{item?.discount}</span>
                                        <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item?.price}</span>
                                        <div className="">(<b>{t("mainTitle4")}:</b> {item?.stock})</div>
                                        <div className="main__wrapper__wrapp flex items-center">
                                            <Link className="main__wrapper__link w-40 p-2 rounded-lg  mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>{t("mainTitle8")}</Link>
                                            <button onClick={() => addToCardForNewData(item?.id)} className="main__wrapper__cart-img ml-20 mt-4 border-2 border-solid border-black p-1 rounded-lg hover:cursor-pointer">
                                                <img className="" src={cart} width={30} height={30} alt="cart" />
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="main__wrapp">
                    <h2 className="text-[30px] font-bold text-center">{t("mainTitle5")}</h2>
                    <ul className="main__wrapp__list flex mb-20">
                        {
                            discountProducts?.map(item => {
                                return (
                                    <li id="cars" key={item?.id} className="main__wrapp__item w-[350px] p-4 border-solid border-2 rounded mt-5 hover:shadow-lg mr-10">
                                        <span className="main__wrapp__span p-2 bg-red-600 absolute  rounded-lg text-white font-bold">{t("mainTitle6")}</span>
                                        <img className="main__wrapp__img mb-4 rounded-lg" src={item?.image[0]} width={300} height={200} alt="" />
                                        <h2 className="mb-2 font-bold text-[25px]">{item?.[`name_${i18n.language}`]}</h2>
                                        <p className="main__wrapp__text text-ellipsis w-60 ">
                                            {cleanHTML(item?.[`description_${i18n.language}`])}
                                        </p>
                                        <span className="block mt-4 mb-1">{item?.discount}</span>
                                        <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item?.price}</span>
                                        <div className="">(<b>{t("mainTitle4")}:</b> {item?.stock})</div>
                                        <div className="main__wrapp__wrapp flex items-center">
                                            <Link className="main__wrapp__link w-40 p-2 rounded-lg  mt-4 bg-sky-900 text-white font-bold" to={`/order/${item?.id}`}>{t("mainTitle8")}</Link>
                                            <button onClick={() => addToCardforDiscountProducts(item?.id)} className="main__wrapp__cart-img ml-20 mt-4 border-2 border-solid border-black p-1 rounded-lg hover:cursor-pointer">
                                                <img className="" src={cart} width={30} height={30} alt="cart" />
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Product added to cart!</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
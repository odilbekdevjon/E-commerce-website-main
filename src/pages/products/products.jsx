import "./products.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../utility/api";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer"; 
// images
import cart from "../../assets/add-to-cart.png";

export default function Products() {
    function cleanHTML(input) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = input;
        return tempDiv.textContent || tempDiv.innerText || "";
    }
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const { t, i18n } = useTranslation();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Ekranda ko'rsatiladigan mahsulotlar soni
    const [showModal, setShowModal] = useState(false);


    const showAddToCartModal = () => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // Hides modal after 2 seconds
    };

    // get products
    useEffect(() => {
        API.get('/product/get-products')
        .then(response => {
            setProducts(response.data.data); 
        })
        .catch(error => {
            setError(error);
        });
    }, []);

    // get category
    useEffect(() => {
        API.get('/categorie/get-categories')
            .then(response => {
                setCategory(response.data.categories);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    const addToCard = (id) => {
        const oldCard = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const findOldCard = oldCard.some(item => item.id === id);
        
        if (findOldCard) {
            const updateCard = oldCard.map(item => {
                if (item.id === id) {
                    return { ...item, qty: item.qty + 1 };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(updateCard));
        } else {
            const filteredData = products.find(i => i.id === id);
            const newCard = [...oldCard, { ...filteredData, qty: 1 }];
            localStorage.setItem('cart', JSON.stringify(newCard));
        }
        // window.location.reload();
        showAddToCartModal();
    }

    const changeProducts = (id) => {
        const filteredProduct = products.filter(item => item.categoryId === id);
        setFilteredProducts(filteredProduct);
        setCurrentPage(1); // Filter qilinganida sahifani 1 ga qaytaramiz
    }

    // Sahifada ko'rsatilishi kerak bo'lgan mahsulotlarni olish
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.length > 0 ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct) : products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Sahifani o'zgartirish funksiyasi
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Sahifalar sonini hisoblash
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil((filteredProducts.length > 0 ? filteredProducts.length : products.length) / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Header order={order} />
            <section className="mt-20">
                <div className="container">
                    <div className="products flex">
                        <div className="products__left w-[400px]">
                            <div className="flex pt-10 ">
                                <Link className="opacity-[0.5]" to={'/'}>{t("headerTitle1")}</Link>
                                <span className="font-bold mr-2 ml-2"> > </span>
                                <Link className="" to={'/profile'}>{t("categoryTitle2")}</Link>
                            </div>
                            <h1 className="products__heading font-bold text-[25px] pt-10">{t("categoryTitle1")}</h1>

                            {
                                category?.map(item => (
                                    <div key={item.id} className="mt-5">
                                        <h3 onClick={() => changeProducts(item.id)} className="w-64 text-[20px] mb-4 cursor-pointer hover:text-blue-700">{item?.[`name_${i18n.language}`]}</h3>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="products__right">
                            <h2 id="products" className="font-bold text-[30px] pt-10">{t("productTitle3")}</h2>
                            <ul className="products__list flex  mb-10">
                                {currentProducts?.map(item => (
                                    <li id="cars" key={item.id} className="products__item w-[320px] p-5 border-solid border-2 rounded mt-5 mr-4 hover:shadow-lg">
                                        <img className="products__item__img mb-4 rounded-lg" src={item.image[0]} width={280} height={250} alt="" />
                                        <h2 className="mb-2 font-bold text-[25px]">{item?.[`name_${i18n.language}`]}</h2>
                                        <p className="main__text text-ellipsis w-60 ">{cleanHTML(item?.[`description_${i18n.language}`])}</p>
                                        <span className="block mt-4 mb-1">{item.discount}</span>
                                        <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                        <div className="">(<b>{t("mainTitle4")}:</b> {item.stock})</div>
                                        <div className="main__wrapp flex items-center">
                                            <Link className=" w-40 p-2 rounded-lg  mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link>
                                            <button onClick={() => addToCard(`${item.id}`)} className="main__cart-img ml-20 mt-4 border-2 border-solid border-black p-1 rounded-lg hover:cursor-pointer">
                                                <img className="" src={cart} width={30} height={30} alt="cart" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {showModal && (
                            <div className="modal">
                                <div className="modal-content">
                                    <p className="modal__text">Product added to cart!</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-center mb-10">
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => paginate(number)} className={`border-2 border-solid border-black p-2 rounded-lg mr-2 pagination-button ${number === currentPage ? 'active' : ''}`}>
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

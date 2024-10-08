import "./products.scss";

import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer"; 
// images
import cart from "../../assets/add-to-cart.png";



export default function Products({setOrder}) {
  const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

    const { t , i18n } = useTranslation();

    const [ products, setProducts ] = useState();
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);


    // get products
    useEffect(() => {
        axios.get('https://5jiek.uz/api/v1/product/get-products' , {
            withCredentials: true
        })
        .then(response => {
            setProducts(response.data.data); 
            })
        .catch(error => {
            setError(error);
        });
    },[""]);

    //  get category
    useEffect(() => {
        axios.get('https://5jiek.uz/api/v1/categorie/get-categories')
            .then(response => {
                setCategory(response.data.categories);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    const addToCard = (id) => {

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
            const filteredData = products.find(i => i.id == id);
            const newCard = [...oldCard, { ...filteredData, qty: 1 }]
            setOrder(newCard)
            localStorage.setItem('cart', JSON.stringify(newCard))
        }
    }


    return(
        <>
           <Header order={order}/>
                <section className="mt-20">
                    <div className="container">
                        <div className="products flex">
                            <div className="products__left w-[450px]">
                                <div className="flex pt-10 ">
                                    <Link className="opacity-[0.5]" to={'/'}>{t("headerTitle1")}</Link>
                                    <span className="font-bold mr-2 ml-2"> > </span>
                                    <Link className="" to={'/profile'}>{t("categoryTitle2")}</Link>
                                 </div>
                                <h1 className="products__heading font-bold text-[25px] pt-10">{t("categoryTitle1")}</h1>

                                {
                                    category?.map(item => {
                                        return(
                                            <div key={item.id} className="mt-5">
                                                <h3 className="text-[18px] mb-4">{item?.[`name_${i18n.language}`]}</h3>
                                               
                                            </div>
                                        )
                                    })
                                }
 
                            </div>
                            <div className="products__right">
                                <h2 id="products" className="font-bold text-[30px] pt-10">Barcha maxsulotlar</h2>
                                <ul className="main__list flex flex-wrap mb-10">
                                    {
                                        products?.map(item => {
                                            return(
                                                <li id="cars" key={item.id} className="main__item w-[320px] p-5 border-solid border-2 rounded mt-5 mr-4 hover:shadow-lg">
                                                <img className="main__img mb-4 rounded-lg" src={item.image[0]} width={280} height={250} alt="" />
                                                <h2 className="mb-2 font-bold text-[25px]">{item.name_uz}</h2>
                                                <p className="main__text text-ellipsis w-60 ">{item.description_uz}</p>
                                                <span className="block mt-4 mb-1">{item.discount}</span>
                                                <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                                <div className="">(<b>qoldiq:</b> {item.stock})</div>
                                                <div className="main__wrapp flex items-center">
                                                    <a className="main__link" href=""><Link className=" w-40 p-2 rounded-lg  mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link></a>
                                                    <button onClick={() => addToCard(`${item.id}`)} className="main__cart-img ml-20 mt-4 border-2 border-solid border-black p-1 rounded-lg hover:cursor-pointer">
                                                        <img className="" src={cart} width={30} height={30} alt="cart" />
                                                    </button>
                                                </div>
                                            </li>
                                                )
                                            })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="text-center mb-10">
                            Pagenation
                        </div>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
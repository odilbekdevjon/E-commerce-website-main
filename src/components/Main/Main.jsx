import "./Main.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';

// data
import { use } from "i18next";

// images
import cart from "../../assets/add-to-cart.png";


export default function Main({setOrder}) {
    const { t, i18n } = useTranslation();

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([])
    const [error, setError] = useState(null);
    const [cartData, setCartData] = useState([])

    //  get products 
    useEffect(() => {
        axios.get('https://5jiek.uz/api/v1/product/get-products')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);


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
        console.log(findOldCard);
        
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
    }


    return (
        <div className="container">
            <main className="main mt-10">
                {category?.map((cat, i) => <div key={i} className="main__wrapper">
                    <h1 className="font-bold text-[35px] text-center">
                        {cat?.[`name_${i18n.language}`]}
                    </h1>
                    <ul className="main__list flex justify-between flex-wrap mb-10">
                        {
                            data?.filter(i => i.categoryId == cat.id).map(item => {
                                return (
                                    <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg">
                                        <img className="main__img mb-4" src={item.image[0]} width={350} height={250} alt="" />
                                        <h2 className="mb-2 font-bold text-[25px]">{item.name_uz}</h2>
                                        <p className="w-80">{item.description_uz}</p>
                                        <span className="block mt-4 mb-1">{item.discount}</span>
                                        <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                        <div className="">(<b>qoldiq:</b> {item.stock})</div>
                                        <div className="flex items-center">
                                            <a className="main__link" href=""><Link className=" w-40 p-2 rounded-lg  mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link></a>
                                            <button onClick={() => addToCard(`${item.id}`)} className="ml-20 mt-4 border-2 border-solid border-black p-1 rounded-lg hover:cursor-pointer">
                                                <img className="" src={cart} width={30} height={30} alt="cart" />
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>)}
            </main>
        </div>
    )
}
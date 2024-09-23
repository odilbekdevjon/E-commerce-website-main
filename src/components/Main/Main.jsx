import "./Main.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';

// data
import { use } from "i18next";


export default function Main() {
    const { t } = useTranslation();

    const [ data, setData ] = useState([]);
    const [ category, setCategory ] = useState([])
    const [error, setError] = useState(null);
    const [ categoryName ,setCategoryName ] = useState(undefined)

    
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
    console.log(data);
    
    
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
    
    const findCategory = data.find(item => item.categoryId == item.category.id)    
    // const findCategory = category.find(i => i.name_slug_uz == 'qurilish-mollari')


    return(
        <div className="container">
            <main className="main mt-10">
            <div className="main__wrapper">
                <h1 className="font-bold text-[35px] text-center">
                    {findCategory?.category.name_uz}
                </h1>
                <ul className="main__list flex justify-between flex-wrap mb-10">
                 {
                    data?.filter(i => i.categoryId == findCategory.categoryId).map(item => {
                        return(
                            <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg">
                                <img className="main__img mb-4" src={item.image[0]} width={350} height={250} alt=""/>
                                <h2 className="mb-2 font-bold text-[25px]">{item.name_uz}</h2>
                                <p className="w-80">{item.description_uz}</p>
                                <span className="block mt-4 mb-1">{item.discount}</span>
                                <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                <div className="">(<b>qoldiq:</b> {item.stock})</div>
                                <a className="main__link" href=""><Link className=" w-40 p-2 rounded-lg block mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link></a>
                            </li>
                            )
                        })
                    }
                    </ul>
                </div>
                {/* <div className="main__wrapper">
                <h2 className="font-bold text-[35px] text-center">
                    {findCategory2.category.name_uz}
                </h2>
                <ul className="main__list flex justify-between flex-wrap mb-10">
                 {
                    data?.filter(i => i.categoryId == findCategory2.id).map(item => {
                        return(
                            <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg">
                                <img className="main__img mb-4" src={item.image[0]} width={250} height={250} alt=""/>
                                <h2 className="mb-2 font-bold text-[25px]">{item.name_uz}</h2>
                                <p className="">{item.description_uz}</p>
                                <span className="block mt-4 mb-1">{item.discount}</span>
                                <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                <div className="">(<b>qoldiq:</b> {item.stock})</div>
                                <a className="main__link" href=""><Link className=" w-40 p-2 rounded-lg block mt-4 bg-sky-900 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link></a>
                            </li>
                            )
                        })
                    }
                    </ul>
                </div> */}
            </main>
        </div>
    )
}
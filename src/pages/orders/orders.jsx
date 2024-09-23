"use client";

import "./orders.scss";

import { useState , useEffect} from "react";
import { CCarousel, CCarouselItem } from "@coreui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Orders() {

    const [ singleData ,setSingleData ] = useState();
    const [ , setError ] = useState(null);
    
    const { id } = useParams()

    // get products
    useEffect(() => {
        axios.get(`https://5jiek.uz/api/v1/product/get-product/${id}` , {
            withCredentials: true
        })
        .then(response => {
            setSingleData(response.data.data); 
            })
        .catch(error => {
            setError(error);
        });
    },[""]);

    const [count , setCount ] = useState(0)

    
    return(
        <>
        <Header/>
        <div className="container">
            <ul className="order mt-28 mb-10">
                {
                            <li id="cars" className="order__item flex p-2 border-solid border-2 rounded mt-5 hover:shadow-lg w-[800px] h-[400px]">
                                <img className="order__img mb-4 rounded-lg border-2" src={singleData?.image[0]} width={350} height={300} alt="image"/>
                                <div className="ml-5">
                                    <h2 className="order__name mb-2 font-bold text-[30px]">{singleData?.name_uz}</h2>
                                    <p className="order__text w-72">{singleData?.description_uz}</p>
                                    <div className="my-2"><b>{singleData?.massa} </b> (qoldi: {singleData?.stock} {singleData?.unit_uz} )</div>
                                   <div className="order__wrapper flex">
                                    <div className="order__wrapp">
                                           <div className=""> 
                                                <span className="text-blue-600  text-[25px]">{singleData?.discount}</span> 
                                                {/* <span className=" bg-cyan-700 text-white px-2 rounded-lg ml-4">{singleData.unit_uz}</span> */}
                                            </div>
                                            <span className="opacity-[0.5] text-[15px] block mb-1 line-through">{singleData?.price}</span>
                                            <input className="w-28 border-2 border-solid p-1" placeholder="son kiriting"  type="number" />
                                            <div className="p-4 bg-slate-200 rounded-lg mt-5 mr- flex justify-between items-center w-32">
                                                <button onClick={() => setCount(count - 1)} className="text-[20px] text-orange-500 font-bold">-</button><b>{count}</b> <button onClick={() => setCount(count + 1)} className="text-[20px] text-orange-500 font-bold">+</button>
                                            </div>
                                        </div>
                                        <div className="order__bottom ml-10 mt-20">
                                            <Link to={`/order/${singleData?.id}/adress`}><button className="w-40 p-2 rounded-lg block mt-14 bg-cyan-700 text-white font-bold z-[100]">Sotib olish</button> </Link>
                                            <div className="mt-4"><input type="checkbox" /> Yetkazib berish xizmati bilan</div> 
                                        </div>                         
                                   </div>
                                </div>
                            </li>
                }
            </ul>
        </div>
            <Footer />
        </>
    )
}
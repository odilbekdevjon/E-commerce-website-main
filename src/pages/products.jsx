import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// 
import ConstructionProducts from "../database/data";




export default function Products() {

    const { t } = useTranslation()

    return(
        <>
           <Header/>
                <section className="mt-20">
                    <div className="container">
                        <div className="">
                            <h1 id="products" className="font-bold text-[35px] text-center">{t("productTitle1")}</h1>
                            <ul className="main__list flex justify-between flex-wrap mb-10">
                            {
                                ConstructionProducts?.map(item => {
                                    return(
                                        <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg ">
                                            <img className="mb-4" src={item.image} width={250} height={250} alt=""/>
                                            <h2 className="mb-2 font-bold text-[25px]">{item.name}</h2>
                                            <div className="">(<b>qoldiq:</b> {item.balance})</div>
                                            <div className="mb-2">{item.massa}</div>
                                            <span className="text-blue-600">{item.discount}</span>
                                            <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                            <Link className="w-40 p-2 rounded-lg block mt-4 bg-cyan-700 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link>
                                        </li>
                                            )
                                    })
                                }
                            </ul>
                            <div className="">
                <h1 className="font-bold text-[35px] text-center">{t("productTitle2")}</h1>
                <ul id="products" className="main__list flex justify-between flex-wrap mb-10">
                 {
                    ConstructionProducts?.map(item => {
                        return(
                            <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg ">
                                <img className="mb-4" src={item.image} width={250} height={250} alt=""/>
                                <h2 className="mb-2 font-bold">{item.name}</h2>
                                <div className="mb-2">{item.massa}</div>
                                <span className="text-blue-600 block mb-1 line-through">{item.price}</span>
                                <span className="text-blue-600">{item.discount}</span>
                                <Link className="w-40 p-2 rounded-lg block mt-4 bg-cyan-700 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link>
                            </li>
                                )
                                    })
                    }
                    </ul>
                </div>
                        </div>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
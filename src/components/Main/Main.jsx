import "./Main.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// data
import ConstructionProducts from "../../database/data";


export default function Main() {
    
    const { t } = useTranslation()


    return(
        <div className="container">
            <main className="main mt-10">
            <div className="main__wrapper">
                <h1 id="products" className="font-bold text-[35px] text-center">{t("productTitle1")}</h1>
                <ul className="main__list flex justify-between flex-wrap mb-10">
                 {
                    ConstructionProducts?.map(item => {
                        return(
                            <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg">
                                <img className="main__img mb-4" src={item.image} width={250} height={250} alt=""/>
                                <h2 className="mb-2 font-bold text-[25px]">{item.name}</h2>
                                <div className="">(<b>qoldiq:</b> {item.balance})</div>
                                <div className="mb-2">{item.massa}</div>
                                <span className="text-blue-600">{item.discount}</span>
                                <span className="opacity-[0.5] block mb-1 line-through text-[12px]">{item.price}</span>
                                <a className="main__link" href=""><Link className=" w-40 p-2 rounded-lg block mt-4 bg-cyan-700 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link></a>
                            </li>
                                )
                        })
                    }
                    </ul>
                </div>
                <div className="">
                <h1 className="font-bold text-[35px] text-center">{t("productTitle2")}</h1>
                <ul id="products" className="main__list flex justify-between flex-wrap mb-10">
                 {
                    ConstructionProducts?.map(item => {
                        return(
                            <li id="cars" key={item.id} className="main__item p-5 border-solid border-2 rounded mt-5 hover:shadow-lg ">
                                <img className="main__img mb-4" src={item.image} width={250} height={250} alt=""/>
                                <h2 className="mb-2 font-bold">{item.name}</h2>
                                <div className="mb-2">{item.massa}</div>
                                <span className="text-blue-600">{item.discount}</span>
                                <span className="text-black block mb-1 line-through opacity-[0.5] text-[12px]">{item.price}</span>
                                <a className="main__link" href=""><Link className="w-40 p-2 rounded-lg block mt-4 bg-cyan-700 text-white font-bold" to={`/order/${item.id}`}>Batafsil ma'lumot</Link></a>
                            </li>
                                )
                                    })
                    }
                    </ul>
                </div>
            </main>
        </div>
    )
}
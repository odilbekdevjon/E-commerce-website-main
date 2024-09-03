import { useTranslation } from "react-i18next";

// components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// images
import product from "../assets/product.svg";
import deleveriy from "../assets/delivery.png";
import contract from "../assets/contract.svg";



export default function Contact() {

    const { t } = useTranslation()

    return(
        <>
            <Header />
                <section className="mt-20 mb-52">
                    <div className="container">
                        <div className="contact mt-40 flex">
                            <div className="contact__left  ml-36 mr-80">
                                <h1 className="font-bold text-[45px] tracking-[1px]">{t("pageContact")}</h1>
                                <span className="block mt-5 mb-10 text-[20px] text-orange-600 font-bold">Ask us about</span>
                                <div className="flex items-center mb-5">
                                    <img className="mr-5" src={product} width={"45"} height={"40"} alt="product" />
                                    <p className="">Different quality products</p>
                                </div>
                                <div className="flex items-center mb-5">
                                    <img className="mr-5" src={deleveriy} width={"45"} height={"40"} alt="product" />
                                    <p className="">Home delivery services</p>
                                </div>
                                <div className="flex items-center mb-5">
                                    <img className="mr-5" src={contract} width={"45"} height={"40"} alt="product" />
                                    <p className="">Long term contract</p>
                                </div>
                                
                            </div>
                            <div className="contact__right ">
                                <form action="">
                                    <div className="">
                                        <input className="p-5 rounded-lg border-b-2 border-solid border-black mb-5 w-80" type="text" placeholder="Name" />
                                    </div>
                                    <div className="">
                                        <input className="p-5 rounded-lg border-b-2 border-solid border-black mb-5 w-80" type="email" placeholder="Email" />
                                    </div>
                                    <div className="">
                                        <input className="p-5 rounded-lg border-b-2 border-solid border-black mb-5 w-80" type="tel" placeholder="Phone" />
                                    </div>
                                    <div className="">
                                        <textarea className="p-5 rounded-lg border-b-2 border-solid border-black w-80" type="text" placeholder="Message"></textarea>
                                    </div>
                                    <button className="border-2 border-solid border-sky-950 py-3 px-10 font-bold rounded-lg mt-5 hover:bg-teal-900 hover:text-white">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
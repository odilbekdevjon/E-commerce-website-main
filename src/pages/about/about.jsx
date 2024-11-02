import "./about.scss";
import { useState } from "react";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";

export default function About() {
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const { t } = useTranslation()
    
    return(
        <>
            <Header order={order} />
                <section className="mt-20 min-h-[100vh]">-
                    <div className="container">
                        <div className="about mt-52 ">
                            <div className="about__wrapp mx-36 flex justify-between items-center">
                                <h1 className="about__heading font-bold text-[45px]">{t("pageAbout")}</h1>
                                <p className="about__text w-[500px]">{t("aboutTitle2")}</p>
                            </div>
                            <div>
                            <iframe className="mt-40 mb-20 w-[100%] rounded-lg" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d48831.792381602994!2d65.33041376552042!3d40.09800225176038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNavoiy%20JIED%205-MX%20MMM%205-son%20Jazoni%20ijro%20etish%20koloniyasi!5e0!3m2!1sru!2s!4v1730542617234!5m2!1sru!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
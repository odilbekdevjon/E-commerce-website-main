import "./about.scss";

// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useTranslation } from "react-i18next";


export default function About() {

    const { t } = useTranslation()
    
    return(
        <>
            <Header />
                <section className="mt-20 mb-10">
                    <div className="container">
                        <div className="about mt-52 ">
                            <div className="about__wrapp mx-36 flex justify-between items-center">
                                <h1 className="about__heading font-bold text-[45px]">{t("pageAbout")}</h1>
                                <p className="about__text w-[500px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. In veritatis, nihil qui voluptatem dolore perferendis ad sint a, dignissimos ullam temporibus eligendi. Quibusdam, distinctio doloremque.</p>
                            </div>
                            <div>
                            <iframe className="about__map mt-40 w-[100%] rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48831.802856482995!2d65.33041369875254!3d40.09798765530493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c7cc1b6de84f%3A0x68a422cd2e3e5699!2sNavoiy%20shaxar%204son%20jazoni%20otash%20kaloniyasi!5e0!3m2!1sru!2s!4v1725726820339!5m2!1sru!2s" width="600" height="450" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
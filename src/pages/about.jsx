// components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { useTranslation } from "react-i18next";


export default function About() {

    const { t } = useTranslation()
    
    return(
        <>
            <Header />
                <section className="mt-20 mb-96">
                    <div className="container">
                        <div className="about mt-52 ">
                            <div className="about__wrapp mx-36 flex justify-between items-center">
                                <h1 className="about__heading font-bold text-[45px]">{t("pageAbout")}</h1>
                                <p className="about__text w-[500px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. In veritatis, nihil qui voluptatem dolore perferendis ad sint a, dignissimos ullam temporibus eligendi. Quibusdam, distinctio doloremque.</p>
                            </div>
                        </div>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
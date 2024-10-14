import "./Hero.scss";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation()

    return(
        <section className="hero__section bg-img2 bg-cover bg-no-repeat bg-center w-[100%] h-[640px] pt-1">
            <div className="container">
                <div className="hero">
                        <div className="hero__wrapper">
                            <h1 className="hero__heading w-[500px] text-[50px] font-bold text- mt-40 text-white">{t("heroTitle1")}</h1>
                            <p className="hero__text w-96 text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut doloremque ipsam inventore ratione. Eligendi eum quia fugit, delectus quaerat expedita harum deleniti ad repellendus tempora magni libero quae esse. Eaque.</p>
                            <button className="hero__button border-2 border-solid border-white p-3 rounded-lg mt-5 text-white">Buyurtma berish</button>
                        </div>
                    </div>
                </div>
        </section>
    )
}
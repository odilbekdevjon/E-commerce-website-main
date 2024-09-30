import "./profileOrders.scss";
import { useState } from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";

export default function ProfileOrders() {
    const [order,setOrder] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

    const { t } = useTranslation()

    return(
        <>
            <Header order={order}/>
            <section className="mt-24 mb-96">
                <div className="container">
                    <div className="flex pt-3">
                        <Link className="opacity-[0.5]" to={'/'}>{t("headerTitle1")}</Link>
                        <span className="font-bold mr-2 ml-2"> > </span>
                        <Link className="" to={'/profile'}>{t("profileTitle1")}</Link>
                    </div>
                    <div className="flex mt-10">
                        <div className="user_right">
                            <div className="flex">
                                <img className="" src={profileAvatar} width={60} height={60}  alt="" />
                                <span className="mt-3 ml-5 font-bold text-[20px]">Odilbek Safarov</span>
                            </div>
                            <hr className="w-[300px] mt-2" />
                            <div className="mt-5">
                                <Link to={'/profile'} className="w-[300px] block font-bold text-[15px] mb-4 p-4">{t("profileTitle2")}</Link>
                                <NavLink to={'/profile/orders'} className="w-[300px] block font-bold text-[15px] p-4">{t("profileTitle3")}</NavLink>
                            </div>
                        </div>
                        <div className="user_left">
                            <div className="ml-5">
                                <h1 className="font-bold text-[35px]">{t("profileTitle4")}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
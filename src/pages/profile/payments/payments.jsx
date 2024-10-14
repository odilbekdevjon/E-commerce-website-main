import "./payments.scss";
// import axios from "axios";
import { useState , useEffect} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";

export default function Payments() {
    const { t } = useTranslation()
    const [ user  ] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

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
                    <div className="profile flex mt-10">
                        <div className="profile__right">
                            <div className="profile__right__user flex">
                                <img className="" src={profileAvatar} width={60} height={60}  alt="" />
                                <span className="mt-3 ml-5 font-bold text-[20px]">{`${user?.sur_name} ${user.first_name }` ? `${user?.sur_name} ${user.first_name }`  : "Odilbek Safarov"}</span>
                            </div>
                            <hr className="w-[300px] mt-2" />
                            <div className="mt-5">
                                <Link to={'/profile'} className="w-[300px] block font-bold text-[15px] mb-2 p-4">{t("profileTitle2")}</Link>
                                <Link to={'/profile/orders'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileTitle3")}</Link>
                                <NavLink to={'/profile/messages'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">Messages</NavLink>
                                <NavLink to={'/profile/payments'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4">Payments</NavLink>
                            </div>
                        </div>
                        <div className="user_left">
                            <div className="ml-10">
                                <h1 className="font-bold text-[35px]">Payments page</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
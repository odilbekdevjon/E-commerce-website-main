import "./profile.scss";
import { useState } from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// images
import profileAvatar from "../../assets/profileavatar.png";

export default function Profile() {
    const { t } = useTranslation();
    const [ user ] = useAuth();
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
                                <span className="mt-3 ml-5 font-bold text-[20px]">{user?.full_name ? user?.full_name : "Odilbek Safarov"}</span>
                            </div>
                            <hr className="profile__right--hr w-[300px] mt-2" />
                            <div className="profile__right__links mt-5">
                                <NavLink to={'/profile'} className="profile__right__link w-[300px] block font-bold text-[15px] mb-4 p-4">{t("profileTitle2")}</NavLink>
                                <NavLink to={'/profile/orders'} className="w-[300px] block font-bold text-[15px] p-4">{t("profileTitle3")}</NavLink>
                            </div>
                        </div>
                        <div className="profile__left">
                            <div className="ml-5">
                                <h1 className="text-[35px] font-bold">{t("profileTitle2")}</h1>
                                <img className="mt-10" src={profileAvatar} width={70} height={70}  alt="" />

                                <div className="profile__left__data w-[700px] mt-5 flex justify-between ">

                                    <div className="profile__left--right">
                                        <span className="opacity-[0.6]">{t("profileTitle5")}</span>
                                        <h2 className="font-bold mt-2 mb-10">{user?.full_name}</h2>

                                        <span className=" opacity-[0.6]">{t("profileTitle7")}</span>
                                        <h2 className="font-bold mt-2">{user?.birth_date}</h2>
                                    </div>
                                    
                                    <div className="">
                                        <span className=" opacity-[0.6]">{t("profileTitle6")}</span>
                                        <h2 className="font-bold mt-2 mb-10">{user?.address} </h2>

                                        <span className=" opacity-[0.6]">{t("profileTitle8")}</span>
                                        <h2 className="font-bold mt-2">{user?.phone_number}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
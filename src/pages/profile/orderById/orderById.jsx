import "./orderById.scss";
import { useState , useEffect} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../../utility/api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";

export default function OrderById() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [ user  ] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const [ orderById, setOrderById ] = useState();
    const { id } = useParams();    

    // get products
    useEffect(() => {
        API.get(`/contract/get-contract-by-user/${id}`)
        .then(response => {
            setOrderById(response.data.contract);
            })
        .catch(error => {
            console.log(error);
        });
    },[""]);  
    
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
                            <hr className="max-w-[300px] mt-2" />
                            <div className="mt-5">
                                <Link to={'/profile'} className="w-[300px] block font-bold text-[15px] mb-2 p-4">{t("profileTitle2")}</Link>
                                <NavLink to={'/profile/orders'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileTitle3")}</NavLink>
                                <NavLink to={'/profile/messages'} className="w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileMessages")}</NavLink>
                                <NavLink to={'/profile/payments'} className="w-[300px] block font-bold text-[15px] p-4">{t("profilePayments")}</NavLink>
                                <NavLink to={'/profile/notification'} className="w-[300px] block font-bold text-[15px] p-4">{t("profileNotification")}</NavLink>
                            </div>
                        </div>
                        <div className="order">
                            <div className="ml-10">
                                <h1 className="order__heading font-bold text-[35px] mb-5">Batafsil ma'lumot</h1>
                               <div className="order__wrapp flex">
                                    <div className="order__left mr-60">
                                        <h2 className="text-[25px] font-bold">Buyurtma №: {orderById?.contract_id} </h2>
                                        <h3 className="text-[18px] mt-5">Buyurtma berilgan vaqt: {orderById?.contractEndDate}</h3>
                                        <h3 className="text-[18px] mt-3">To'lov muddati: {dayjs(orderById?.paymentEndDate).format("DD.MM.YYYY")}</h3>
                                        <h3 className="text-[18px] mt-3">Kontrakt muddati: {dayjs(orderById?.createdAt).format("DD.MM.YYYY")}</h3>
                                        <h3 className="text-[18px] mt-3">Yetkazib berish muddati: {orderById?.deliveryDate}</h3>
                                        <h3 className="text-[18px] mt-3">Buyurtma holati: {orderById?.status === "rejected" ? "Tasdiqlanmagan" : "Tasdiqlangan"}</h3>
                                        <h3 className="text-[18px] mt-3">Yetkazib berish: {orderById?.isDelivery === true ? "Mavjud" : "Mavjud emas"}</h3>
                                    </div>
                                    <div className="order__right">
                                        <h2 className="text-[25px] font-bold">Buyurtma beruvchi ma'lumotlari:</h2>
                                        <h3 className="text-[18px] mt-5">Buyurtmachining ID raqami: {orderById?.User?.user_id}</h3>
                                        <h3 className="text-[18px] mt-5">Buyurtmachining ism familyasi: {`${orderById?.User?.sur_name}  ${orderById?.User?.first_name}`}</h3>
                                        <h3 className="text-[18px] mt-5">Buyurtmachining tug'ulgan sanasi: {orderById?.User?.birth_date}</h3>
                                        <h3 className="text-[18px] mt-5">Buyurtmachining telfon raqami: {orderById?.User?.phone_number}</h3>
                                        <h3 className="text-[18px] mt-5">Buyurtmachining manzili: <p className="order__left__text w-[350px]">{orderById?.User?.address}</p></h3>
                                    </div>
                               </div>
                               <div className="order__box mt-10">
                                    <h4 className="order__heading font-bold text-[25px]">Buyurtmachining maxsulotlari</h4>
                                   {
                                        orderById?.products?.map((item , index) => {
                                            return(
                                            <div key={index} className="order__items flex mt-5">
                                                <img className="order__items__image" src={item.image[0]} width={250} height={200} alt="" />
                                                <div className="order__items__products ml-10">
                                                    <span className="block"><b>Maxsulotning nomi:</b> {item?.[`name_${i18n.language}`]}</span>
                                                    <span className="block"><b>Maxsulotning tavsifi:</b> {item?.[`description_${i18n.language}`]}</span>
                                                    <span className="block"><b>Maxsulot narxi:</b> {item?.discount}</span>
                                                    <span className="block"><b>Maxsulotni eski narxi:</b> <span className="line-through opacity-[0.5]">{item?.price}</span></span>
                                                    <span className="block"><b>Omborxonada:</b> {`${item?.stock} ${item?.unit_uz} mavjud`}</span>
                                                    <span className="block"><b>Yetkazib berish summasi:</b> {item?.delivery_price}</span>
                                                </div>
                                            </div>
                                            )
                                        })
                                   }
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
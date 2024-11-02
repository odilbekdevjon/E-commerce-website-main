import "./profileOrders.scss";
import { useState , useEffect} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../../utility/api";
import useAuth from "../../../hooks/useAuth";
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";

export default function ProfileOrders() {
    const { t } = useTranslation()
    const [ user  ] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const [ contracts, setContracts ] = useState([]);    

    //  get CONTRACTS
    useEffect(() => {
        API.get('/contract/get-contracts-list-by-user')
            .then(response => {
                setContracts(response.data.contract);
            })
            .catch(error => {
                console.log(error);
            }); 
    }, []);

    console.log(contracts);
    
    return(
        <>
            <Header order={order}/>
            <section className="mt-24 mb-20 min-h-[100vh]">
                <div className="container">
                    <div className="flex pt-3">
                        <Link className="opacity-[0.5]" to={'/'}>{t("headerTitle1")}</Link>
                        <span className="font-bold mr-2 ml-2"> > </span>
                        <Link className="" to={'/profile'}>{t("profileTitle1")}</Link>
                    </div>
                    <div className="profileOrders flex mt-10">
                        <div className="profileOrders__right">
                            <div className="profileOrders__right__user flex">
                                <img className="" src={profileAvatar} width={60} height={60}  alt="" />
                                <span className="mt-3 ml-5 font-bold text-[20px]">{`${user?.sur_name} ${user.first_name }` ? `${user?.sur_name} ${user.first_name }`  : "Odilbek Safarov"}</span>
                            </div>
                            <hr className="w-[300px] mt-2" />
                            <div className="mt-5">
                                <Link to={'/profile'} className="w-[300px] block font-bold text-[15px] mb-2 p-4">{t("profileTitle2")}</Link>
                                <NavLink to={'/profile/orders'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileTitle3")}</NavLink>
                                <NavLink to={'/profile/messages'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileMessages")}</NavLink>
                                <NavLink to={'/profile/payments'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4">{t("profilePayments")}</NavLink>
                                <NavLink to={'/profile/notification'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4">{t("profileNotification")}</NavLink>
                            </div>
                        </div>
                        <div className="profileOrders__left">
                            <div className="ml-10">
                                <h1 className="table__heading font-bold text-[35px] mb-5">{t("profileTitle4")}</h1>
                                <section className="table-container">
                                    <table className="table w-full p-5 border-2 border-solid border-black">
                                        <thead className="table__head border-2 border-solid border-black">
                                            <tr className="table__headings">
                                                <td className="mr-5 border-2 border-solid border-black p-2 font-bold">{t("profileOrder1")}</td>
                                                <td className="mr-5 border-2 border-solid border-black p-2 font-bold">{t("profileOrder2")}</td>
                                                <td className="mr-5 border-2 border-solid border-black p-2 font-bold">{t("profileOrder3")}</td>
                                                <td className="mr-5 border-2 border-solid border-black p-2 font-bold">{t("profileOrder4")}</td>
                                                <td className="mr-5 border-2 border-solid border-black p-2 font-bold">{t("profileOrder5")}</td>
                                                <td className="mr-5 border-2 border-solid border-black p-2 font-bold">{t("mainTitle8")}</td>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {
                                                contracts?.map(item => (
                                                    <tr className="" key={item?.id}>
                                                        <td data-label="Shartnomaning tugash sanasi" className="border-2 border-solid border-black p-2">{item?.contractEndDate}</td>
                                                        <td data-label="Shartnoma fayli" className="border-2 border-solid border-black p-2">
                                                            <a className="block text-blue-500" href={item?.contractFile.contractFileRu} target="_blank">rus tilida</a>
                                                            <a className="block text-blue-500" href={item?.contractFile.contractFileUz} target="_blank">uzbek tilida</a>
                                                        </td>
                                                        <td data-label="Yetkazib berish manzili" className="border-2 border-solid border-black p-2"><p className="table__text max-w-44">{item?.shippingAddress}</p></td>
                                                        <td data-label="Yetkazib berish xizmati" className="border-2 border-solid border-black p-2">
                                                            <button>{item?.isDelivery ? "Mavjud" : "Mavjud emas"}</button>
                                                        </td>
                                                        <td data-label="Umumiy narx" className="border-2 border-solid border-black p-2">{item?.totalPrice}</td>
                                                        <td data-label="Batafsil ma'lumot" className="p-2 text-blue-500 border-2 border-solid border-black">
                                                            <Link to={`/profile/order/${item?.id}`}>Batafsil</Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
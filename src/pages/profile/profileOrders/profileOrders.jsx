import "./profileOrders.scss";
import { useState , useEffect} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../../utility/api";
import useAuth from "../../../hooks/useAuth";
import dayjs from 'dayjs';
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
    const now = dayjs()
    

    //  get CONTRACTS
    useEffect(() => {
        API.get('/contract/get-contracts-list-by-user')
            .then(response => {
                console.log(response.data.contract);
                setContracts(response.data.contract);
            })
            .catch(error => {
                console.log(error);
            }); 
    }, []);

    const getById = async (id) => {
        console.log(id);
        try {
            const response = await API.get(`/contract/get-contract-by-user/${id}`)
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
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
                                <NavLink to={'/profile/orders'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileTitle3")}</NavLink>
                                <NavLink to={'/profile/messages'} className="w-[300px] block font-bold text-[15px] p-4 mb-2">Messages</NavLink>
                                <NavLink to={'/profile/payments'} className="w-[300px] block font-bold text-[15px] p-4">Payments</NavLink>
                            </div>
                        </div>
                        <div className="user_left">
                            <div className="ml-10">
                                <h1 className="font-bold text-[35px] mb-5">{t("profileTitle4")}</h1>
                                <table className="w-[1100px] p-5 border-2 border-solid border-black">
                                    <thead className="border-2 border-solid border-black">
                                        <tr className="">
                                            <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Shartnomaning tugash sanasi</td>
                                            <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Shartnoma fayli</td>
                                            <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Yetkazib berish manzili</td>
                                            {/* <td className="mr-5">Yetkazib berish sanasi</td> */}
                                            <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Yetkazib berish xizmati</td>
                                            <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Umumiy narx</td>
                                            {/* <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Tulov muddati</td> */}
                                            <td className="mr-5 border-2 border-solid border-black p-2 font-bold">Batafsil ma'lumot</td>
                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            contracts?.map(item => {
                                                return(
                                                    <tr key={item?.id} className="">
                                                        <td className="border-2 border-solid border-black p-2">{item?.contractEndDate}</td>
                                                        <td className="border-2 border-solid border-black p-2">
                                                            <a className="block text-blue-500" href={item?.contractFile.contractFileRu} target="_blank">name uz</a>
                                                            <a className="block text-blue-500" href={item?.contractFile.contractFileUz} target="_blank">name ru</a>
                                                        </td>
                                                        <td className="border-2 border-solid border-black p-2"><p className="w-48">{item?.shippingAddress}</p></td>
                                                        <td className="border-2 border-solid border-black p-2"><button className="">{item?.isDelivery === true ? "Mavjud" : "Mavjud emas"}</button></td>
                                                        <td className="border-2 border-solid border-black p-2">{item?.totalPrice}</td>
                                                        {/* <td className="">{now.format(item?.paymentEndDate)}</td> */}
                                                        <td className="p-2 text-blue-500"><Link to={`/profile/order/${item?.id}`}>Batafsil</Link></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
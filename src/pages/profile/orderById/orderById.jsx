import "./orderById.scss";
import { useState , useEffect} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../../utility/api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";


export default function OrderById() {

    function cleanHTML(input) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = input;
        return tempDiv.textContent;
    }

    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [ user  ] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const [ orderById, setOrderById ] = useState();
    const { id } = useParams();    
    // payments
    const [payAmount, setPayAmount] = useState("");
    const [payDate, setPayDate] = useState("");     
    const formattedDate = dayjs(payDate).format("YYYY-MM-DD"); 
    const [ contractId , setContractId ] = useState();    

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
    
    //  get CONTRACTS ID
    useEffect(() => {
        API.get('/contract/get-contracts-list-by-user')
        .then(response => {
            setContractId(response.data.contract);
        })
        .catch(error => {
            console.log(error);
        }); 
    }, []);  
    
    const [ file , setFile ] = useState();   
    const handleFileChange = (e) => {
       const newFile = e.target.files[0]
       if(!newFile) return 
       setFile(newFile);
    }        

    const postPayments = async () => {
        const filteredContractId = contractId?.map(item => item.id);
        const findFilterId = filteredContractId.find(item => item);

        const data = new FormData();
        data.append('amount', Number(payAmount));
        data.append('paidDate', formattedDate);
        data.append('receiptImage', file)
        
        try {
            await  axios.post(`https://5jiek.uz/api/v1/payments/create-payment/${findFilterId}`, data, {
                withCredentials: true 
            })
            window.location.reload();
        } catch (error) {
         console.log(error);
        }

        payAmount = "";
        payDate = "";
        file = "";
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
                                <h1 className="order__heading font-bold text-[35px] mb-5">{t("profileOrder6")}</h1>
                               <div className="order__wrapp flex">
                                    <div className="order__left  mr-52">
                                        <h2 className="text-[25px] font-bold">{t("cartTitle2")} №: {orderById?.contract_id} </h2>
                                        <h3 className="text-[18px] mt-5">{t("orderId8")} {orderById?.contractEndDate}</h3>
                                        <h3 className="text-[18px] mt-3">{t("orderId9")} {dayjs(orderById?.paymentEndDate).format("DD.MM.YYYY")}</h3>
                                        <h3 className="text-[18px] mt-3">{t("orderId10")} {dayjs(orderById?.createdAt).format("DD.MM.YYYY")}</h3>
                                        <h3 className="text-[18px] mt-3">{t("orderId11")} {orderById?.deliveryDate}</h3>
                                        <h3 className="text-[18px] mt-3">{t("orderId12")}  {orderById?.status === "rejected" ? "Tasdiqlanmagan" : "Tasdiqlangan"}</h3>
                                        <h3 className="text-[18px] mt-3">{t("orderId13")}  {orderById?.isDelivery === true ? "Mavjud" : "Mavjud emas"}</h3>
                                        <p className="text-[18px] mt-3 w-[350px] order__left__text">{t("orderId14")}  {orderById?.shippingAddress}</p>
                                    </div>
                                    <div className="order__right">
                                        <h2 className="text-[25px] font-bold">{t("orderId4")}</h2>
                                        <h3 className="text-[18px] mt-5">{t("orderId15")} {orderById?.User?.user_id}</h3>
                                        <h3 className="text-[18px] mt-5">{t("orderId16")} {`${orderById?.User?.sur_name}  ${orderById?.User?.first_name}`}</h3>
                                        <h3 className="text-[18px] mt-5">{t("orderId17")} {orderById?.User?.birth_date}</h3>
                                        <h3 className="text-[18px] mt-5">{t("orderId18")}{orderById?.User?.phone_number}</h3>
                                        <h3 className="text-[18px] mt-5">{t("orderId19")} <p className="order__left__text w-[350px]">{orderById?.User?.address}</p></h3>
                                    </div>
                               </div>
                               <div className="order__payments flex mt-5 mb-5">

                               <div className="payments_left flex mr-52">
                                            <div className="">
                                                <h2 className="font-bold text-[25px] tracking-[1px]">{t("orderId1")}</h2>
                                                <div className="mt-5">
                                                    <label htmlFor="">{t("orderId5")}</label>
                                                    <input className="paymentts__left__input w-60 border-2 border-solid border-black p-3 rounded-lg block" required value={payAmount} onChange={(e) => setPayAmount(e.target.value)} type="number" placeholder="payment amount" />
                                                </div>
                                                <div className="mt-5">
                                                    <label htmlFor="">{t("orderId6")}</label>
                                                    <input className="paymentts__left__input w-60 border-2 border-solid border-black p-3 rounded-lg block" required value={payDate} onChange={(e) => setPayDate(e.target.value)} type="date" placeholder="payment date"  />
                                                </div>
                                                <div className="mt-5">
                                                    <label htmlFor="">{t("orderId7")}</label>
                                                    <input className="paymentts__left__input w-60 border-2 border-solid border-black p-3 rounded-lg block" required onChange={handleFileChange} type="file" placeholder="payment image" />
                                                </div>
                                                <button className="payments__left__button p-3 bg-sky-800 text-white rounded-lg mt-3" onClick={postPayments}>Send payment</button>
                                            </div>
                                </div>

                                    {
                                        <div className="mt-5">
                                            <div className="order__user__heading font-bold text-[25px]">{t("orderId2")}</div> 
                                            <p className="mt-3">{t("orderId20")} {orderById?.totalPrice}</p>
                                            <p className="mt-3">{t("orderId21")} {orderById?.paidAmount}</p>
                                            <p className="mt-3">{t("orderId22")} {orderById?.paidPercent}%</p>
                                            {/* <p className="mt-3">Yetkazib berish fayili: <a className={orderById?.deliveryFile === "" ? "text-red-500" : "text-blue-500"} href={""}>Fayilga o'tish</a></p> */}

                                            <p className="mt-3"> {t("orderId23")} 
                                                {orderById ? (
                                                    <a className={orderById.deliveryFile === "" ? "text-red-500" : "text-blue-500"} href={orderById.deliveryFile}>
                                                        {t("orderId24")}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500">{t("orderId25")}</span>
                                                )}
                                            </p>
                                            <hr className="order__user__hr w-60 mt-5 mb-5 h-[2px] bg-black"/>
                                        </div>
                                    }
                               </div>
                               <div className="order__box mt-10">
                                    <h4 className="order__heading font-bold text-[25px]">{t("orderId3")}</h4>
                                   {
                                        orderById?.products?.map((item , index) => {
                                            return(
                                            <div key={index} className="order__items flex mt-5">
                                                <img className="order__items__image" src={item.image[0]} width={250} height={200} alt="" />
                                                <div className="order__items__products ml-10">
                                                    <span className="block"><b>{t("orderId26")}</b> {item?.[`name_${i18n.language}`]}</span>
                                                    <p className="block w-[700px]"><b>{t("orderId27")}</b> {cleanHTML(item?.[`description_${i18n.language}`])}</p>
                                                    <span className="block"><b>{t("orderId28")}</b> {item?.discount}</span>
                                                    <span className="block"><b>{t("orderId29")}</b> <span className="line-through opacity-[0.5]">{item?.price}</span></span>
                                                    <span className="block"><b>{t("orderId30")}</b> {`${item?.stock} ${item?.[`unit_${i18n.language}`]}`}</span>
                                                    <span className="block"><b>{t("orderId31")}</b> {item?.delivery_price}</span>
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
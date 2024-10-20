import "./messages.scss";
import { useState , useEffect, useRef} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import { API } from "../../../utility/api";
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";

export default function Messages() {
    const { t } = useTranslation();
    const [ user  ] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const [ contractId ,setContractId ] = useState();
    const [messages, setMessages] = useState();
    const [messageByAdmin, setMessageByAdmin] = useState([]);
    const inputName = useRef();
    

   //  get CONTRACTS
   useEffect(() => {
        API.get('/contract/get-contracts-list-by-user')
            .then(response => {
                setContractId(response.data.contract);
                // setContracts(response.data.contract);
            })
            .catch(error => {
                console.log(error);
            }); 
    }, []);         


    //  get messeges come from admin 
   useEffect(() => {
        API.get('/messages/get-messages-user')
            .then(response => {
                setMessageByAdmin(response.data.data);
            })
            .catch(error => {
                console.log(error);
            }); 
    }, []);     
    
    
    const sendMessages = async () => {
        
        const filteredContractId = contractId?.map(item => item.id)        
        const findFilterId = filteredContractId.find(item => item)
        // const contractIdString = findFilterId?.join(',');
        // console.log(contractIdString);

            try {
                const response = await API.post(`/messages/send-message-user`, {
                    contractId:findFilterId,
                    message: inputName.current.value
                })
                // console.log(response.data.data);
                setMessages(response.data.data);
            } catch (error) {
                console.error(error);
            }
            inputName.current.value = null
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
                    <div className="messages flex mt-10">
                        <div className="messages__right">
                            <div className="messages__right__user flex">
                                <img className="" src={profileAvatar} width={60} height={60}  alt="" />
                                <span className="mt-3 ml-5 font-bold text-[20px]">{`${user?.sur_name} ${user.first_name }` ? `${user?.sur_name} ${user.first_name }`  : "Odilbek Safarov"}</span>
                            </div>
                            <hr className="w-[300px] mt-2"/>
                            <div className="mt-5">
                                <Link to={'/profile'} className="w-[300px] block font-bold text-[15px] mb-2 p-4">{t("profileTitle2")}</Link>
                                <Link to={'/profile/orders'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileTitle3")}</Link>
                                <NavLink to={'/profile/messages'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileMessages")}</NavLink>
                                <NavLink to={'/profile/payments'} className="w-[300px] block font-bold text-[15px] p-4">{t("profilePayments")}</NavLink>
                                <NavLink to={'/profile/notification'} className="w-[300px] block font-bold text-[15px] p-4">{t("profileNotification")}</NavLink>
                            </div>
                        </div>
                        <div className="messages_left ml-10">
                            <div className="">
                                <h1 className="font-bold text-[35px]">{t("profileMessages")}</h1>
                                <div className="">

                                    {
                                        messageByAdmin?.map((item ,index) => {
                                            return(
                                                <div key={index} className=" w-60 p-3 rounded-lg bg-blue-950 text-[25px] mt-3 text-white">
                                                    {item.message}
                                                </div>
                                            )
                                        })
                                    }

                                    <span className="messages__message block w-60 p-3 rounded-lg bg-blue-950 text-[25px] mt-3 text-white relative left-[850px]">{messages?.message}</span>
                                </div>
                               <div className="messages__form relative top-[250px] flex z-10">
                                    <input ref={inputName} className="messages__input w-[1000px] border-2 border-solid border-black p-2 rounded-lg " type="text" placeholder="send message" />
                                    <button className="messages__buttton p-2 bg-blue-900 rounded-lg text-white" onClick={sendMessages}>Send</button>
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
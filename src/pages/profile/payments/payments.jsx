import "./payments.scss";
import axios from "axios";
import { useState , useEffect, useRef} from "react";
import { Link , NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import { API } from "../../../utility/api";
import dayjs from "dayjs";
import Modal from 'react-modal';
// components
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// images
import profileAvatar from "../../../assets/profileavatar.png";
import deleteImage from "../../../assets/bin.png";
import editImage from "../../../assets/edit.png";

export default function Payments() {
    const { t } = useTranslation()
    const [ user  ] = useAuth();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [ contractId , setContractId ] = useState();
    const [ payments, setPayments ] = useState([]);
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ updateId, setUpdateId  ] = useState();
    // value
    const [payAmount, setPayAmount] = useState("");
    const [payDate, setPayDate] = useState("");     
    const formattedDate = dayjs(payDate).format("YYYY-MM-DD");   

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
    }

     //  get PAYMENTS
    useEffect(() => {
        API.get('/payments/get-payments-by-user')
        .then(response => {
            setPayments(response.data.payments);
        })
        .catch(error => {
            console.log(error);
        }); 
    }, []);  
    

    // modal
    useEffect(() => {
        Modal.setAppElement('#root'); // 'root' sizning asosiy elementingiz bo'lishi kerak
    }, []);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    // update payments
    const updatePayments = async () => {
        console.log(updateId);

        const data = new FormData();
        data.append('amount', Number(payAmount));
        data.append('paidDate', payDate );
        data.append('receiptImage', file);
        
        try {
            await  axios.put(`https://5jiek.uz/api/v1/payments/update-payment-by-user/${updateId}`, data, {
                withCredentials: true 
            })
            window.location.reload();
        } catch (error) {
         console.log(error);
        }
        closeModal();
    }

    const deletePayment = async (id) => {

        try {
            await  axios.delete(`https://5jiek.uz/api/v1/payments/delete-payment-by-user/${id}`, {
                withCredentials: true 
            })
            window.location.reload();
        } catch (error) {
         console.log(error);
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
                                <Link to={'/profile/orders'} className="profile__right__link w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileTitle3")}</Link>
                                <NavLink to={'/profile/messages'} className="w-[300px] block font-bold text-[15px] p-4 mb-2">{t("profileMessages")}</NavLink>
                                <NavLink to={'/profile/payments'} className="w-[300px] block font-bold text-[15px] p-4">{t("profilePayments")}</NavLink>
                                <NavLink to={'/profile/notification'} className="w-[300px] block font-bold text-[15px] p-4">{t("profileNotification")}</NavLink>
                            </div>
                        </div>
                        <div className="payments_left flex ml-10">

                            <div className="">
                                <h1 className="font-bold text-[35px]">{t("profilePayments")}</h1>
                                <div className="mt-5">
                                    <h2 className="font-bold text-[25px] tracking-[1px]">To'lov qilish</h2>
                                    <div className="mt-5">
                                        <label htmlFor="">To'lov miqdori</label>
                                        <input className=" w-60 border-2 border-solid border-black p-3 rounded-lg block" required value={payAmount} onChange={(e) => setPayAmount(e.target.value)} type="number" placeholder="payment amount" />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="">To'lov sanasi</label>
                                        <input className=" w-60 border-2 border-solid border-black p-3 rounded-lg block" required value={payDate} onChange={(e) => setPayDate(e.target.value)} type="date" placeholder="payment date"  />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="">To'lov cheki</label>
                                        <input className=" w-60 border-2 border-solid border-black p-3 rounded-lg block" required onChange={handleFileChange} type="file" placeholder="payment image" />
                                    </div>
                                    <button className="p-3 bg-sky-800 text-white rounded-lg mt-3" onClick={postPayments}>Send payment</button>
                                </div>
                            </div>
                            <div className="payments__data ml-48 mt-16">
                                <h2 className="font-bold text-[25px] tracking-[1px]">{t("profilePayments")}</h2>

                                <div className="payments__data--item flex flex-wrap">
                                    {
                                        payments?.map(item => {
                                            return(
                                                <div key={item.id} className="w-[230px] border-2 border-solid border-black p-3 rounded-lg mb-4 mr-10">
                                                    <img className="payments__image" src={item?.receiptImage} width={200} height={100} alt="" />
                                                    <p className=""><b>To'lov summasi:</b> {item?.amount}</p>
                                                    <p className=""><b>To'lov sanasi:</b> {dayjs(item?.createdAt).format("MM.DD.YYYY")}</p>
                                                    <div className="flex justify-end mt-2">
                                                        <button onClick={() => {
                                                            openModal()
                                                            setUpdateId(item.id)
                                                        }}><img className="mr-5" src={editImage} width={20} height={20} alt="edit" /></button>
                                                        <button onClick={() => deletePayment(item.id)}><img className="" src={deleteImage} width={20} height={20} alt="delete" /></button>
                                                    </div>
                                                 </div>
                                            )
                                        })
                                    }
                                </div>
                                <Modal
                                isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} contentLabel="Example Modal"
                                style={{
                                    content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', },
                                }}>
                                <div className="w-64">
                                    <div className="flex">
                                    <h2 className="font-bold text-center mb-2 text-lg">Payments update</h2> 
                                    <button className="border-solid border-black border-2 px-1 rounded-lg ml-6 mb-4 " onClick={() => closeModal()} >X</button>
                                    </div>
                                    <hr />
                                    <div className="mt-5">
                                        <label htmlFor="">To'lov miqdori</label>
                                        <input className=" w-60 border-2 border-solid border-black p-3 rounded-lg block" required  type="number" placeholder="payment amount" />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="">To'lov sanasi</label>
                                        <input className=" w-60 border-2 border-solid border-black p-3 rounded-lg block" required  type="date" placeholder="payment date" />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="">To'lov cheki</label>
                                        <input className=" w-60 border-2 border-solid border-black p-3 rounded-lg block" required onChange={handleFileChange} type="file" placeholder="payment image" />
                                    </div>
                                    <button className="p-3 bg-sky-800 text-white rounded-lg mt-3" onClick={updatePayments}>Update payment</button>
                                </div>
                            </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
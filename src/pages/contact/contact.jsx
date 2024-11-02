import "./contact.scss";
import { useState , useRef} from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
// components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// images
import product from "../../assets/product.svg";
import deleveriy from "../../assets/delivery.png";
import contract from "../../assets/contract.svg";


export default function Contact() {
    const { t } = useTranslation();
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    const [notification, setNotification] = useState(null);
    
    // values by ref
    const name = useRef();
    const email = useRef();
    const phone = useRef();
    const message = useRef();    
    // send message
    const sendMessage = async () => {
        const data = new FormData();
        data.append('name',  name.current.value);
        data.append('email', email.current.value);
        data.append('message', message.current.value);
        data.append('phone', phone.current.value);

        try {
            await axios.post(`https://5jiek.uz/api/v1/contacts/create-contact-us`, data, {
                headers : {
                    "Content-Type": "application/json",
                },
                withCredentials: true 
            });
            setNotification({ message: "Send message successfully!", type: "success" });
        } catch (error) {
         console.log(error)
         setNotification({ message: "Failed to send message. Please try again.", type: "error" });

        }
        setTimeout(() => setNotification(null), 3000);

        name.current.value = null;
        email.current.value = null;
        phone.current.value = null;
        message.current.value = null;
        console.log('sen messages');
    }

    return(
        <>
            <Header order={order}/>
                <section className="mt-20 mb-52 min-h-[100vh]">
                    <div className="container">
                        <div className="contact mt-40 flex">
                            <div className="contact__left  ml-36 mr-80">
                                <h1 className="contact__title font-bold text-[45px] tracking-[1px]">{t("pageContact")}</h1>
                                <span className="contact__span block mt-5 mb-10 text-[20px] text-orange-600 font-bold">{t("contactTitle1")}</span>

                                <div className="contact__wrapp flex items-center mb-5">
                                    <img className="mr-5" src={product} width={"45"} height={"40"} alt="product" />
                                    <p className="contact__text">{t("contactTitle2")}</p>
                                </div>
                                <div className="contact__wrapp flex items-center mb-5">
                                    <img className="mr-5" src={deleveriy} width={"45"} height={"40"} alt="product" />
                                    <p className="contact__text">{t("contactTitle3")}</p>
                                </div>
                                <div className="contact__wrapp flex items-center mb-5">
                                    <img className="mr-5" src={contract} width={"45"} height={"40"} alt="product" />
                                    <p className="contact__text">{t("contactTitle4")}</p>
                                </div>
                            </div>
                            <div className="contact__right">
                                    <div className="">
                                        <input ref={name} className="contact__form-input p-5 rounded-lg border-b-2 border-solid border-black mb-5 w-80" type="text" placeholder={t("contactTitle5")} />
                                    </div>
                                    <div className="">
                                        <input ref={email} className="contact__form-input p-5 rounded-lg border-b-2 border-solid border-black mb-5 w-80" type="text" placeholder={t("contactTitle6")} />
                                    </div>
                                    <div className="">
                                        <input ref={phone} className="contact__form-input p-5 rounded-lg border-b-2 border-solid border-black mb-5 w-80" type="text" placeholder={t("contactTitle7")} />
                                    </div>
                                    <div className="">
                                        <textarea ref={message} className="contact__form-input p-5 rounded-lg border-b-2 border-solid border-black w-80" type="text" placeholder={t("contactTitle8")}></textarea>
                                    </div>
                                    <button onClick={() => sendMessage()} className="contact__form-button border-2 border-solid border-sky-950 py-3 px-10 font-bold rounded-lg mt-5 hover:bg-teal-900 hover:text-white">{t("contactTitle9")}</button>
                            </div>  
                        </div>
                        {notification && (
                        <div className={`notification ${notification.type}`}>
                            {notification.message}
                        </div>
                        )}
                    </div>
                </section>
            <Footer/>
        </>
    )
}
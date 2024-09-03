import "./Footer.scss";

// images
import Phone from "../../assets/phone.svg";
import mail from "../../assets/email.svg";
import address from "../../assets/address.svg"
import telegram from "../../assets/telegram.png";
import instagram from "../../assets/instagram.png";
import faceebook from "../../assets/facebook.png";
import { useTranslation } from "react-i18next";



export default function Footer() {

    const { t } = useTranslation()

    return(
        <>
            <footer className="footer bg-slate-500 p-10">
                <div className="container">
                    <div className="footer__wrapper">
                        <h1 className="font-bold text-[30px] text-white text-center tracking-[5px]">{t("footerTitle1")}</h1>
                        <div className="mt-10 flex flex-col items-center">
                            <div className="flex ">
                                <img className="text-white " src={Phone} width={25} height={20} alt="phone" />
                                <a className="block ml-2 text-white" href="tel:+998911117711">+998911117711</a>
                            </div>
                            <div className="flex mt-4">
                                <img src={mail} width={25} height={20} alt="mail" />
                                <a className="ml-2 text-white" href="mailto:someone@example.com">info@uzautomotors.com</a>
                            </div>
                            <address className="flex mt-4 mb-4">
                                <img src={address} width={25} height={25} alt="address" />
                                <p className="ml-2 text-white">Navoiy viloyati qiziltepa</p>
                            </address>
                            <div className="mx-auto flex">
                                    <a className="block" href="https://t.me/" target="_blank"><img className="mr-4 flex text-white" src={telegram} width={25} height={25} alt="telegram" /></a>
                                    <a className="block" href="https://www.instagram.com/" target="_blank"><img className="mr-4" src={instagram} width={25} height={25} alt="instagram" /></a>
                                    <a className="block" href="https://www.facebook.com/" target="_blank"><img className="" src={faceebook} width={25} height={25} alt="faceebook" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>   
        </>
    )
}
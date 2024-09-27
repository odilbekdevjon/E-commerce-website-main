import "./HomeHeader.scss";

import { json, Link } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";
import { useState , useRef, useEffect} from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';
import i18n from "../../i18n";

// images
import logo from "../../assets/saytLogo.svg";
import menu from "../../assets/menu-bar.png";
import mobileLogo from "../../assets/mobile-logo.png";
import cart from "../../assets/cart-shopping.svg";
import { useCartAuth } from "../../hooks/cartHook";

export default function HomeHeader({order}) {

    // const { stateCart, setStateCart, setCart  } = useCartAuth()

    // console.log(stateCart);
    
    const [modalIsOpen, setIsOpen] = useState(false);
    // const [ oneId, setOneId ] = useState([]);
    const [ cardLength, setCardLength ] = useState(0)


    const { t } = useTranslation()
    const changeLang = (evt) => {
        i18n.changeLanguage(evt)
    }

    
    
    // ref
    const menuRef = useRef();
    const code = useRef()

    const sendCode = async () => {

        fetch(`https://5jiek.uz/api/v1/user/login`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                code: code.current.value
            })
        })
        .then(res => res.json())
        .then(data => console.log(data.user))

        code.current.value = null;
        console.log('send code');
    }

    // menu
    const showMenu = () => {
        menuRef.current.classList.add("header__menu");
    }
    const closeMenu = () => {
        menuRef.current.classList.remove("header__menu");
    }

    // modal
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

   

    return (
        <>
            <header className="header py-4 w-[100%] absolute z-1 top-0">
                <div className="container">
                    <div className=" flex justify-between items-center">
                        <Link to={'/'}><img className="header__image rounded-lg bg-transparent" src={logo} width={200} alt="logo" /></Link>
                        <Link to={'/'}><img className="header__logo--heading lg:hidden md:hidden" src={mobileLogo} width={35} alt="logo" /></Link>
                        <ul  className="header__list flex">
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link to={'/'} className=" text-white font-bold  group-hover:bg-white "><a href="#products">{t("headerTitle1")}</a></Link></li>
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link className="text-white font-bold"  to={"/about"}>{t("headerTitle2")}</Link></li>
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link className="text-white font-bold" to={"/products"}>{t("headerTitle3")}</Link></li>
                            <li className="text-[18px] tracking-[1px]"><Link className="text-white font-bold" to={"/contact"}>{t("headerTitle4")}</Link></li>
                        </ul>

                        <Link to={'/carts'} className="flex">
                            <img src={cart} width={25} alt="" />
                             <span className="text-white border-2 border-solid w-5 text-center rounded-lg ml-2">{order.length}</span>
                            <span className="text-white ml-2">Korzina</span>
                        </Link>

                        {/* <a className="text-white" href="https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=savdo5jiek_uz&redirect_uri=https://savdo5jiek.uz/&scope=savdo5jiek_uz&state=wf34gk35gbo5high034g">
                            One Id                 
                        </a> */}

                        <menu ref={menuRef}  className="hidden bg-slate-700 w-[600px] h-auto z-[10]">
                            <div className="header__menu--wrapper mt-16 ml-10">
                            <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link to={'/'} className="header__menu--item font-bold mb-4"><a href="#products">{t("headerTitle1")}</a></Link></li>
                            <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link className="header__menu--item font-bold mb-4"  to={"/about"}>{t("headerTitle2")}</Link></li>
                            <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link className="header__menu--item font-bold mb-4" to={"/products"}>{t("headerTitle3")}</Link></li>
                            <li className="header__menu--list text-[18px] tracking-[1px]"><Link className="header__menu--item font-bold" to={"/contact"}>{t("headerTitle4")}</Link></li>
                            </div>
                            <button onClick={() => closeMenu()} className="p-2 border-2 border-solid border-white flex h-12 font-bold mr-2 mt-2">X</button>
                        </menu>
                        <div className=" flex items-center">
                            <button onClick={() => showMenu()}  className="header__burger mr-6">
                                <img className="bg-white rounded-lg" src={menu} width={35} height={35} alt="" />
                            </button>
                            {/* <button >
                                <img className="mr-4" src={darkmode} width={35} height={35}  alt="darkmode" />
                            </button> */}
                            <select defaultValue={i18n.language} onChange={(evt) => changeLang(evt.target.value)} className="header__select border-solid border-2 border-white-600 mr-8 rounded-lg bg-transparent font-bold text-white p-2 cursor-pointer">
                                <option className="text-black" value="uz">uz</option>
                                <option className="text-black" value="ru">ru</option>
                                <option className="text-black" value="en">en</option>
                            </select>
                            <button onClick={openModal}>
                                <div className="flex border-solid border-2 border-white-600 p-2 rounded-lg bg-transparent font-bold text-white cursor-pointer">
                                    <IoEnterOutline className="w-5 h-5 mr-2 mt-1" width={20} height={20} /><span>Kirish</span>
                                </div>
                            </button>
                            {/* <dialog open={modal}>Modal</dialog> */}
                            <Modal
                                isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal"
                                style={{
                                    content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', },
                                }}>
                                <div className="w-64">
                                    <div className="flex">
                                    <h1 className="font-bold text-center mb-2 text-lg">Tasdiqlash codini kiriting</h1> 
                                    <button className="border-solid border-black border-2 px-1 rounded-lg ml-6 mb-4 " onClick={() => closeModal()} >X</button>
                                    </div>
                                    <hr />
                                    <label className="text-black line-through" htmlFor="">{"IHHN5456WSDW"}</label>
                                    <input ref={code} className="w-64 text-black bg-white p-2 border-solid border-2 border-slate-900" type="text" placeholder="code" />
                                    <div className="text-blue-400 underline mt-3 mb-3 block" href=""><input className="mr-2" type="checkbox" />Men shaxsiy ma'lumotlarimni uzatishga roziman</div>
                                    <hr />
                                    <button onClick={sendCode} className="mt-5 ml-12 p-2 bg-blue-400 text-white">Tasdiqlash codini yuboring</button>
                                    <button className="text-black mt-4 ml-32 border-solid border-2 border-gray-500 p-1">Kodni yangilash</button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
"use client";
import "./HomeHeader.scss";
import { Link, useLocation } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";
import { useState , useRef, useEffect} from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';
import useAuth from "../../hooks/useAuth";
import useLang from "../../hooks/useLang";
// images
import logo from "../../assets/saytLogo.svg";
import menu from "../../assets/menu-bar.png";
import mobileLogo from "../../assets/mobile-logo.png";
import cart from "../../assets/cart-shopping.svg";
import profile from "../../assets/icons8.png";
import userImage from "../../assets/user.png";
import { API } from "../../utility/api";
import notificationIcon from "../../assets/notification-belL.svg";

export default function HomeHeader({order}) {
    const { t } = useTranslation();
    const [ user, setUser ] = useAuth();
    const [ lang, changeLang  ] = useLang();
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ , setCardLength ] = useState(0);
    const [ changeCheckBtn, setChangeCheckBtn ] = useState(false);
    
    // captcha
    function generateCaptcha(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < length; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }
    const captcha = generateCaptcha(7);  // Masalan: 'svdQqw45'

    // carts
    useEffect(() => {
        const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        setCardLength(cartData);
    },[])

    // ref
    const menuRef = useRef();
    const code = useRef();

    const sendCode = async () => {
        try {
            const response = await API.post(`/user/login`, {
                code: code.current.value
            })
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
        }
        closeModal()
        console.log('ok');
    }

    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const handleMouseEnter = () => {
        setLogoutVisible(true);
    };
    const handleMouseLeave = () => {
        setLogoutVisible(false);
    };

    // get logOUT
    const handleLogout = async () => {
        try {
            const response = await API.get(`/user/logout`)
            console.log(response.data);
            localStorage.removeItem("user");
            window.location.reload();
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.error(error);
        }
    }

    // menu
    const showMenu = () => {
        menuRef.current.classList.add("header__menu");
    }
    const closeMenu = () => {
        menuRef.current.classList.remove("header__menu");
    }
    Modal.setAppElement('#root'); 
    // modal
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };


    const [ notification, setNotification ] = useState();
    const location = useLocation();
    
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await API.get(`/messages/get-notification-user`);
                setNotification(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotification();
    
        if (location.pathname === "/profile/notification") {
            setNotification(0); // Sahifaga kirganda notificationni 0 ga teng qilamiz
        }
    }, [location.pathname]);

    return ( 
        <>
            <header className="header py-4 w-[100%] absolute z-1 top-0">
                <div className="container">
                    <div className=" flex justify-between items-center">
                        <Link to={'/'}><img className="header__image rounded-lg bg-transparent" src={logo} width={200} alt="logo" /></Link>
                        <Link to={'/'}><img className="header__logo--heading lg:hidden md:hidden" src={mobileLogo} width={35} alt="logo" /></Link>
                        <ul  className="header__list flex mr-20">
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link to={'/'} className=" text-white font-bold  group-hover:bg-white ">{t("headerTitle1")}</Link></li>
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link className="text-white font-bold"  to={"/about"}>{t("headerTitle2")}</Link></li>
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link className="text-white font-bold" to={"/products"}>{t("headerTitle3")}</Link></li>
                            <li className="mr-10 text-[18px] tracking-[1px]"><Link className="text-white font-bold" to={"/contact"}>{t("headerTitle4")}</Link></li>
                            <Link to={'/carts'} className="header__karzinka flex">
                                <img src={cart} width={25} alt="" />
                                <span className="text-white ml-2">{t("headerTitle6")}</span>
                                <span className="text-white border-2 border-solid w-5 text-center rounded-lg ml-2 bg-slate-900">{order.length}</span>
                            </Link>
                        </ul>
                        
                        {/* <a target="_blank" className="text-white" href="https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=savdo5jiek_uz&redirect_uri=https://savdo5jiek.uz&scope=savdo5jiek_uz&state=wf34gk35gbo5high034g">
                            <button>One id</button>
                        </a> */}

                        <menu ref={menuRef}  className="hidden bg-slate-700 w-[600px] h-auto z-[10]">
                            <div className="header__menu--wrapper mt-16 ml-10">
                                <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link to={'/'} className="header__menu--item font-bold mb-4">{t("headerTitle1")}</Link></li>
                                <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link className="header__menu--item font-bold mb-4"  to={"/about"}>{t("headerTitle2")}</Link></li>
                                <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link className="header__menu--item font-bold mb-4" to={"/products"}>{t("headerTitle3")}</Link></li>
                                <li className="header__menu--list mr-10 text-[18px] tracking-[1px]"><Link className="header__menu--item font-bold mb-4" to={"/contact"}>{t("headerTitle4")}</Link></li>
                                <Link to={'/carts'} className="header__karzinka flex">
                                    <img src={cart} width={25} alt="" />
                                    <span className="text-white ml-2">{t("headerTitle6")}</span>
                                    <span className="text-white border-2 border-solid w-5 text-center rounded-lg ml-2 bg-slate-900">{order.length}</span>
                                </Link>
                            </div>
                            <button onClick={() => closeMenu()} className="p-2 border-2 border-solid border-white flex h-12 font-bold mr-2 mt-2">X</button>
                        </menu>
                        <div className=" flex items-center">
                            <button onClick={() => showMenu()}  className="header__burger mr-6">
                                <img className="bg-white rounded-lg" src={menu} width={35} height={35} alt="" />
                            </button>
                            
                            <select defaultValue={lang} onChange={(evt) => changeLang(evt.target.value)} className="header__select border-solid border-2 border-white-600 mr-8 rounded-lg bg-transparent font-bold text-white p-2 cursor-pointer">
                                <option className="text-black" value="uz">uz</option>
                                <option className="text-black" value="ru">ru</option>
                                <option className="text-black" value="en">en</option>
                            </select>
                            {
                                user ? (
                               <div className="flex items-center">
                                    <Link to={'/profile/notification'} className="flex">
                                        <div className={`notification-indicator ${notification && notification.length > 0 ? "bg-red-500" : null} 
                                            relative left-7 text-center text-white rounded-full w-2 h-2 text-xs`}>
                                            {/* {notification && notification.length > 0 ? notification.length : ""} */}
                                        </div>
                                        <img className="mr-4" src={notificationIcon} width={30} alt="" />
                                    </Link>
                                    <Link to={'/profile'} className="user__link mt-1" 
                                        onMouseEnter={handleMouseEnter} 
                                        onMouseLeave={handleMouseLeave}>
                                        <img className="ml-1" src={profile} width={25} height={25} alt="" />
                                        <span className="text-white text-center ">{t("headerTitle7")}</span>
                                     </Link> 
                               </div>

                                ) :(
                                <button onClick={openModal}>
                                        <div className="flex border-solid border-2 border-white-600 p-2 rounded-lg bg-transparent font-bold text-white cursor-pointer">
                                            <IoEnterOutline className="w-5 h-5 mr-2 mt-1" width={20} height={20} /><span>Kirish</span>
                                        </div>           
                                    {/* </a>  */}
                                </button>
                                )}

                                    { isLogoutVisible && (
                                       <div className="logout cursor-pointer bg-sky-900" 
                                            onMouseEnter={handleMouseEnter} 
                                            onMouseLeave={handleMouseLeave}>
                                        <h2 className="text-[13px] capitalize flex">
                                            <img className="" src={userImage} width={18} height={15} alt="profile" /> 
                                            {`${user.first_name } ${user.sur_name}`}</h2>
                                        <hr className="h-[2px] bg-slate-400 mt-2"/>
                                            <div className="text-center text-[13px] font-bold bg-sky-900 text-white tracking-[2px] p-1 mt-2" onClick={handleLogout}>{t("headerTitle5")}</div> 
                                       </div>
                                    ) }
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
                                    <label className="text-black text-[25px] font-sans" htmlFor="">{captcha}</label>
                                    <input ref={code} className="w-64 text-black bg-white p-2 border-solid border-2 border-slate-900" type="text" placeholder="code" />
                                    <div className="text-blue-400 mt-3 mb-3 block"><input onClick={() => setChangeCheckBtn(!changeCheckBtn)} className="mr-2" type="checkbox" />Men shaxsiy ma'lumotlarimni uzatishga roziman</div>
                                    <hr />
                                    <button defaultValue={changeCheckBtn} disabled={changeCheckBtn} onClick={sendCode} className={`${changeCheckBtn ? 'opacity-50 cursor-not-allowed' : ''} mt-5 ml-12 p-2 bg-blue-400 text-white`}>Tasdiqlash codini yuboring</button>
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
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    debug:true,
    lng:"en",
    resources: {
        en: {
            translation: {
                headerTitle1:"Home",
                headerTitle2:"About Us",
                headerTitle3:"Products",
                headerTitle4:"Contact",
                pageAbout:"About Us",
                pageContact:"Contacts",
                heroTitle1:"Colony construction products",
                productTitle1:"Construction products",
                productTitle2:"School equipment",
                footerTitle1:"Contacts",
                profileTitle1:"Profile",
                profileTitle2:"Personal data",
                profileTitle3:"Orders",
                profileTitle4:"My orders",
                cartTitle1:"Product in the cart:",
                cartTitle2:"Your order",
            },
        },
        ru: {
            translation: {
                headerTitle1:"Главная",
                headerTitle2:"О нас",
                headerTitle3:"Продукты",
                headerTitle4:"Контакт",
                pageAbout:"О нас",
                pageContact:"Контакт",
                heroTitle1:"Строительная продукция колонии",
                productTitle1:"Строительная продукция",
                productTitle2:"Школьное оборудование",
                footerTitle1:"Контакты",
                profileTitle1:"Профиль",
                profileTitle2:"Личные данные",
                profileTitle3:"Заказы",
                profileTitle4:"Мои заказы",
                cartTitle1:"Tовар в корзине:",
                cartTitle2:"Ваш заказ",
            },
        },
        uz: {
            translation: {
                headerTitle1:"Bosh sahifa",
                headerTitle2:"Biz haqimizda",
                headerTitle3:"Maxsulotlar",
                headerTitle4:"Aloqalar",
                pageAbout:"Biz haqimizda",
                pageContact:"Biz bilan bog'laning",
                heroTitle1:"Koloniya qurilish maxsulotlari",
                productTitle1:"Qurilish maxsulotlari",
                productTitle2:"Maktab jixozlari",
                footerTitle1:"Kontaktlar",
                profileTitle1:"Profil",
                profileTitle2:"Shaxsiy ma'lumot",
                profileTitle3:"Buyurtmalar",
                profileTitle4:"Mening buyurtmalarim",
                cartTitle1:"Korzinkada maxsulot:",  
                cartTitle2:"Buyurtmangiz",
            },
        },
    },
    
    
  });

export default i18n;

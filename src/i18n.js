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
                headerTitle3:"Available products",
                headerTitle4:"Contact",
                pageAbout:"About Us",
                pageContact:"Contacts",
                heroTitle1:"Colony construction products",
                productTitle1:"Construction products",
                productTitle2:"School equipment",
                footerTitle1:"Contacts",
            },
        },
        ru: {
            translation: {
                headerTitle1:"Главная",
                headerTitle2:"О нас",
                headerTitle3:"Доступные продукты",
                headerTitle4:"Контакт",
                pageAbout:"О нас",
                pageContact:"Контакт",
                heroTitle1:"Строительная продукция колонии",
                productTitle1:"Строительная продукция",
                productTitle2:"Школьное оборудование",
                footerTitle1:"Контакты"
            },
        },
        uz: {
            translation: {
                headerTitle1:"Bosh sahifa",
                headerTitle2:"Biz haqimizda",
                headerTitle3:"Mavjud maxsulotlar",
                headerTitle4:"Aloqalar",
                pageAbout:"Biz haqimizda",
                pageContact:"Biz bilan bog'laning",
                heroTitle1:"Koloniya qurilish maxsulotlari",
                productTitle1:"Qurilish maxsulotlari",
                productTitle2:"Maktab jixozlari",
                footerTitle1:"Kontaktlar"
            },
        },
    },
    
    
  });

export default i18n;

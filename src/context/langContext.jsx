import { useEffect, useState, createContext } from 'react';
import i18n from '../i18n';

// Til context yaratish
const LangContext = createContext();

const LangProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    const changeLang = (selectedLang) => {
        i18n.changeLanguage(selectedLang);
        setLang(selectedLang);
        localStorage.setItem('lang', selectedLang);
    };

    return (
        <LangContext.Provider value={{ lang, changeLang }}>
            {children}
        </LangContext.Provider>
    );
};

export { LangProvider, LangContext } ;
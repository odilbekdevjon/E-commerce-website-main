import { useContext } from "react";
import { LangContext } from "../context/langContext";

function useLang(){

    const { lang, changeLang } = useContext(LangContext);

    return [ lang, changeLang ] ;
}

export default useLang;
import { useContext } from "react";
import { Context } from "../context/cartContext";


function useCartAuth() {
    const { stateCart, setStateCart, setCart }  = useContext(Context)  

    return [ stateCart, setStateCart, setCart ]
}

export default useCartAuth;
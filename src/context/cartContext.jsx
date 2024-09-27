import { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();

function Provider({children}) {

    const [data, setData] = useState([]);
    const [ error, setError ] = useState(null);
    const [stateCart, setStateCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

    useEffect(() => {
        axios.get('https://5jiek.uz/api/v1/product/get-products')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    const findId = data.find(item => item.id)

    const setCart = (findId) => {
        const oldCard = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const findOldCard = oldCard.some(item => item.id === findId)


        if (findOldCard) {
            const updateCard = oldCard.map(item => {
                if (item.id === findId) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    }

                } else {
                    return item
                }
            })
            localStorage.setItem('cart', JSON.stringify(updateCard))
            setStateCart(updateCard)
        } else {
            const filteredData = data.find(i => i.id === findId);
            const newCard = [...oldCard, { ...filteredData, qty: 1 }]
            localStorage.setItem('cart', JSON.stringify(newCard))
            setStateCart(newCard)
        }   
    }

    return (
        <Context.Provider value={{stateCart, setStateCart, setCart }}>{children}</Context.Provider>
    )
}

export { Context, Provider } ;
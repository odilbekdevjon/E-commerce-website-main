import axios from "axios";
import { useEffect, useState } from "react";


export const useCartHook = (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

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


    const setCart = (id) => {
        const oldCard = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const findOldCard = oldCard.some(item => item.id === id)


        if (findOldCard) {
            const updateCard = oldCard.map(item => {
                if (item.id === id) {
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
            const filteredData = data.find(i => i.id === id);
            const newCard = [...oldCard, { ...filteredData, qty: 1 }]
            localStorage.setItem('cart', JSON.stringify(newCard))
            setStateCart(newCard)
        }
    }
    return { stateCart, setCart, data, error, setError }
}
import {createContext, useEffect, useState} from "react";

const Context = createContext()

function Provider({children}) {

    const [user, setUser]  = useState(JSON.parse(window.localStorage.getItem("user")) || null)

    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user))
    }, [user]);

    return(
        <Context.Provider value={{user, setUser}}>{children}</Context.Provider>
    )
}

export {Context, Provider};
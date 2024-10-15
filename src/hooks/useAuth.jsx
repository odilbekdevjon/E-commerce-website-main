import { useContext } from "react";
import { Context } from "../context/authContext";


function useAuth(){

    const {user, setUser} = useContext(Context);
    
    return [user , setUser] ;
    
}

export default useAuth;
import { createContext,useEffect,useState } from "react";

export const UserContext =  createContext();

const UserProvider = ({children})=>{
    const [CurrentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(CurrentUser))
    },[CurrentUser])

    return <UserContext.Provider value={{CurrentUser,setCurrentUser}}>{children}</UserContext.Provider>
}
export default UserProvider;
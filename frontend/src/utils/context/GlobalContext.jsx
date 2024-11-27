import { useEffect, createContext, useState, useContext } from "react";
import { axiosInstance } from "../../http/index";
import { SocketContext } from "./SocketContext";
import { AuthContext } from "./AuthContext";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {


    const socket = useContext(SocketContext);
    const [activeUsers, setActiveUsers] = useState();
    const [refresh, setRefresh] = useState(0);
    const { user } = useContext(AuthContext)
    console.log(user)


    socket.on("activeUsers", (activeUsers) => {
        console.log("giiii")
        console.log(activeUsers);
        setActiveUsers(activeUsers);
    });




    return <GlobalContext.Provider value={{ activeUsers, setRefresh, refresh }}>{children}</GlobalContext.Provider>;

};
